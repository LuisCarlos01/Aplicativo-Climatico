import React, { useEffect, useState, useCallback } from 'react';

// Acesso à chave de API do OpenWeather a partir do objeto ENV definido no HTML
const apiKey = window.ENV?.OPENWEATHER_API_KEY || '';

// Tipos de alertas meteorológicos
const ALERT_TYPES = {
  EXTREME_TEMP: 'Temperatura Extrema',
  STORM: 'Tempestade',
  HEAVY_RAIN: 'Chuva Forte',
  SNOW: 'Neve',
  FOG: 'Neblina',
  HIGH_WIND: 'Ventos Fortes',
  AIR_QUALITY: 'Qualidade do Ar',
};

// Componente de Notificação
function Notification({ type, title, message, onClose, id }) {
  const [isExiting, setIsExiting] = useState(false);
  
  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 400);
  };
  
  // Define o ícone com base no tipo
  const getIcon = () => {
    switch(type) {
      case 'alert':
        return '⚠️';
      case 'warning':
        return '⚡';
      case 'info':
      default:
        return 'ℹ️';
    }
  };
  
  useEffect(() => {
    // Auto-fechar após 7 segundos
    const timer = setTimeout(() => {
      handleClose();
    }, 7000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={`notification ${type} ${isExiting ? 'exit' : ''}`} role="alert">
      <div className={`notification-icon ${type}`} aria-hidden="true">
        {getIcon()}
      </div>
      <div className="notification-content">
        <div className="notification-title">{title}</div>
        <div className="notification-message">{message}</div>
      </div>
      <button 
        className="notification-close" 
        onClick={handleClose}
        aria-label="Fechar notificação"
      >
        ×
      </button>
    </div>
  );
}

function WebApp() {
  const [city, setCity] = useState('São Paulo');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([]);

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

  // Função para adicionar notificações
  const addNotification = useCallback((type, title, message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, title, message }]);
    
    // Emite som de notificação
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLWOw8uTAZDEmRluy6c13IkZwY67NpmpMWpRwesOWVmx9i4BxrpJVeIeAf4CBp6ZpbXh1gYCasFxSYG1ycG6Uw3ZMU2RnZWmEsGhDSlBOVGOEt4xZRkZLV3Cey39ELzk8S3Cu2pFQKyYuOlZ61siDVkU9Okp0pKlmRFFHS15um5xbPUBHT2Jsi4JFMzZBVGh3g3k9KzI4SWZ5l5VnSjo7RFRmgpyDbFZJRkVSaoCThGhSTkxQWnOPmIBdRDw8RluHmH1aQzY6RVptgnRwY0o/RFWU0LyLa0EkN2XjhU44SHl2VT1la2lLL1uLpGQvKln9iFdHAnB6ZzMqX9KTSjI6VtFpRBsDWYB3VD5LY8OOX0VCVK5uTDkYMFiZ08eHc2ZbTDxkv8lxRDRDcr+RVDQQJUqM4sJ5XFlPQmhn0+R+Tiw6dMS8dzYLIj9+5q5rTkBhxalaPAwXRqVuPC1dq7ebYjokPWeVq2tCKFFsn7CJVDgnOF6kvpFcNDBWiaibckMxS36qpHFKMEBnmMmXVDAuUYejoGM+Mkx0pcGNSSo8ZZexkFs+M05qoL+UXz45VX+kmWtHOEVqosGVXz00TX2nnmdANklxqKxuRzU/ZZe3mF04N1d+qZ5kPjlQcqKbZ0I2QWWaq41JMT5ghMCvZj42RnCmq3dONj9ghbOTUDA7Xou0nlw3NU14q7aGTTVBZpS9pGQ8M0tutJFPMkJsnK5+SzlHcZ7DoFxFN05zoqZ0SjQ9Xoy7oVg4NE2CtqBoRTdDZZCzlFEvPWKMt6RqQzRIcaGziUsvQ2yYwKRePzVRfLOsckM2SXOnq2xJOUhxncOrb004RWugwKBhOy5JbqO0cEc9Xoa1u3lQPEVnm7yoZDouTH2pu4ZYRk5zoKx8TjhBZZTBrGtFM0hxoK6GVC8+ZZjFr21JOk5ynn5ZRE1xoayPYko4TXWoq3ZFNUVun7mUWTg6V4W6pWVDVYO0nWhELklypM2xcT42UXqzvIxbQT9eicqqbkIyTHakxaZpQzVJcKfCnV5DO2OOu6dcPkVnl8CSYTA4V4i9qmdKSXGlr3xNNENpmsCobkU3S3Koy59fQjZggr+jaEIzTHWqyKRpPzJJcqnPlmZCOGGIvadqRS9NdqjLomlAN1B5pLuKWD1DZ5TAqmxGMUZxrMOaXEI5W4S7p2dEMUx2qcafYUA0SnWwzZ5lQDVVfLG5hlU7QmaVv6lpRjBHdLXMnGBBN1h9uL6HWDxBZJG6pGRCMUlyrMiZXj82WH22uoZUO0Fnlb+nZ0ExSnStzJlcPTVYfri8hVI5P2aRvKdmQTFLdLDLml08NVV+uLuHVDpBZpW/qWhCMUt0rcuaXTw1Vn24u4ZSOkBmkb2nZkExTHWxzJtePTVXfrm9h1Q6QGeWv6loQjFLdK7Lml08Nld/ur2HVDtBZ5a+qGdCMUx1r8ybXzw1V3+6vYdUOkBmkr2nZkExS3Swy5pePTZZgLq9h1M6QGaTvalmQTFKdLDMm148NVl/ubyGUzo/ZpO8p2ZBMUt1sc2bXz02WYC6vYdTOkBmk72pZkExSnSxzJtePTZYf7q+iFU7QWeUvqloQjFLdK7Lml08NVd+uLyGUzpAZ5S/qmhCMUt0rsyaXj01V3+5vYdUO0FolcCpaEIxTHSvy5tePDVXfri8h1M6QGaUv6loQjFMda/Mm188NVeAur6IVDpAZpO9qGVBMUp0r8ubXf80VXy3vIdUO0FnlcCqakQzTnaxzZxgPTVWfbe8h1Q6QGeVvqpqRDNOdrHNnGA9NVZ9t7yHVDpAZ5W+qmpEM052sc2cYD01Vn23vIdUOkBnlb6qakQzTnaxzZxgPTVWfbe8h1Q6QGeVvqpqRDNOdrHNnGA9NVZ9t7yHVDpAZ5W+qmZAAA==');
      audio.play();
    } catch (e) {
      console.log('Notificação sonora indisponível:', e);
    }
  }, []);
  
  // Função para remover notificação
  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);
  
  // Função para verificar e emitir alertas com base nas condições climáticas
  const checkForWeatherAlerts = useCallback((weatherData) => {
    if (!weatherData) return;
    
    const alerts = [];
    
    // Verifica temperatura extrema
    if (weatherData.main.temp > 35) {
      alerts.push({
        type: 'alert',
        title: ALERT_TYPES.EXTREME_TEMP,
        message: 'Temperatura muito alta! Evite exposição ao sol entre 10h e 16h e mantenha-se hidratado.'
      });
    } else if (weatherData.main.temp < 5) {
      alerts.push({
        type: 'alert',
        title: ALERT_TYPES.EXTREME_TEMP,
        message: 'Temperatura muito baixa! Proteja-se adequadamente e evite exposição prolongada ao frio.'
      });
    }
    
    // Verifica tempestades
    if (weatherData.weather[0].id >= 200 && weatherData.weather[0].id < 300) {
      alerts.push({
        type: 'alert',
        title: ALERT_TYPES.STORM,
        message: 'Alerta de tempestade! Evite áreas abertas e fique em locais seguros.'
      });
    }
    
    // Verifica chuva forte
    if (weatherData.weather[0].id >= 500 && weatherData.weather[0].id < 600) {
      const isHeavy = weatherData.weather[0].id >= 502;
      if (isHeavy) {
        alerts.push({
          type: 'warning',
          title: ALERT_TYPES.HEAVY_RAIN,
          message: 'Chuva forte prevista! Atenção para possíveis alagamentos e deslizamentos.'
        });
      }
    }
    
    // Verifica neve
    if (weatherData.weather[0].id >= 600 && weatherData.weather[0].id < 700) {
      alerts.push({
        type: 'warning',
        title: ALERT_TYPES.SNOW,
        message: 'Neve prevista! Dirija com cuidado e esteja preparado para temperaturas baixas.'
      });
    }
    
    // Verifica neblina/nevoeiro
    if (weatherData.weather[0].id >= 700 && weatherData.weather[0].id < 800) {
      if (weatherData.weather[0].id === 741 || weatherData.weather[0].id === 721) {
        alerts.push({
          type: 'warning',
          title: ALERT_TYPES.FOG,
          message: 'Neblina ou nevoeiro! Visibilidade reduzida, dirija com faróis ligados e velocidade moderada.'
        });
      }
    }
    
    // Verifica ventos fortes
    if (weatherData.wind && weatherData.wind.speed * 3.6 > 50) { // Convertendo m/s para km/h
      alerts.push({
        type: 'warning',
        title: ALERT_TYPES.HIGH_WIND,
        message: 'Ventos fortes previstos! Evite áreas com estruturas soltas e tenha cuidado ao dirigir.'
      });
    }
    
    // Adiciona os alertas
    alerts.forEach(alert => {
      addNotification(alert.type, alert.title, alert.message);
    });
  }, [addNotification]);
  
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
  
  // Verifica alertas quando o clima muda
  useEffect(() => {
    if (weather) {
      checkForWeatherAlerts(weather);
    }
  }, [weather, checkForWeatherAlerts]);
  
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
    <div className="container" role="main">
      {/* Contêiner de notificações */}
      <div className="notification-container" aria-live="polite">
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            id={notification.id}
            type={notification.type}
            title={notification.title}
            message={notification.message}
            onClose={removeNotification}
          />
        ))}
      </div>
      
      {/* Botão de alternar tema */}
      <button 
        className={`theme-toggle ${darkMode ? 'dark' : ''}`}
        onClick={toggleDarkMode}
        aria-label={darkMode ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
        title={darkMode ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
      >
        <span className="theme-toggle-icon sun" aria-hidden="true">☀️</span>
        <span className="theme-toggle-icon moon" aria-hidden="true">🌙</span>
        <div className="theme-toggle-slider"></div>
      </button>
    
      <header className="header">
        <h1 className="title">AppClima</h1>
        <p className="subtitle">Previsão do Tempo</p>
      </header>
      
      <div className="search-container">
        <label htmlFor="city-input" className="sr-only">Digite o nome da cidade</label>
        <input
          id="city-input"
          className="input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Digite o nome da cidade"
          aria-label="Digite o nome da cidade"
          onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
        />
        <button 
          className="button"
          onClick={fetchWeather}
          disabled={loading}
          aria-label="Buscar previsão do tempo"
        >
          Buscar
        </button>
      </div>
      
      {loading ? (
        <div className="loading-container" role="status" aria-live="polite">
          <div className="loading-spinner" aria-hidden="true"></div>
          <p className="loading-text">Carregando informações do clima...</p>
        </div>
      ) : error ? (
        <div className="error-container" role="alert">
          <p className="error-text">{error}</p>
          <button 
            className="retry-button" 
            onClick={fetchWeather}
            aria-label="Tentar buscar o clima novamente"
          >
            Tentar Novamente
          </button>
        </div>
      ) : weather ? (
        <div className="weather-container" role="region" aria-label="Informações do clima">
          <div className="weather-card" style={weatherCardStyle}>
            <h2 className="city-name">{weather.name}, {weather.sys.country}</h2>
            
            <div className="weather-main">
              <div className="temperature" aria-label={`Temperatura atual: ${Math.round(weather.main.temp)} graus Celsius`}>
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather-icon-container">
                {weather.weather[0] && (
                  <img 
                    src={getWeatherIcon(weather.weather[0].icon)}
                    alt={weather.weather[0].description}
                    className="weather-icon"
                    width="90"
                    height="90"
                  />
                )}
                <p className="weather-description">
                  {weather.weather[0]?.description}
                </p>
              </div>
            </div>
            
            <div className="weather-details" role="list">
              <div className="weather-detail" role="listitem">
                <span className="weather-detail-label" id="feels-like-label">Sensação</span>
                <span className="weather-detail-value" aria-labelledby="feels-like-label">
                  {Math.round(weather.main.feels_like)}°C
                </span>
              </div>
              
              <div className="weather-detail" role="listitem">
                <span className="weather-detail-label" id="humidity-label">Umidade</span>
                <span className="weather-detail-value" aria-labelledby="humidity-label">
                  {weather.main.humidity}%
                </span>
              </div>
              
              <div className="weather-detail" role="listitem">
                <span className="weather-detail-label" id="wind-label">Vento</span>
                <span className="weather-detail-value" aria-labelledby="wind-label">
                  {(weather.wind.speed * 3.6).toFixed(1)} km/h
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-data-container" role="status">
          <p className="no-data-text">Busque por uma cidade para ver a previsão do tempo.</p>
        </div>
      )}
      
      <footer className="footer">
        <p className="footer-text">© 2025 AppClima - Todos os direitos reservados</p>
      </footer>
    </div>
  );
}

export default WebApp;