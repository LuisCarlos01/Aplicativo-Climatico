import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { WeatherData, ForecastData } from '../services/weatherService';
import { Location } from '../services/locationService';

// Define the types for our route parameters
export type AppStackParamList = {
  Home: undefined;
  Detail: {
    weather: WeatherData;
    forecast?: ForecastData;
    location: Location;
  };
  Search: undefined;
  Favorites: undefined;
};

// Create the navigator
const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
