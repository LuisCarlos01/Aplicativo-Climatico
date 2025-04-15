// Convert Kelvin to Celsius
export const kelvinToCelsius = (kelvin: number): number => {
  return Math.round(kelvin - 273.15);
};

// Convert Kelvin to Fahrenheit
export const kelvinToFahrenheit = (kelvin: number): number => {
  return Math.round((kelvin - 273.15) * 9/5 + 32);
};

// Format temperature with unit
export const formatTemperature = (
  temperature: number, 
  unit: 'metric' | 'imperial' = 'metric'
): string => {
  const temp = unit === 'metric' 
    ? kelvinToCelsius(temperature) 
    : kelvinToFahrenheit(temperature);
  
  const unitSymbol = unit === 'metric' ? '°C' : '°F';
  return `${temp}${unitSymbol}`;
};

// Get temperature category for styling
export const getTemperatureCategory = (celsius: number): string => {
  if (celsius < 0) return 'freezing';
  if (celsius < 10) return 'cold';
  if (celsius < 20) return 'mild';
  if (celsius < 30) return 'warm';
  if (celsius < 40) return 'hot';
  return 'extreme';
};

// Convert meters per second to kilometers per hour
export const mpsToKmh = (mps: number): number => {
  return Math.round(mps * 3.6);
};

// Format wind speed
export const formatWindSpeed = (
  speedMps: number, 
  unit: 'metric' | 'imperial' = 'metric'
): string => {
  if (unit === 'metric') {
    return `${mpsToKmh(speedMps)} km/h`;
  } else {
    return `${Math.round(speedMps * 2.237)} mph`;
  }
};

// Format precipitation probability as percentage
export const formatPrecipitationProbability = (probability: number): string => {
  return `${Math.round(probability * 100)}%`;
};

// Format humidity as percentage
export const formatHumidity = (humidity: number): string => {
  return `${humidity}%`;
};

// Format pressure
export const formatPressure = (pressure: number): string => {
  return `${pressure} hPa`;
};

// Format visibility
export const formatVisibility = (
  visibilityMeters: number, 
  unit: 'metric' | 'imperial' = 'metric'
): string => {
  if (unit === 'metric') {
    return visibilityMeters >= 1000
      ? `${(visibilityMeters / 1000).toFixed(1)} km`
      : `${visibilityMeters} m`;
  } else {
    const miles = visibilityMeters / 1609.34;
    return miles >= 1
      ? `${miles.toFixed(1)} mi`
      : `${Math.round(visibilityMeters * 3.28084)} ft`;
  }
};
