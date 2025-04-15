// Environment variables configuration for the app

interface Environment {
  OPENWEATHER_API_KEY: string;
}

// Access environment variables
const env: Environment = {
  OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY || '',
};

export default env;