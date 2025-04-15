import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFERENCES_KEY = '@AppClima:preferences';

// User preferences interface
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  units: 'metric' | 'imperial';
  notificationsEnabled: boolean;
  lastOpened?: number;
}

// Default preferences
const defaultPreferences: UserPreferences = {
  theme: 'system',
  units: 'metric',
  notificationsEnabled: true,
};

// Save user preferences
export const savePreferences = async (preferences: Partial<UserPreferences>): Promise<void> => {
  try {
    const current = await getPreferences();
    const updated = { ...current, ...preferences, lastOpened: Date.now() };
    await AsyncStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving preferences:', error);
    throw error;
  }
};

// Get user preferences
export const getPreferences = async (): Promise<UserPreferences> => {
  try {
    const preferencesJson = await AsyncStorage.getItem(PREFERENCES_KEY);
    if (!preferencesJson) {
      return defaultPreferences;
    }
    return { ...defaultPreferences, ...JSON.parse(preferencesJson) };
  } catch (error) {
    console.error('Error getting preferences:', error);
    return defaultPreferences;
  }
};

// Clear all app data
export const clearAppData = async (): Promise<void> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const appKeys = keys.filter(key => key.startsWith('@AppClima:'));
    await AsyncStorage.multiRemove(appKeys);
  } catch (error) {
    console.error('Error clearing app data:', error);
    throw error;
  }
};

// Save recent searches
export const saveRecentSearch = async (search: string): Promise<void> => {
  try {
    const key = '@AppClima:recentSearches';
    const recentSearchesJson = await AsyncStorage.getItem(key);
    const recentSearches: string[] = recentSearchesJson ? JSON.parse(recentSearchesJson) : [];
    
    // Add to beginning of array, remove duplicates
    const updatedSearches = [
      search,
      ...recentSearches.filter(item => item !== search),
    ].slice(0, 10); // Keep only 10 most recent
    
    await AsyncStorage.setItem(key, JSON.stringify(updatedSearches));
  } catch (error) {
    console.error('Error saving recent search:', error);
  }
};

// Get recent searches
export const getRecentSearches = async (): Promise<string[]> => {
  try {
    const key = '@AppClima:recentSearches';
    const recentSearchesJson = await AsyncStorage.getItem(key);
    return recentSearchesJson ? JSON.parse(recentSearchesJson) : [];
  } catch (error) {
    console.error('Error getting recent searches:', error);
    return [];
  }
};

// Clear recent searches
export const clearRecentSearches = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('@AppClima:recentSearches');
  } catch (error) {
    console.error('Error clearing recent searches:', error);
  }
};
