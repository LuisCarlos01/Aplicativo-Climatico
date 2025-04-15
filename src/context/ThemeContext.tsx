import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { getPreferences, savePreferences } from '../services/storageService';

type ThemeType = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeType;
  isDark: boolean;
  setTheme: (theme: ThemeType) => void;
}

// Create the context
const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  isDark: false,
  setTheme: () => {},
});

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setThemeState] = useState<ThemeType>('system');
  
  // Determine if dark mode is active
  const isDark = theme === 'system'
    ? colorScheme === 'dark'
    : theme === 'dark';
  
  // Load saved theme preference on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const preferences = await getPreferences();
        setThemeState(preferences.theme);
      } catch (error) {
        console.error('Error loading theme preference:', error);
      }
    };
    
    loadTheme();
  }, []);
  
  // Change theme and save preference
  const setTheme = async (newTheme: ThemeType) => {
    setThemeState(newTheme);
    try {
      await savePreferences({ theme: newTheme });
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };
  
  return (
    <ThemeContext.Provider value={{ theme, isDark, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
