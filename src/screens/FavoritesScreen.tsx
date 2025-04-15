import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useColorScheme,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppStackParamList } from '../navigation/AppNavigator';
import theme from '../theme';
import Header from '../components/Header';
import { useLocation } from '../context/LocationContext';
import { useWeather } from '../context/WeatherContext';
import { Location } from '../services/locationService';
import { getCurrentWeather, WeatherData } from '../services/weatherService';
import { formatTemperature } from '../utils/temperatureUtils';
import { getWeatherIconName } from '../utils/weatherConditions';

type FavoritesScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Favorites'>;

interface FavoriteItemData {
  location: Location;
  weather?: WeatherData;
  isLoading: boolean;
  error?: string;
}

const FavoritesScreen: React.FC = () => {
  const navigation = useNavigation<FavoritesScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? theme.colors.dark : theme.colors.light;
  
  const { favoriteLocations, refreshFavorites, setCurrentLocation, removeFavorite } = useLocation();
  
  const [favoritesData, setFavoritesData] = useState<FavoriteItemData[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Load favorites data with weather
  const loadFavoritesData = useCallback(async () => {
    setIsRefreshing(true);
    
    // Refresh favorites list from storage
    await refreshFavorites();
    
    // Create initial data structure with loading states
    const initialData = favoriteLocations.map(location => ({
      location,
      isLoading: true,
    }));
    
    setFavoritesData(initialData);
    
    // Fetch weather for each location
    const weatherPromises = favoriteLocations.map(async (location, index) => {
      try {
        const weather = await getCurrentWeather(location.lat, location.lon);
        return {
          location,
          weather,
          isLoading: false,
        };
      } catch (error) {
        console.error(`Error loading weather for ${location.name}:`, error);
        return {
          location,
          isLoading: false,
          error: 'Falha ao carregar dados',
        };
      }
    });
    
    // Wait for all weather data to be fetched
    const results = await Promise.all(weatherPromises);
    setFavoritesData(results);
    setIsRefreshing(false);
  }, [favoriteLocations, refreshFavorites]);
  
  // Load data on mount and when the screen is focused
  useEffect(() => {
    loadFavoritesData();
  }, [loadFavoritesData]);
  
  useFocusEffect(
    useCallback(() => {
      loadFavoritesData();
    }, [loadFavoritesData])
  );
  
  // Handle location selection
  const handleSelectLocation = async (location: Location) => {
    try {
      await setCurrentLocation(location);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error selecting location:', error);
      Alert.alert('Erro', 'Não foi possível selecionar esta localização.');
    }
  };
  
  // Handle remove favorite
  const handleRemoveFavorite = (location: Location) => {
    Alert.alert(
      'Remover favorito',
      `Deseja remover ${location.name} dos favoritos?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeFavorite(location.id);
              loadFavoritesData(); // Refresh the list
            } catch (error) {
              console.error('Error removing favorite:', error);
              Alert.alert('Erro', 'Não foi possível remover o favorito.');
            }
          },
        },
      ]
    );
  };
  
  // Render favorite item
  const renderFavoriteItem = ({ item }: { item: FavoriteItemData }) => {
    const { location, weather, isLoading, error } = item;
    
    return (
      <TouchableOpacity
        style={[styles.favoriteItem, { backgroundColor: colors.card }]}
        onPress={() => handleSelectLocation(location)}
        activeOpacity={0.7}
      >
        <View style={styles.favoriteContent}>
          <View style={styles.locationInfo}>
            <Text style={[styles.locationName, { color: colors.text }]}>
              {location.name}
            </Text>
            <Text style={[styles.locationDetail, { color: colors.textSecondary }]}>
              {location.state ? `${location.state}, ` : ''}{location.country}
            </Text>
          </View>
          
          <View style={styles.weatherInfo}>
            {isLoading ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : error ? (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {error}
              </Text>
            ) : weather ? (
              <View style={styles.weatherContent}>
                <Text style={[styles.temperature, { color: colors.text }]}>
                  {formatTemperature(weather.main.temp)}
                </Text>
                <View style={styles.conditionContainer}>
                  <Icon
                    name={getWeatherIconName(weather.weather[0].id, true)}
                    size={24}
                    color={colors.primary}
                    style={styles.weatherIcon}
                  />
                  <Text style={[styles.conditionText, { color: colors.textSecondary }]}>
                    {weather.weather[0].description}
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveFavorite(location)}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Icon name="close-circle" size={22} color={colors.error} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  
  // Render empty state
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="star-outline" size={60} color={colors.textSecondary} />
      <Text style={[styles.emptyTitle, { color: colors.text }]}>
        Nenhum favorito
      </Text>
      <Text style={[styles.emptyMessage, { color: colors.textSecondary }]}>
        Adicione locais aos favoritos para acessá-los rapidamente.
      </Text>
      <TouchableOpacity
        style={[styles.searchButton, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('Search')}
      >
        <Icon name="search-outline" size={20} color="#FFFFFF" style={styles.searchIcon} />
        <Text style={styles.searchButtonText}>Buscar Cidades</Text>
      </TouchableOpacity>
    </View>
  );
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="Favoritos"
        showBack={true}
        showSearch={true}
        onBackPress={() => navigation.goBack()}
        onSearchPress={() => navigation.navigate('Search')}
      />
      
      <FlatList
        data={favoritesData}
        renderItem={renderFavoriteItem}
        keyExtractor={item => item.location.id}
        contentContainerStyle={styles.listContent}
        refreshing={isRefreshing}
        onRefresh={loadFavoritesData}
        ListEmptyComponent={!isRefreshing ? renderEmptyState : null}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: theme.spacing.medium,
    flexGrow: 1,
  },
  favoriteItem: {
    borderRadius: theme.spacing.borderRadius.medium,
    marginBottom: theme.spacing.medium,
    padding: theme.spacing.medium,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  favoriteContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationInfo: {
    flex: 1,
    marginRight: theme.spacing.medium,
  },
  locationName: {
    fontSize: theme.typography.size.md,
    fontWeight: '600' as any,
    marginBottom: 2,
  },
  locationDetail: {
    fontSize: theme.typography.size.sm,
  },
  weatherInfo: {
    minWidth: 90,
    alignItems: 'flex-end',
  },
  weatherContent: {
    alignItems: 'flex-end',
  },
  temperature: {
    fontSize: theme.typography.size.lg,
    fontWeight: '600' as any,
  },
  conditionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  weatherIcon: {
    marginRight: theme.spacing.tiny,
  },
  conditionText: {
    fontSize: theme.typography.size.xs,
  },
  errorText: {
    fontSize: theme.typography.size.xs,
  },
  removeButton: {
    marginLeft: theme.spacing.small,
    padding: theme.spacing.tiny,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.large,
  },
  emptyTitle: {
    fontSize: theme.typography.size.xl,
    fontWeight: '600' as any,
    marginTop: theme.spacing.medium,
    marginBottom: theme.spacing.small,
  },
  emptyMessage: {
    fontSize: theme.typography.size.md,
    textAlign: 'center',
    marginBottom: theme.spacing.large,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    borderRadius: theme.spacing.borderRadius.medium,
    marginTop: theme.spacing.medium,
  },
  searchIcon: {
    marginRight: theme.spacing.small,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: theme.typography.size.md,
    fontWeight: '500' as any,
  },
});

export default FavoritesScreen;
