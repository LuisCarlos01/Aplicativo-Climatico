const lightColors = {
  primary: '#4A90E2',
  secondary: '#FFA000',
  background: '#F5F5F5',
  card: '#FFFFFF',
  text: '#212121',
  textSecondary: '#757575',
  border: '#E0E0E0',
  notification: '#FF4081',
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',
  
  // Weather-specific colors
  clearSky: '#47AB2F',
  fewClouds: '#54717A',
  clouds: '#515A5A',
  rain: '#57575D',
  thunderstorm: '#1F2124',
  snow: '#E0E0E0',
  mist: '#9E9E9E',
  
  // Gradients
  clearSkyGradient: ['#4A90E2', '#87CEFA'],
  fewCloudsGradient: ['#738CA6', '#A5B7C5'],
  cloudsGradient: ['#616E7C', '#9EA7B1'],
  rainGradient: ['#4B6584', '#778CA3'],
  thunderstormGradient: ['#2C3A47', '#57606F'],
  snowGradient: ['#D1D8E0', '#F5F6FA'],
  mistGradient: ['#A5B1C2', '#D1D8E0'],
};

const darkColors = {
  primary: '#64B5F6',
  secondary: '#FFB74D',
  background: '#121212',
  card: '#1E1E1E',
  text: '#FFFFFF',
  textSecondary: '#B0BEC5',
  border: '#424242',
  notification: '#FF80AB',
  success: '#81C784',
  warning: '#FFD54F',
  error: '#E57373',
  info: '#64B5F6',
  
  // Weather-specific colors
  clearSky: '#2E7D32',
  fewClouds: '#455A64',
  clouds: '#37474F',
  rain: '#3E4551',
  thunderstorm: '#263238',
  snow: '#EEEEEE',
  mist: '#757575',
  
  // Gradients
  clearSkyGradient: ['#1565C0', '#1976D2'],
  fewCloudsGradient: ['#37474F', '#455A64'],
  cloudsGradient: ['#263238', '#37474F'],
  rainGradient: ['#1A237E', '#283593'],
  thunderstormGradient: ['#0D47A1', '#1565C0'],
  snowGradient: ['#607D8B', '#78909C'],
  mistGradient: ['#424242', '#616161'],
};

// Temperature-based colors
const temperatureColors = {
  freezing: '#92C5EB', // Below 0°C
  cold: '#4A90E2',     // 0-10°C
  mild: '#43C64D',     // 10-20°C
  warm: '#FFA000',     // 20-30°C
  hot: '#FF5722',      // 30-40°C
  extreme: '#E53935',  // Above 40°C
};

// Export colors object
export default {
  light: lightColors,
  dark: darkColors,
  temperature: temperatureColors,
};
