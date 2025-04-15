// Format date to readable string like "Monday, September 4"
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
};

// Format date to day of week like "Mon"
export const formatDay = (date: Date): string => {
  return date.toLocaleDateString('pt-BR', { weekday: 'short' });
};

// Format time to readable string like "14:30"
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

// Format time to hour only like "14h"
export const formatHour = (date: Date): string => {
  return `${date.getHours()}h`;
};

// Get hour from timestamp
export const getHourFromTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return formatHour(date);
};

// Get day name from timestamp
export const getDayFromTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return formatDay(date);
};

// Check if a timestamp is today
export const isToday = (timestamp: number): boolean => {
  const today = new Date();
  const date = new Date(timestamp * 1000);
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

// Check if timestamp is night (between 18:00 and 6:00)
export const isNight = (timestamp: number): boolean => {
  const date = new Date(timestamp * 1000);
  const hour = date.getHours();
  return hour >= 18 || hour < 6;
};

// Format date from API timestamp
export const formatDateFromTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return formatDate(date);
};

// Determine if we should use the night icon based on time and sunrise/sunset
export const shouldUseNightIcon = (
  timestamp: number, 
  sunrise: number, 
  sunset: number
): boolean => {
  const date = timestamp * 1000;
  const sunriseTime = sunrise * 1000;
  const sunsetTime = sunset * 1000;
  
  return date < sunriseTime || date > sunsetTime;
};
