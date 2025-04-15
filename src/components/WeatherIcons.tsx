import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getWeatherIconName } from '../utils/weatherConditions';

interface WeatherIconProps {
  conditionId: number;
  isDay?: boolean;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

// Component for showing weather icons based on condition ID
const WeatherIcon: React.FC<WeatherIconProps> = ({
  conditionId,
  isDay = true,
  size = 32,
  color = '#FFFFFF',
  style,
}) => {
  const iconName = getWeatherIconName(conditionId, isDay);
  
  return (
    <Icon 
      name={iconName} 
      size={size} 
      color={color} 
      style={[styles.icon, style]} 
    />
  );
};

// Component for temperature icon
export const TemperatureIcon: React.FC<{ size?: number; color?: string; style?: ViewStyle }> = ({
  size = 24,
  color = '#FFFFFF',
  style,
}) => {
  return (
    <Icon 
      name="thermometer-outline" 
      size={size} 
      color={color} 
      style={[styles.icon, style]} 
    />
  );
};

// Component for feels like temperature icon
export const FeelsLikeIcon: React.FC<{ size?: number; color?: string; style?: ViewStyle }> = ({
  size = 24,
  color = '#FFFFFF',
  style,
}) => {
  return (
    <Icon 
      name="body-outline" 
      size={size} 
      color={color} 
      style={[styles.icon, style]} 
    />
  );
};

// Component for humidity icon
export const HumidityIcon: React.FC<{ size?: number; color?: string; style?: ViewStyle }> = ({
  size = 24,
  color = '#FFFFFF',
  style,
}) => {
  return (
    <Icon 
      name="water-outline" 
      size={size} 
      color={color} 
      style={[styles.icon, style]} 
    />
  );
};

// Component for wind icon
export const WindIcon: React.FC<{ size?: number; color?: string; style?: ViewStyle }> = ({
  size = 24,
  color = '#FFFFFF',
  style,
}) => {
  return (
    <Icon 
      name="speedometer-outline" 
      size={size} 
      color={color} 
      style={[styles.icon, style]} 
    />
  );
};

// Component for pressure icon
export const PressureIcon: React.FC<{ size?: number; color?: string; style?: ViewStyle }> = ({
  size = 24,
  color = '#FFFFFF',
  style,
}) => {
  return (
    <Icon 
      name="speedometer-outline" 
      size={size} 
      color={color} 
      style={[styles.icon, style]} 
    />
  );
};

// Component for visibility icon
export const VisibilityIcon: React.FC<{ size?: number; color?: string; style?: ViewStyle }> = ({
  size = 24,
  color = '#FFFFFF',
  style,
}) => {
  return (
    <Icon 
      name="eye-outline" 
      size={size} 
      color={color} 
      style={[styles.icon, style]} 
    />
  );
};

// Component for sunrise icon
export const SunriseIcon: React.FC<{ size?: number; color?: string; style?: ViewStyle }> = ({
  size = 24,
  color = '#FFFFFF',
  style,
}) => {
  return (
    <Icon 
      name="sunny-outline" 
      size={size} 
      color={color} 
      style={[styles.icon, style]} 
    />
  );
};

// Component for sunset icon
export const SunsetIcon: React.FC<{ size?: number; color?: string; style?: ViewStyle }> = ({
  size = 24,
  color = '#FFFFFF',
  style,
}) => {
  return (
    <Icon 
      name="partly-sunny-outline" 
      size={size} 
      color={color} 
      style={[styles.icon, style]} 
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    // Default icon styling
  },
});

export default WeatherIcon;
