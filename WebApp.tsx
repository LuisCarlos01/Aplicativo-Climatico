import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Image } from 'react-native';
import env from './src/config/environment';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
}

export default function WebApp() {
  const [city, setCity] = useState('São Paulo');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = env.OPENWEATHER_API_KEY;

  const fetchWeather = async () => {
    if (!city.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
      );
      
      if (!response.ok) {
        throw new Error(response.status === 404 
          ? 'Cidade não encontrada. Verifique o nome e tente novamente.' 
          : 'Erro ao buscar dados do clima. Tente novamente mais tarde.');
      }
      
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AppClima</Text>
        <Text style={styles.subtitle}>Previsão do Tempo</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="Digite o nome da cidade"
          placeholderTextColor="#888"
        />
        <TouchableOpacity 
          style={styles.button}
          onPress={fetchWeather}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>Carregando informações do clima...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchWeather}>
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      ) : weather ? (
        <ScrollView style={styles.weatherContainer}>
          <View style={styles.weatherCard}>
            <Text style={styles.cityName}>{weather.name}, {weather.sys.country}</Text>
            
            <View style={styles.weatherMain}>
              <Text style={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
              <View style={styles.weatherIconContainer}>
                {weather.weather[0] && (
                  <Image 
                    source={{ uri: getWeatherIcon(weather.weather[0].icon) }}
                    style={styles.weatherIcon}
                  />
                )}
                <Text style={styles.weatherDescription}>
                  {weather.weather[0]?.description}
                </Text>
              </View>
            </View>
            
            <View style={styles.weatherDetails}>
              <View style={styles.weatherDetail}>
                <Text style={styles.weatherDetailLabel}>Sensação</Text>
                <Text style={styles.weatherDetailValue}>{Math.round(weather.main.feels_like)}°C</Text>
              </View>
              
              <View style={styles.weatherDetail}>
                <Text style={styles.weatherDetailLabel}>Umidade</Text>
                <Text style={styles.weatherDetailValue}>{weather.main.humidity}%</Text>
              </View>
              
              <View style={styles.weatherDetail}>
                <Text style={styles.weatherDetailLabel}>Vento</Text>
                <Text style={styles.weatherDetailValue}>{(weather.wind.speed * 3.6).toFixed(1)} km/h</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>Busque por uma cidade para ver a previsão do tempo.</Text>
        </View>
      )}
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 AppClima - Todos os direitos reservados</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 12,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  weatherContainer: {
    flex: 1,
  },
  weatherCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
    textAlign: 'center',
  },
  weatherMain: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  weatherIconContainer: {
    alignItems: 'center',
  },
  weatherIcon: {
    width: 80,
    height: 80,
  },
  weatherDescription: {
    fontSize: 16,
    color: '#7F8C8D',
    textTransform: 'capitalize',
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  weatherDetail: {
    alignItems: 'center',
  },
  weatherDetailLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 5,
  },
  weatherDetailValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noDataText: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#95A5A6',
  },
});