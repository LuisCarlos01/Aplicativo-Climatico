import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  StatusBar,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../theme';
import WeatherIcon, {
  HumidityIcon,
  WindIcon,
  PressureIcon,
  VisibilityIcon,
  SunriseIcon,
  SunsetIcon,
} from '../components/WeatherIcons';
import FavoriteButton from '../components/FavoriteButton';
import Header from '../components/Header';
import HourlyForecast from '../components/HourlyForecast';
import DailyForecast from '../components/DailyForecast';
import { useLocation } from '../context/LocationContext';
import { formatDate, formatTime, shouldUseNightIcon } from '../utils/dateUtils';
import {
  formatTemperature,
  formatWindSpeed,
  formatHumidity,
  formatPressure,
  formatVisibility,
  kelvinToCelsius,
} from '../utils/temperatureUtils';
import { getWeatherGradient, getWeatherDescription } from '../utils/weatherConditions';
import weatherBackgrounds from '../assets/weatherBackgrounds';

type DetailScreenProps = NativeStackScreenProps<AppStackParamList, 'Detail'>;

const DetailScreen: React.FC<DetailScreenProps> = ({ route, navigation }) => {
  const { weather, forecast, location } = route.params;
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? theme.colors.dark : theme.colors.light;
  
  // Get location context for favorite functionality
  const locationContext = useLocation();
  
  // State to track favorite status
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Check if location is favorite on mount
  React.useEffect(() => {
    const checkFavorite = async () => {
      const result = await locationContext.checkIsFavorite(location.id);
      setIsFavorite(result);
    };
    
    checkFavorite();
  }, [location.id, locationContext]);
  
  // Toggle favorite status
  const toggleFavorite = useCallback(async () => {
    try {
      if (isFavorite) {
        await locationContext.removeFavorite(location.id);
      } else {
        await locationContext.addFavorite(location);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }, [isFavorite, location, locationContext]);
  
  // Determine if it's currently day or night
  const isNight = shouldUseNightIcon(
    weather.dt,
    weather.sys.sunrise,
    weather.sys.sunset
  );
  
  // Get gradient colors based on weather condition
  const gradientColors = getWeatherGradient(weather.weather[0].id, isDark);
  
  // Get SVG background based on weather condition
  const getWeatherBackground = () => {
    return weatherBackgrounds.getBackgroundForCondition(
      weather.weather[0].id,
      !isNight
    );
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
          <SafeAreaView>
            <Header
              title={location.name}
              showBack={true}
              showSearch={false}
              transparent={true}
              onBackPress={() => navigation.goBack()}
            />
          </SafeAreaView>
        </ImageBackground>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.dateContainer}>
          <Text style={[styles.date, { color: colors.text }]}>
            {formatDate(new Date(weather.dt * 1000))}
          </Text>
          <FavoriteButton
            isFavorite={isFavorite}
            onPress={toggleFavorite}
            size={24}
          />
        </View>
        
        <LinearGradient
          colors={gradientColors}
          style={styles.mainCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.temperatureContainer}>
            <Text style={styles.temperature}>
              {formatTemperature(weather.main.temp)}
            </Text>
            <View style={styles.conditionContainer}>
              <WeatherIcon
                conditionId={weather.weather[0].id}
                isDay={!isNight}
                size={60}
                color="#FFF"
              />
              <Text style={styles.conditionText}>
                {weather.weather[0].description.charAt(0).toUpperCase() + 
                weather.weather[0].description.slice(1)}
              </Text>
            </View>
          </View>
          
          <Text style={styles.feelsLike}>
            Sensação térmica de {formatTemperature(weather.main.feels_like)}
          </Text>
          
          <View style={styles.minMaxContainer}>
            <View style={styles.minMaxItem}>
              <Icon name="arrow-down" size={16} color="#FFF" />
              <Text style={styles.minMaxText}>
                {formatTemperature(weather.main.temp_min)}
              </Text>
            </View>
            <View style={styles.minMaxItem}>
              <Icon name="arrow-up" size={16} color="#FFF" />
              <Text style={styles.minMaxText}>
                {formatTemperature(weather.main.temp_max)}
              </Text>
            </View>
          </View>
        </LinearGradient>
        
        <View style={[styles.detailsCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Detalhes
          </Text>
          
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <HumidityIcon size={24} color={colors.primary} />
              <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                Umidade
              </Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>
                {formatHumidity(weather.main.humidity)}
              </Text>
            </View>
            
            <View style={styles.detailItem}>
              <WindIcon size={24} color={colors.primary} />
              <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                Vento
              </Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>
                {formatWindSpeed(weather.wind.speed)}
              </Text>
            </View>
            
            <View style={styles.detailItem}>
              <PressureIcon size={24} color={colors.primary} />
              <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                Pressão
              </Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>
                {formatPressure(weather.main.pressure)}
              </Text>
            </View>
            
            <View style={styles.detailItem}>
              <VisibilityIcon size={24} color={colors.primary} />
              <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                Visibilidade
              </Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>
                {formatVisibility(weather.visibility)}
              </Text>
            </View>
          </View>
          
          <View style={styles.sunTimesContainer}>
            <View style={styles.sunTimeItem}>
              <SunriseIcon size={24} color={colors.secondary} />
              <View>
                <Text style={[styles.sunTimeLabel, { color: colors.textSecondary }]}>
                  Nascer do Sol
                </Text>
                <Text style={[styles.sunTimeValue, { color: colors.text }]}>
                  {formatTime(new Date(weather.sys.sunrise * 1000))}
                </Text>
              </View>
            </View>
            
            <View style={styles.sunTimeItem}>
              <SunsetIcon size={24} color={colors.secondary} />
              <View>
                <Text style={[styles.sunTimeLabel, { color: colors.textSecondary }]}>
                  Pôr do Sol
                </Text>
                <Text style={[styles.sunTimeValue, { color: colors.text }]}>
                  {formatTime(new Date(weather.sys.sunset * 1000))}
                </Text>
              </View>
            </View>
          </View>
        </View>
        
        {forecast && (
          <>
            <HourlyForecast data={formatHourlyData()} />
            <DailyForecast data={formatDailyData()} />
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
  scrollView: {
    flex: 1,
    marginTop: 80,
  },
  scrollViewContent: {
    paddingVertical: theme.spacing.medium,
    paddingBottom: theme.spacing.xxxlarge,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
  },
  date: {
    fontSize: theme.typography.size.md,
  },
  mainCard: {
    margin: theme.spacing.medium,
    borderRadius: theme.spacing.borderRadius.large,
    padding: theme.spacing.large,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  temperatureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  temperature: {
    color: '#FFF',
    fontSize: 64,
    fontWeight: '700' as any,
  },
  conditionContainer: {
    alignItems: 'center',
  },
  conditionText: {
    color: '#FFF',
    fontSize: theme.typography.size.md,
    marginTop: theme.spacing.tiny,
    textAlign: 'center',
  },
  feelsLike: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: theme.typography.size.md,
    marginTop: theme.spacing.medium,
  },
  minMaxContainer: {
    flexDirection: 'row',
    marginTop: theme.spacing.medium,
  },
  minMaxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.large,
  },
  minMaxText: {
    color: '#FFF',
    fontSize: theme.typography.size.md,
    marginLeft: theme.spacing.tiny,
  },
  detailsCard: {
    margin: theme.spacing.medium,
    borderRadius: theme.spacing.borderRadius.medium,
    padding: theme.spacing.large,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: theme.typography.size.lg,
    fontWeight: '600' as any,
    marginBottom: theme.spacing.medium,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.large,
  },
  detailItem: {
    width: '50%',
    paddingVertical: theme.spacing.medium,
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontSize: theme.typography.size.sm,
    marginTop: theme.spacing.small,
  },
  detailValue: {
    fontSize: theme.typography.size.lg,
    fontWeight: '600' as any,
    marginTop: theme.spacing.tiny,
  },
  sunTimesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
    paddingTop: theme.spacing.large,
  },
  sunTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sunTimeLabel: {
    fontSize: theme.typography.size.sm,
    marginLeft: theme.spacing.small,
  },
  sunTimeValue: {
    fontSize: theme.typography.size.md,
    fontWeight: '600' as any,
    marginLeft: theme.spacing.small,
    marginTop: 2,
  },
});

export default DetailScreen;
