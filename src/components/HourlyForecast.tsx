import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useColorScheme,
} from 'react-native';
import theme from '../theme';
import WeatherIcon from './WeatherIcons';
import { formatTemperature } from '../utils/temperatureUtils';
import { getHourFromTimestamp, shouldUseNightIcon } from '../utils/dateUtils';

interface HourlyForecastItem {
  timestamp: number;
  temperature: number;
  conditionId: number;
  sunrise: number;
  sunset: number;
}

interface HourlyForecastProps {
  data: HourlyForecastItem[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ data }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? theme.colors.dark : theme.colors.light;
  
  // Only show the next 24 hours (or the amount of data we have if less)
  const hours = data.slice(0, 24);
  
  const renderItem = ({ item }: { item: HourlyForecastItem }) => {
    const hour = getHourFromTimestamp(item.timestamp);
    const isNight = shouldUseNightIcon(
      item.timestamp, 
      item.sunrise, 
      item.sunset
    );
    
    return (
      <View style={styles.hourItem}>
        <Text style={[styles.hourText, { color: colors.text }]}>
          {hour}
        </Text>
        
        <WeatherIcon
          conditionId={item.conditionId}
          isDay={!isNight}
          size={28}
          color={colors.text}
          style={styles.icon}
        />
        
        <Text style={[styles.tempText, { color: colors.text }]}>
          {formatTemperature(item.temperature)}
        </Text>
      </View>
    );
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        Próximas Horas
      </Text>
      
      <FlatList
        data={hours}
        renderItem={renderItem}
        keyExtractor={(item) => item.timestamp.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.medium,
    marginVertical: theme.spacing.small,
    borderRadius: theme.spacing.borderRadius.medium,
    padding: theme.spacing.medium,
  },
  title: {
    fontSize: theme.typography.size.md,
    fontWeight: '600' as any,
    marginBottom: theme.spacing.medium,
  },
  listContent: {
    paddingRight: theme.spacing.medium,
  },
  hourItem: {
    alignItems: 'center',
    marginRight: theme.spacing.large,
    width: 50,
  },
  hourText: {
    fontSize: theme.typography.size.sm,
    marginBottom: theme.spacing.small,
  },
  icon: {
    marginVertical: theme.spacing.small,
  },
  tempText: {
    fontSize: theme.typography.size.md,
    fontWeight: '500' as any,
  },
});

export default HourlyForecast;
