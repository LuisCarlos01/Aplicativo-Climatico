import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  useColorScheme,
  StatusBar,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useWeather } from '../context/WeatherContext';
import { useLocation } from '../context/LocationContext';
import theme from '../theme';
import WeatherCard from '../components/WeatherCard';
import HourlyForecast from '../components/HourlyForecast';
import DailyForecast from '../components/DailyForecast';
import Loading from '../components/Loading';
import ErrorView from '../components/ErrorView';
import Header from '../components/Header';
import FavoriteButton from '../components/FavoriteButton';
import { formatDate } from '../utils/dateUtils';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppNavigator';
import { shouldUseNightIcon } from '../utils/dateUtils';
import weatherBackgrounds from '../assets/weatherBackgrounds';

type HomeScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? theme.colors.dark : theme.colors.light;
  
  const { currentWeather, forecast, isLoading: isWeatherLoading, error: weatherError, loadWeatherAndForecast } = useWeather();
  const { currentLocation, isLoading: isLocationLoading, error: locationError, detectLocation } = useLocation();
  
  const [refreshing, setRefreshing] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Check if we should show loading state
  const isLoading = isWeatherLoading || isLocationLoading;
  
  // Combine errors
  const error = weatherError || locationError;
  
  // Check if location is a favorite
  const checkFavoriteStatus = useCallback(async () => {
    if (currentLocation) {
      const favorite = await useLocation().checkIsFavorite(currentLocation.id);
      setIsFavorite(favorite);
    }
  }, [currentLocation]);
  
  // Load weather data and check favorite status when current location changes
  useEffect(() => {
    if (currentLocation) {
      loadWeatherAndForecast(currentLocation);
      checkFavoriteStatus();
    }
  }, [currentLocation, loadWeatherAndForecast, checkFavoriteStatus]);
  
  // Refresh when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (currentLocation) {
        loadWeatherAndForecast(currentLocation);
        checkFavoriteStatus();
      }
    }, [currentLocation, loadWeatherAndForecast, checkFavoriteStatus])
  );
  
  // Handle pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      if (currentLocation) {
        await loadWeatherAndForecast(currentLocation);
      } else {
        await detectLocation();
      }
      checkFavoriteStatus();
    } catch (error) {
      console.error('Error refreshing weather:', error);
    } finally {
      setRefreshing(false);
    }
  }, [currentLocation, loadWeatherAndForecast, detectLocation, checkFavoriteStatus]);
  
  // Toggle favorite status
  const toggleFavorite = useCallback(async () => {
    if (!currentLocation) return;
    
    try {
      const locationActions = useLocation();
      if (isFavorite) {
        await locationActions.removeFavorite(currentLocation.id);
      } else {
        await locationActions.addFavorite(currentLocation);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }, [isFavorite, currentLocation]);
  
  // Navigate to search screen
  const goToSearch = () => {
    navigation.navigate('Search');
  };
  
  // Navigate to favorites screen
  const goToFavorites = () => {
    navigation.navigate('Favorites');
  };
  
  // Navigate to detail screen
  const goToDetail = () => {
    if (currentWeather && currentLocation) {
      navigation.navigate('Detail', {
        weather: currentWeather,
        forecast: forecast || undefined,
        location: currentLocation,
      });
    }
  };
  
  // Format hourly forecast data
  const formatHourlyData = () => {
    if (!forecast) return [];
    
    return forecast.list.slice(0, 24).map(item => ({
      timestamp: item.dt,
      temperature: item.main.temp,
      conditionId: item.weather[0].id,
      sunrise: forecast.city.sunrise,
      sunset: forecast.city.sunset,
    }));
  };
  
  // Format daily forecast data
  const formatDailyData = () => {
    if (!forecast) return [];
    
    // Group forecast items by day
    const dailyMap: { [key: string]: any } = {};
    
    forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const day = date.toISOString().split('T')[0];
      
      if (!dailyMap[day]) {
        dailyMap[day] = {
          timestamp: item.dt,
          tempMin: item.main.temp_min,
          tempMax: item.main.temp_max,
          conditionId: item.weather[0].id,
          precipitationProbability: item.pop,
          items: []
        };
      }
      
      // Update min/max temperature
      dailyMap[day].tempMin = Math.min(dailyMap[day].tempMin, item.main.temp_min);
      dailyMap[day].tempMax = Math.max(dailyMap[day].tempMax, item.main.temp_max);
      dailyMap[day].items.push(item);
    });
    
    // Convert map to array
    return Object.values(dailyMap);
  };
  
  // Get background SVG based on weather condition
  const getWeatherBackground = () => {
    if (!currentWeather) return weatherBackgrounds.clearDay;
    
    const isDay = !shouldUseNightIcon(
      currentWeather.dt, 
      currentWeather.sys.sunrise, 
      currentWeather.sys.sunset
    );
    
    return weatherBackgrounds.getBackgroundForCondition(
      currentWeather.weather[0].id,
      isDay
    );
  };
  
  // Render loading state
  if (isLoading && !currentWeather) {
    return <Loading />;
  }
  
  // Render error state
  if (error && !currentWeather) {
    return (
      <ErrorView 
        message={error}
        onRetry={detectLocation}
        error={new Error(error)}
      />
    );
  }
  
  // Convert SVG string to data URI
  const svgBackground = `data:image/svg+xml;utf8,${encodeURIComponent(getWeatherBackground())}`;
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      
      <View style={styles.backgroundContainer}>
        <ImageBackground 
          source={{ uri: svgBackground }}
          style={styles.background}
        >
          <SafeAreaView style={styles.headerContainer}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={detectLocation}
                style={styles.locationButton}
              >
                <Icon name="locate" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              
              <Text style={styles.headerTitle}>
                {currentLocation?.name || 'Carregando...'}
              </Text>
              
              <View style={styles.headerButtons}>
                <TouchableOpacity
                  onPress={goToFavorites}
                  style={styles.iconButton}
                >
                  <Icon name="bookmark-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={goToSearch}
                  style={styles.iconButton}
                >
                  <Icon name="search-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        {currentWeather && currentLocation && (
          <>
            <Text style={[styles.date, { color: colors.text }]}>
              {formatDate(new Date())}
            </Text>
            
            <WeatherCard
              cityName={currentLocation.name}
              countryCode={currentLocation.country}
              temperature={currentWeather.main.temp}
              feelsLike={currentWeather.main.feels_like}
              conditionId={currentWeather.weather[0].id}
              conditionDescription={currentWeather.weather[0].description}
              humidity={currentWeather.main.humidity}
              windSpeed={currentWeather.wind.speed}
              timestamp={currentWeather.dt}
              sunrise={currentWeather.sys.sunrise}
              sunset={currentWeather.sys.sunset}
              onPress={goToDetail}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
            
            {forecast && (
              <>
                <HourlyForecast data={formatHourlyData()} />
                <DailyForecast data={formatDailyData()} />
              </>
            )}
            
            <TouchableOpacity
              style={[styles.detailButton, { backgroundColor: colors.primary }]}
              onPress={goToDetail}
            >
              <Text style={styles.detailButtonText}>Ver Detalhes</Text>
              <Icon name="chevron-forward" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 220,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight || 0 + 10,
    paddingHorizontal: theme.spacing.medium,
    height: 60,
  },
  headerTitle: {
    fontSize: theme.typography.size.lg,
    color: '#FFFFFF',
    fontWeight: '600' as any,
    textAlign: 'center',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: theme.spacing.small,
  },
  locationButton: {
    padding: theme.spacing.small,
  },
  scrollView: {
    flex: 1,
    marginTop: 110,
  },
  scrollViewContent: {
    paddingTop: theme.spacing.medium,
    paddingBottom: theme.spacing.xxxlarge,
  },
  date: {
    fontSize: theme.typography.size.md,
    textAlign: 'center',
    marginBottom: theme.spacing.medium,
  },
  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: theme.spacing.medium,
    marginTop: theme.spacing.large,
    paddingVertical: theme.spacing.medium,
    borderRadius: theme.spacing.borderRadius.medium,
  },
  detailButtonText: {
    color: '#FFFFFF',
    fontSize: theme.typography.size.md,
    fontWeight: '500' as any,
    marginRight: theme.spacing.small,
  },
});

export default HomeScreen;
