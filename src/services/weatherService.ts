import axios from 'axios';

// Get OpenWeatherMap API key from environment variables
const API_KEY = process.env.OPENWEATHER_API_KEY || '8d2de98e089f1c28e1a22fc19a24ef04';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Types for API responses
export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  rain?: {
    '1h'?: number;
    '3h'?: number;
  };
  snow?: {
    '1h'?: number;
    '3h'?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust?: number;
    };
    visibility: number;
    pop: number;
    rain?: {
      '3h': number;
    };
    snow?: {
      '3h': number;
    };
    sys: {
      pod: string;
    };
    dt_txt: string;
  }>;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface GeocodingData {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

// Get current weather by coordinates
export const getCurrentWeather = async (lat: number, lon: number, lang = 'pt_br'): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        lang,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

// Get 5-day forecast by coordinates
export const getForecast = async (lat: number, lon: number, lang = 'pt_br'): Promise<ForecastData> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        lang,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

// Search city by name
export const searchCity = async (query: string, limit = 5, lang = 'pt_br'): Promise<GeocodingData[]> => {
  try {
    const response = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
      params: {
        q: query,
        limit,
        appid: API_KEY,
        lang,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching city:', error);
    throw error;
  }
};

// Get weather and forecast together
export const getWeatherAndForecast = async (lat: number, lon: number, lang = 'pt_br'): Promise<{
  current: WeatherData;
  forecast: ForecastData;
}> => {
  try {
    const [currentWeather, forecast] = await Promise.all([
      getCurrentWeather(lat, lon, lang),
      getForecast(lat, lon, lang),
    ]);
    
    return {
      current: currentWeather,
      forecast: forecast,
    };
  } catch (error) {
    console.error('Error fetching weather and forecast:', error);
    throw error;
  }
};
