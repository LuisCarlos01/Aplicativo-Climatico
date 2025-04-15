import React, { useEffect, useState } from 'react';

// Acesso à chave de API do OpenWeather a partir do objeto ENV definido no HTML
const apiKey = window.ENV?.OPENWEATHER_API_KEY || '';

function WebApp() {
  const [city, setCity] = useState('São Paulo');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

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
    
    // Verifica se há preferência de tema salva
    const savedTheme = localStorage.getItem('app-clima-theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark-mode');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.remove('dark-mode');
    }
  }, []);
  
  // Função para alternar entre modo claro e escuro
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Salva a preferência do usuário
    localStorage.setItem('app-clima-theme', newDarkMode ? 'dark' : 'light');
    
    // Aplica o tema a toda a página - HTML e body
    document.documentElement.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
    
    if (newDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };
  
  // Função para escolher o gradiente de fundo com base no ID da condição climática
  const getWeatherBackground = (conditionId) => {
    if (!conditionId) return '';
    
    // Céu limpo
    if (conditionId === 800) {
      return 'var(--gradient-clear)';
    }
    
    // Nublado ou parcialmente nublado
    if (conditionId >= 801 && conditionId <= 804) {
      return 'var(--gradient-cloudy)';
    }
    
    // Tempestade
    if (conditionId >= 200 && conditionId <= 232) {
      return 'var(--gradient-night)';
    }
    
    // Chuva
    if ((conditionId >= 300 && conditionId <= 321) || (conditionId >= 500 && conditionId <= 531)) {
      return 'var(--gradient-rain)';
    }
    
    // Neve
    if (conditionId >= 600 && conditionId <= 622) {
      return 'linear-gradient(120deg, #E0EAFC, #CFDEF3)';
    }
    
    // Neblina, fumaça, etc.
    if (conditionId >= 700 && conditionId <= 781) {
      return 'linear-gradient(120deg, #606c88, #3f4c6b)';
    }
    
    return 'var(--gradient-blue)';
  };
  
  // Aplicar a cor de fundo dinâmica ao weather card
  const weatherCardStyle = weather ? {
    background: getWeatherBackground(weather.weather[0]?.id)
  } : {};

  return (
    <div className="container">
      {/* Botão de alternar tema */}
      <div 
        className={`theme-toggle ${darkMode ? 'dark' : ''}`}
        onClick={toggleDarkMode}
        title={darkMode ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
      >
        <span className="theme-toggle-icon sun">☀️</span>
        <span className="theme-toggle-icon moon">🌙</span>
        <div className="theme-toggle-slider"></div>
      </div>
    
      <div className="header">
        <h1 className="title">AppClima</h1>
        <p className="subtitle">Previsão do Tempo</p>
      </div>
      
      <div className="search-container">
        <input
          className="input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Digite o nome da cidade"
        />
        <button 
          className="button"
          onClick={fetchWeather}
          disabled={loading}
        >
          Buscar
        </button>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Carregando informações do clima...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p className="error-text">{error}</p>
          <button className="retry-button" onClick={fetchWeather}>
            Tentar Novamente
          </button>
        </div>
      ) : weather ? (
        <div className="weather-container">
          <div className="weather-card" style={weatherCardStyle}>
            <h2 className="city-name">{weather.name}, {weather.sys.country}</h2>
            
            <div className="weather-main">
              <div className="temperature">{Math.round(weather.main.temp)}°C</div>
              <div className="weather-icon-container">
                {weather.weather[0] && (
                  <img 
                    src={getWeatherIcon(weather.weather[0].icon)}
                    alt={weather.weather[0].description}
                    className="weather-icon"
                  />
                )}
                <p className="weather-description">
                  {weather.weather[0]?.description}
                </p>
              </div>
            </div>
            
            <div className="weather-details">
              <div className="weather-detail">
                <span className="weather-detail-label">Sensação</span>
                <span className="weather-detail-value">{Math.round(weather.main.feels_like)}°C</span>
              </div>
              
              <div className="weather-detail">
                <span className="weather-detail-label">Umidade</span>
                <span className="weather-detail-value">{weather.main.humidity}%</span>
              </div>
              
              <div className="weather-detail">
                <span className="weather-detail-label">Vento</span>
                <span className="weather-detail-value">{(weather.wind.speed * 3.6).toFixed(1)} km/h</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-data-container">
          <p className="no-data-text">Busque por uma cidade para ver a previsão do tempo.</p>
        </div>
      )}
      
      <div className="footer">
        <p className="footer-text">© 2025 AppClima - Todos os direitos reservados</p>
      </div>
    </div>
  );
}

export default WebApp;