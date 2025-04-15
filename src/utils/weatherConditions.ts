export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
  backgroundColor: string;
  gradient: string[];
  iconName: string;
}

// OpenWeatherMap condition IDs grouped by weather type
export const weatherConditionGroups = {
  thunderstorm: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
  drizzle: [300, 301, 302, 310, 311, 312, 313, 314, 321],
  rain: [500, 501, 502, 503, 504, 511, 520, 521, 522, 531],
  snow: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
  atmosphere: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
  clear: [800],
  clouds: [801, 802, 803, 804],
};

// Get weather condition type based on OpenWeatherMap condition ID
export const getWeatherConditionType = (id: number): string => {
  if (weatherConditionGroups.thunderstorm.includes(id)) return 'thunderstorm';
  if (weatherConditionGroups.drizzle.includes(id)) return 'drizzle';
  if (weatherConditionGroups.rain.includes(id)) return 'rain';
  if (weatherConditionGroups.snow.includes(id)) return 'snow';
  if (weatherConditionGroups.atmosphere.includes(id)) return 'atmosphere';
  if (weatherConditionGroups.clear.includes(id)) return 'clear';
  if (weatherConditionGroups.clouds.includes(id)) return 'clouds';
  return 'unknown';
};

// Get weather icon name based on OpenWeatherMap condition ID and whether it's day or night
export const getWeatherIconName = (id: number, isDay: boolean = true): string => {
  const condition = getWeatherConditionType(id);
  
  switch (condition) {
    case 'thunderstorm':
      return 'thunderstorm-outline';
    case 'drizzle':
      return 'rainy-outline';
    case 'rain':
      return 'rainy-outline';
    case 'snow':
      return 'snow-outline';
    case 'atmosphere':
      return 'cloud-outline';
    case 'clear':
      return isDay ? 'sunny-outline' : 'moon-outline';
    case 'clouds':
      return id === 801 
        ? (isDay ? 'partly-sunny-outline' : 'cloudy-night-outline') 
        : 'cloud-outline';
    default:
      return 'help-outline';
  }
};

// Get background gradient based on weather condition
export const getWeatherGradient = (id: number, isDark: boolean = false): string[] => {
  const condition = getWeatherConditionType(id);
  const colorSet = isDark ? 'dark' : 'light';
  
  switch (condition) {
    case 'thunderstorm':
      return ['#1A2028', '#293742'];
    case 'drizzle':
    case 'rain':
      return ['#4B6584', '#778CA3'];
    case 'snow':
      return ['#D1D8E0', '#F5F6FA'];
    case 'atmosphere':
      return ['#A5B1C2', '#D1D8E0'];
    case 'clear':
      return ['#4A90E2', '#87CEFA'];
    case 'clouds':
      return id === 801 
        ? ['#738CA6', '#A5B7C5']
        : ['#616E7C', '#9EA7B1'];
    default:
      return ['#4A90E2', '#87CEFA'];
  }
};

// Get description for weather condition
export const getWeatherDescription = (id: number): string => {
  const condition = getWeatherConditionType(id);
  
  switch (condition) {
    case 'thunderstorm':
      return 'Trovoada';
    case 'drizzle':
      return 'Chuvisco';
    case 'rain':
      return 'Chuva';
    case 'snow':
      return 'Neve';
    case 'atmosphere':
      if (id === 701 || id === 741) return 'Neblina';
      if (id === 711) return 'Fumaça';
      if (id === 721) return 'Névoa';
      if (id === 731 || id === 751 || id === 761) return 'Poeira';
      if (id === 762) return 'Cinzas vulcânicas';
      if (id === 771) return 'Rajadas';
      if (id === 781) return 'Tornado';
      return 'Condições atmosféricas';
    case 'clear':
      return 'Céu limpo';
    case 'clouds':
      if (id === 801) return 'Poucas nuvens';
      if (id === 802) return 'Nuvens dispersas';
      if (id === 803) return 'Nuvens quebradas';
      if (id === 804) return 'Nublado';
      return 'Nuvens';
    default:
      return 'Clima desconhecido';
  }
};

// Determine if the weather is "good" for outdoor activities
export const isGoodWeather = (id: number): boolean => {
  const condition = getWeatherConditionType(id);
  return condition === 'clear' || (condition === 'clouds' && id === 801);
};
