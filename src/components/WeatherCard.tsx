import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ImageBackground,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../theme';
import WeatherIcon, { HumidityIcon, WindIcon } from './WeatherIcons';
import { getWeatherGradient } from '../utils/weatherConditions';
import { formatTemperature } from '../utils/temperatureUtils';
import { formatTime } from '../utils/dateUtils';

interface WeatherCardProps {
  cityName: string;
  countryCode: string;
  temperature: number;
  feelsLike: number;
  conditionId: number;
  conditionDescription: string;
  humidity: number;
  windSpeed: number;
  timestamp: number;
  sunrise: number;
  sunset: number;
  onPress?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  cityName,
  countryCode,
  temperature,
  feelsLike,
  conditionId,
  conditionDescription,
  humidity,
  windSpeed,
  timestamp,
  sunrise,
  sunset,
  onPress,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Determine if it's currently day or night
  const currentTime = timestamp * 1000;
  const sunriseTime = sunrise * 1000;
  const sunsetTime = sunset * 1000;
  const isDay = currentTime > sunriseTime && currentTime < sunsetTime;
  
  // Get gradient colors based on weather condition
  const gradientColors = getWeatherGradient(conditionId, isDark);
  
  return (
    <TouchableOpacity
      style={styles.cardWrapper}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={gradientColors}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardHeader}>
          <View style={styles.locationContainer}>
            <Icon name="location" size={18} color="#FFF" style={styles.locationIcon} />
            <Text style={styles.cityName}>{cityName}</Text>
            <Text style={styles.countryCode}>{countryCode}</Text>
          </View>
          
          {onToggleFavorite && (
            <TouchableOpacity
              onPress={onToggleFavorite}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <Icon
                name={isFavorite ? 'star' : 'star-outline'}
                size={24}
                color={isFavorite ? '#FFD700' : '#FFF'}
              />
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperature}>
            {formatTemperature(temperature)}
          </Text>
          <View style={styles.conditionContainer}>
            <WeatherIcon
              conditionId={conditionId}
              isDay={isDay}
              size={40}
              color="#FFF"
            />
            <Text style={styles.conditionText}>
              {conditionDescription.charAt(0).toUpperCase() + conditionDescription.slice(1)}
            </Text>
          </View>
        </View>
        
        <Text style={styles.feelsLike}>
          Sensação térmica de {formatTemperature(feelsLike)}
        </Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <HumidityIcon size={18} color="#FFF" />
            <Text style={styles.detailText}>{humidity}%</Text>
          </View>
          
          <View style={styles.detailItem}>
            <WindIcon size={18} color="#FFF" />
            <Text style={styles.detailText}>{Math.round(windSpeed * 3.6)} km/h</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Icon name={isDay ? 'sunny-outline' : 'moon-outline'} size={18} color="#FFF" />
            <Text style={styles.detailText}>
              {formatTime(new Date(timestamp * 1000))}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: theme.spacing.borderRadius.large,
    overflow: 'hidden',
    marginHorizontal: theme.spacing.medium,
    marginVertical: theme.spacing.small,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  card: {
    padding: theme.spacing.large,
    borderRadius: theme.spacing.borderRadius.large,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.medium,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: theme.spacing.tiny,
  },
  cityName: {
    color: '#FFF',
    fontSize: theme.typography.size.lg,
    fontWeight: '600' as any,
    marginRight: theme.spacing.tiny,
  },
  countryCode: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: theme.typography.size.md,
  },
  temperatureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.small,
  },
  temperature: {
    color: '#FFF',
    fontSize: theme.typography.size.huge,
    fontWeight: '700' as any,
  },
  conditionContainer: {
    alignItems: 'center',
  },
  conditionText: {
    color: '#FFF',
    fontSize: theme.typography.size.sm,
    marginTop: theme.spacing.tiny,
    textAlign: 'center',
  },
  feelsLike: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: theme.typography.size.md,
    marginBottom: theme.spacing.medium,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.small,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    color: '#FFF',
    fontSize: theme.typography.size.sm,
    marginLeft: theme.spacing.tiny,
  },
});

export default WeatherCard;
