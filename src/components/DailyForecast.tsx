import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import theme from '../theme';
import WeatherIcon from './WeatherIcons';
import { formatTemperature } from '../utils/temperatureUtils';
import { getDayFromTimestamp, formatPrecipitationProbability } from '../utils/dateUtils';

interface DailyForecastItem {
  timestamp: number;
  tempMin: number;
  tempMax: number;
  conditionId: number;
  precipitationProbability: number;
}

interface DailyForecastProps {
  data: DailyForecastItem[];
  onDayPress?: (day: DailyForecastItem) => void;
}

const DailyForecast: React.FC<DailyForecastProps> = ({ data, onDayPress }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? theme.colors.dark : theme.colors.light;
  
  // Show only the next 7 days
  const days = data.slice(0, 7);
  
  const handleDayPress = (day: DailyForecastItem) => {
    if (onDayPress) {
      onDayPress(day);
    }
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        Próximos Dias
      </Text>
      
      <View style={styles.daysContainer}>
        {days.map((day) => {
          const dayName = getDayFromTimestamp(day.timestamp);
          return (
            <TouchableOpacity
              key={day.timestamp.toString()}
              style={styles.dayItem}
              onPress={() => handleDayPress(day)}
              activeOpacity={onDayPress ? 0.7 : 1}
            >
              <Text style={[styles.dayText, { color: colors.text }]}>
                {dayName}
              </Text>
              
              <View style={styles.iconContainer}>
                <WeatherIcon
                  conditionId={day.conditionId}
                  size={24}
                  color={colors.text}
                />
                {day.precipitationProbability > 0.1 && (
                  <Text style={[styles.precipText, { color: colors.info }]}>
                    {formatPrecipitationProbability(day.precipitationProbability)}
                  </Text>
                )}
              </View>
              
              <View style={styles.tempContainer}>
                <Text style={[styles.maxTempText, { color: colors.text }]}>
                  {formatTemperature(day.tempMax)}
                </Text>
                <Text style={[styles.minTempText, { color: colors.textSecondary }]}>
                  {formatTemperature(day.tempMin)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
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
  daysContainer: {
    
  },
  dayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.small,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  dayText: {
    width: 60,
    fontSize: theme.typography.size.md,
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  precipText: {
    fontSize: theme.typography.size.sm,
    marginLeft: theme.spacing.small,
  },
  tempContainer: {
    flexDirection: 'row',
    width: 100,
    justifyContent: 'flex-end',
  },
  maxTempText: {
    fontSize: theme.typography.size.md,
    fontWeight: '500' as any,
    marginRight: theme.spacing.medium,
  },
  minTempText: {
    fontSize: theme.typography.size.md,
  },
});

export default DailyForecast;
