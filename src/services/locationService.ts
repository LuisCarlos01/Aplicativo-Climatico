import { getCurrentPosition } from '../utils/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Type definitions
export interface Location {
  id: string;
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
  isCurrent?: boolean;
  isFavorite?: boolean;
  lastUpdated?: number;
}

const CURRENT_LOCATION_KEY = '@AppClima:currentLocation';
const FAVORITE_LOCATIONS_KEY = '@AppClima:favoriteLocations';

// Save current location to storage
export const saveCurrentLocation = async (location: Location): Promise<void> => {
  try {
    const locationWithTimestamp = {
      ...location,
      isCurrent: true,
      lastUpdated: Date.now(),
    };
    await AsyncStorage.setItem(
      CURRENT_LOCATION_KEY,
      JSON.stringify(locationWithTimestamp)
    );
  } catch (error) {
    console.error('Error saving current location:', error);
    throw error;
  }
};

// Get current location from storage
export const getCurrentLocationFromStorage = async (): Promise<Location | null> => {
  try {
    const locationJson = await AsyncStorage.getItem(CURRENT_LOCATION_KEY);
    return locationJson ? JSON.parse(locationJson) : null;
  } catch (error) {
    console.error('Error getting current location from storage:', error);
    return null;
  }
};

// Get current location using geolocation
export const detectCurrentLocation = async (): Promise<Location> => {
  try {
    const position = await getCurrentPosition();
    
    // Use reverse geocoding from OpenWeatherMap to get location name
    // For now, just return coordinates
    return {
      id: `${position.latitude},${position.longitude}`,
      name: 'Localização atual',
      country: 'BR', // Placeholder
      lat: position.latitude,
      lon: position.longitude,
      isCurrent: true,
      lastUpdated: Date.now(),
    };
  } catch (error) {
    console.error('Error detecting current location:', error);
    throw error;
  }
};

// Save a location as favorite
export const saveFavoriteLocation = async (location: Location): Promise<void> => {
  try {
    const existingFavoritesJson = await AsyncStorage.getItem(FAVORITE_LOCATIONS_KEY);
    const existingFavorites: Location[] = existingFavoritesJson 
      ? JSON.parse(existingFavoritesJson)
      : [];
    
    // Check if location already exists in favorites
    const locationExists = existingFavorites.some(
      (favLocation) => favLocation.id === location.id
    );
    
    if (!locationExists) {
      const locationWithTimestamp = {
        ...location,
        isFavorite: true,
        lastUpdated: Date.now(),
      };
      const updatedFavorites = [...existingFavorites, locationWithTimestamp];
      await AsyncStorage.setItem(
        FAVORITE_LOCATIONS_KEY,
        JSON.stringify(updatedFavorites)
      );
    }
  } catch (error) {
    console.error('Error saving favorite location:', error);
    throw error;
  }
};

// Remove a location from favorites
export const removeFavoriteLocation = async (locationId: string): Promise<void> => {
  try {
    const existingFavoritesJson = await AsyncStorage.getItem(FAVORITE_LOCATIONS_KEY);
    if (!existingFavoritesJson) return;
    
    const existingFavorites: Location[] = JSON.parse(existingFavoritesJson);
    const updatedFavorites = existingFavorites.filter(
      (location) => location.id !== locationId
    );
    
    await AsyncStorage.setItem(
      FAVORITE_LOCATIONS_KEY,
      JSON.stringify(updatedFavorites)
    );
  } catch (error) {
    console.error('Error removing favorite location:', error);
    throw error;
  }
};

// Get all favorite locations
export const getFavoriteLocations = async (): Promise<Location[]> => {
  try {
    const favoritesJson = await AsyncStorage.getItem(FAVORITE_LOCATIONS_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    console.error('Error getting favorite locations:', error);
    return [];
  }
};

// Check if a location is in favorites
export const isLocationFavorite = async (locationId: string): Promise<boolean> => {
  try {
    const favorites = await getFavoriteLocations();
    return favorites.some((location) => location.id === locationId);
  } catch (error) {
    console.error('Error checking if location is favorite:', error);
    return false;
  }
};
