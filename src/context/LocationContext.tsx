import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Location,
  detectCurrentLocation,
  saveCurrentLocation,
  getCurrentLocationFromStorage,
  getFavoriteLocations,
  saveFavoriteLocation,
  removeFavoriteLocation,
  isLocationFavorite,
} from '../services/locationService';

interface LocationContextType {
  currentLocation: Location | null;
  favoriteLocations: Location[];
  isLoading: boolean;
  error: string | null;
  detectLocation: () => Promise<void>;
  setCurrentLocation: (location: Location) => Promise<void>;
  addFavorite: (location: Location) => Promise<void>;
  removeFavorite: (locationId: string) => Promise<void>;
  checkIsFavorite: (locationId: string) => Promise<boolean>;
  refreshFavorites: () => Promise<void>;
}

// Create the context
const LocationContext = createContext<LocationContextType>({
  currentLocation: null,
  favoriteLocations: [],
  isLoading: false,
  error: null,
  detectLocation: async () => {},
  setCurrentLocation: async () => {},
  addFavorite: async () => {},
  removeFavorite: async () => {},
  checkIsFavorite: async () => false,
  refreshFavorites: async () => {},
});

// Custom hook to use the location context
export const useLocation = () => useContext(LocationContext);

// Provider component
export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLocation, setCurrentLocationState] = useState<Location | null>(null);
  const [favoriteLocations, setFavoriteLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load saved location on mount
  useEffect(() => {
    const loadLocation = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Try to get saved location from storage
        const savedLocation = await getCurrentLocationFromStorage();
        
        if (savedLocation) {
          setCurrentLocationState(savedLocation);
        } else {
          // If no saved location, try to detect current location
          try {
            await detectLocation();
          } catch (locationError) {
            console.error('Error detecting location on initial load:', locationError);
            // Don't set error here to avoid showing error on first load
          }
        }
        
        // Load favorite locations
        await refreshFavorites();
      } catch (err) {
        console.error('Error loading location:', err);
        setError('Falha ao carregar a localização.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadLocation();
  }, []);
  
  // Detect current location
  const detectLocation = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const location = await detectCurrentLocation();
      setCurrentLocationState(location);
      await saveCurrentLocation(location);
    } catch (err) {
      console.error('Error detecting location:', err);
      setError('Não foi possível detectar sua localização. Verifique as permissões.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Set current location
  const setCurrentLocation = async (location: Location): Promise<void> => {
    try {
      setCurrentLocationState(location);
      await saveCurrentLocation(location);
    } catch (err) {
      console.error('Error setting current location:', err);
      throw err;
    }
  };
  
  // Add a location to favorites
  const addFavorite = async (location: Location): Promise<void> => {
    try {
      await saveFavoriteLocation(location);
      await refreshFavorites();
    } catch (err) {
      console.error('Error adding favorite location:', err);
      throw err;
    }
  };
  
  // Remove a location from favorites
  const removeFavorite = async (locationId: string): Promise<void> => {
    try {
      await removeFavoriteLocation(locationId);
      await refreshFavorites();
    } catch (err) {
      console.error('Error removing favorite location:', err);
      throw err;
    }
  };
  
  // Check if a location is in favorites
  const checkIsFavorite = async (locationId: string): Promise<boolean> => {
    return await isLocationFavorite(locationId);
  };
  
  // Refresh the list of favorite locations
  const refreshFavorites = async (): Promise<void> => {
    try {
      const favorites = await getFavoriteLocations();
      setFavoriteLocations(favorites);
    } catch (err) {
      console.error('Error refreshing favorite locations:', err);
    }
  };
  
  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        favoriteLocations,
        isLoading,
        error,
        detectLocation,
        setCurrentLocation,
        addFavorite,
        removeFavorite,
        checkIsFavorite,
        refreshFavorites,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
