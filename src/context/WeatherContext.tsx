import React, { createContext, useContext, useState } from 'react';
import {
  getCurrentWeather,
  getForecast,
  getWeatherAndForecast,
  WeatherData,
  ForecastData,
} from '../services/weatherService';
import { Location } from '../services/locationService';

interface WeatherContextType {
  currentWeather: WeatherData | null;
  forecast: ForecastData | null;
  isLoading: boolean;
  error: string | null;
  loadWeather: (location: Location) => Promise<void>;
  loadWeatherAndForecast: (location: Location) => Promise<void>;
}

// Create the context
const WeatherContext = createContext<WeatherContextType>({
  currentWeather: null,
  forecast: null,
  isLoading: false,
  error: null,
  loadWeather: async () => {},
  loadWeatherAndForecast: async () => {},
});

// Custom hook to use the weather context
export const useWeather = () => useContext(WeatherContext);

// Provider component
export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Load current weather for a location
  const loadWeather = async (location: Location): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const weather = await getCurrentWeather(location.lat, location.lon);
      setCurrentWeather(weather);
    } catch (err) {
      console.error('Error loading weather:', err);
      setError('Falha ao carregar dados do clima.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load current weather and forecast for a location
  const loadWeatherAndForecast = async (location: Location): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { current, forecast } = await getWeatherAndForecast(location.lat, location.lon);
      setCurrentWeather(current);
      setForecast(forecast);
    } catch (err) {
      console.error('Error loading weather and forecast:', err);
      setError('Falha ao carregar dados do clima.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <WeatherContext.Provider
      value={{
        currentWeather,
        forecast,
        isLoading,
        error,
        loadWeather,
        loadWeatherAndForecast,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
