import React, { useEffect, useState, useCallback, useMemo } from 'react';
import weatherIcons from './public/weather-icons';

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
  UV_INDEX: 'Índice UV',
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

// Componente de previsão do dia
function ForecastDay({ date, icon, tempMax, tempMin, condition }) {
  const formatDate = (timestamp) => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const d = new Date(timestamp * 1000);
    return `${days[d.getDay()]}, ${d.getDate()}/${d.getMonth() + 1}`;
  };

  // Verificar se temos o ícone SVG premium para este código
  const iconSrc = weatherIcons[icon] 
    ? `data:image/svg+xml;utf8,${encodeURIComponent(weatherIcons[icon])}` 
    : `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="forecast-day">
      <div className="forecast-date">{formatDate(date)}</div>
      <div className="forecast-icon-container">
        <img 
          src={iconSrc}
          alt={condition}
          className="forecast-icon"
          width="50"
          height="50"
        />
      </div>
      <div className="forecast-temp">
        <div className="forecast-max">
          <span className="forecast-max-label">Máx</span>
          <span className="forecast-max-value">{Math.round(tempMax)}°</span>
        </div>
        <div className="forecast-min">
          <span className="forecast-min-label">Mín</span>
          <span className="forecast-min-value">{Math.round(tempMin)}°</span>
        </div>
      </div>
      <div className="forecast-condition">{condition}</div>
    </div>
  );
}

// Componente AirQuality
function AirQualityBadge({ aqi }) {
  // Indicador de qualidade do ar (1-5)
  // 1: Boa, 2: Razoável, 3: Moderada, 4: Ruim, 5: Muito Ruim
  
  // Valores simulados para demonstração - em produção usaria dados reais da API
  const quality = aqi || 2;
  
  let badgeClass = 'badge-info';
  let label = 'Boa';
  
  if (quality === 1) {
    badgeClass = 'badge-success';
    label = 'Boa';
  } else if (quality === 2) {
    badgeClass = 'badge-info';
    label = 'Razoável';
  } else if (quality === 3) {
    badgeClass = 'badge-warning';
    label = 'Moderada';
  } else if (quality >= 4) {
    badgeClass = 'badge-danger';
    label = quality === 5 ? 'Muito Ruim' : 'Ruim';
  }
  
  return (
    <span className={`badge ${badgeClass}`}>
      <span className="badge-icon">
        <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="airGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#90CAF9" />
              <stop offset="100%" stopColor="#2196F3" />
            </linearGradient>
          </defs>
          <path d="M12.5,2C9.85,2 7.45,3 5.6,4.6C2.62,7.15 1.25,10.67 2.04,14.56C2.38,16.18 3.19,17.6 4.5,18.67C5.28,19.33 6.19,19.87 7.29,20.29C8.39,20.71 9.89,21 11.77,21C12.69,21 13.55,20.85 14.43,20.6C15.37,20.33 16.2,19.97 16.95,19.5C17.96,18.87 18.79,18.09 19.42,17.15C20.09,16.17 20.51,15.04 20.7,13.81C20.91,12.5 20.87,11.18 20.58,9.91C20.3,8.67 19.68,7.45 18.77,6.35C17.76,5.1 16.26,4.09 14.56,3.5C13.76,3.23 13.11,3.07 12.5,3V2M12.5,4C13,4.05 14,4.27 15,5C15.2,5.13 16,5.72 16.74,6.84C17.43,7.87 17.74,9.34 17.75,11.25C17.76,13.26 17.05,17 13.15,17.95C11.8,18.33 11.22,18.29 10.42,18.14C9.63,17.96 8.7,17.55 7.9,16.84C6.67,15.77 6.07,14.23 6,11.5C5.97,9.72 6.45,8.25 7.47,7.17C8.5,6.09 9.83,5.5 11.05,5.25C11.2,5.22 11.88,5.04 12.62,5C12.65,5 12.55,5 12.5,4L12.5,4Z" fill="url(#airGradient)">
            <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
          </path>
        </svg>
      </span>
      Qualidade do ar: {label}
    </span>
  );
}

// Componente UVIndex
function UVIndexBadge({ uvi }) {
  // Índice UV (0-11+)
  // 0-2: Baixo, 3-5: Moderado, 6-7: Alto, 8-10: Muito Alto, 11+: Extremo
  
  // Valores simulados para demonstração - em produção usaria dados reais da API
  const uvIndex = uvi || 4;
  
  let badgeClass = 'badge-info';
  let label = 'Moderado';
  
  if (uvIndex <= 2) {
    badgeClass = 'badge-success';
    label = 'Baixo';
  } else if (uvIndex <= 5) {
    badgeClass = 'badge-info';
    label = 'Moderado';
  } else if (uvIndex <= 7) {
    badgeClass = 'badge-warning';
    label = 'Alto';
  } else if (uvIndex <= 10) {
    badgeClass = 'badge-danger';
    label = 'Muito Alto';
  } else {
    badgeClass = 'badge-danger';
    label = 'Extremo';
  }
  
  return (
    <span className={`badge ${badgeClass}`}>
      <span className="badge-icon">
        <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="uvGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD54F" />
              <stop offset="100%" stopColor="#FF9800" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="5" fill="url(#uvGradient)">
            <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
          </circle>
          <g fill="none" stroke="url(#uvGradient)" strokeWidth="1.5">
            <path d="M12 4V2">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M12 22V20">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M4 12H2">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M22 12H20">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M6.34 6.34L4.93 4.93">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M19.07 19.07L17.66 17.66">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M6.34 17.66L4.93 19.07">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M19.07 4.93L17.66 6.34">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
            </path>
          </g>
        </svg>
      </span>
      Índice UV: {label}
    </span>
  );
}

function WebApp() {
  const [city, setCity] = useState('São Paulo');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('hoje');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('weather-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [isFavorite, setIsFavorite] = useState(false);

  // Efeito para verificar se a cidade atual está nos favoritos quando o clima muda
  useEffect(() => {
    if (weather && favorites.length > 0) {
      const found = favorites.some(fav => fav.id === weather.id);
      setIsFavorite(found);
    } else {
      setIsFavorite(false);
    }
  }, [weather, favorites]);
  
  const fetchWeather = async () => {
    if (!city.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      setForecast(null); // Limpa a previsão anterior
      
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
      
      // Buscar previsão de 5 dias quando o clima estiver disponível
      if (data && data.coord) {
        fetchForecast(data.coord.lat, data.coord.lon);
      }
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
    // Verificar se temos o ícone SVG premium para este código
    if (weatherIcons[iconCode]) {
      // Retorna a representação SVG como string HTML
      return `data:image/svg+xml;utf8,${encodeURIComponent(weatherIcons[iconCode])}`;
    }
    // Fallback para ícones padrão do OpenWeather
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };
  
  // Função para buscar previsão de 5 dias
  const fetchForecast = async (lat, lon) => {
    if (!lat || !lon) return;
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`
      );
      
      if (!response.ok) {
        throw new Error('Erro ao buscar previsão. Tente novamente mais tarde.');
      }
      
      const data = await response.json();
      setForecast(data);
      
      // Verificar se tem alertas adicionais na previsão
      checkForecastForAlerts(data);
    } catch (err) {
      console.error('Erro ao buscar previsão:', err);
    }
  };
  
  // Adicionar como favorito
  const toggleFavorite = () => {
    if (!weather) return;
    
    const cityId = weather.id;
    const cityData = {
      id: cityId,
      name: weather.name,
      country: weather.sys.country,
      lat: weather.coord.lat,
      lon: weather.coord.lon,
    };
    
    let newFavorites = [...favorites];
    
    if (isFavorite) {
      // Remover dos favoritos
      newFavorites = newFavorites.filter(city => city.id !== cityId);
      addNotification('info', 'Favorito removido', `${weather.name} foi removido dos favoritos.`);
    } else {
      // Adicionar aos favoritos
      newFavorites.push(cityData);
      addNotification('info', 'Favorito adicionado', `${weather.name} foi adicionado aos favoritos.`);
    }
    
    setFavorites(newFavorites);
    setIsFavorite(!isFavorite);
    localStorage.setItem('weather-favorites', JSON.stringify(newFavorites));
  };
  
  // Verificar alertas adicionais na previsão
  const checkForecastForAlerts = (forecastData) => {
    if (!forecastData || !forecastData.list || forecastData.list.length === 0) return;
    
    // Verifica se há tempestades nas próximas 24 horas
    const next24Hours = forecastData.list.slice(0, 8); // 8 intervalos de 3 horas = 24 horas
    
    const hasStorm = next24Hours.some(item => item.weather[0].id >= 200 && item.weather[0].id < 300);
    if (hasStorm) {
      addNotification('warning', ALERT_TYPES.STORM, 'Alerta de tempestade nas próximas 24 horas! Fique atento às condições climáticas.');
    }
    
    // Verifica se há chuva forte nas próximas 24 horas
    const hasHeavyRain = next24Hours.some(item => item.weather[0].id >= 502 && item.weather[0].id < 600);
    if (hasHeavyRain) {
      addNotification('warning', ALERT_TYPES.HEAVY_RAIN, 'Alerta de chuva forte nas próximas 24 horas! Evite áreas com risco de alagamento.');
    }
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
      return 'var(--gradient-snow)';
    }
    
    // Neblina, fumaça, etc.
    if (conditionId >= 700 && conditionId <= 781) {
      return 'var(--gradient-fog)';
    }
    
    return 'var(--gradient-blue)';
  };
  
  // Aplicar a cor de fundo dinâmica ao weather card
  const weatherCardStyle = weather ? {
    background: getWeatherBackground(weather.weather[0]?.id)
  } : {};
  
  // Extrair a previsão diária (5 dias) do forecast
  const dailyForecast = useMemo(() => {
    if (!forecast || !forecast.list) return [];
    
    const days = {};
    const now = new Date();
    
    // Agrupar por dia
    forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const day = date.toDateString();
      
      // Ignorar o dia atual
      if (date.getDate() === now.getDate() && 
          date.getMonth() === now.getMonth() && 
          date.getFullYear() === now.getFullYear()) {
        return;
      }
      
      if (!days[day]) {
        days[day] = {
          dt: item.dt,
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
          icon: item.weather[0].icon,
          description: item.weather[0].description,
          items: [item]
        };
      } else {
        days[day].items.push(item);
        days[day].temp_min = Math.min(days[day].temp_min, item.main.temp_min);
        days[day].temp_max = Math.max(days[day].temp_max, item.main.temp_max);
      }
    });
    
    // Converter para array e limitar a 5 dias
    return Object.values(days).slice(0, 5);
  }, [forecast]);

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
          {/* Tabs de navegação */}
          <div className="tabs" role="tablist">
            <button 
              className={`tab ${activeTab === 'hoje' ? 'active' : ''}`} 
              onClick={() => setActiveTab('hoje')}
              role="tab"
              aria-selected={activeTab === 'hoje'}
              aria-controls="tab-hoje"
              id="tab-button-hoje"
            >
              Hoje
            </button>
            <button 
              className={`tab ${activeTab === 'previsao' ? 'active' : ''}`} 
              onClick={() => setActiveTab('previsao')}
              role="tab"
              aria-selected={activeTab === 'previsao'}
              aria-controls="tab-previsao"
              id="tab-button-previsao"
              disabled={!forecast}
            >
              Próximos Dias
            </button>
          </div>
          
          {/* Conteúdo da tab Hoje */}
          <div 
            id="tab-hoje" 
            role="tabpanel" 
            aria-labelledby="tab-button-hoje"
            className={`tab-content ${activeTab === 'hoje' ? 'active' : ''}`}
          >
            <div className="weather-card" style={weatherCardStyle}>
              <div className="city-header">
                <h2 className="city-name">{weather.name}, {weather.sys.country}</h2>
                <button 
                  className="icon-button" 
                  onClick={toggleFavorite}
                  aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                  title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                >
                  {isFavorite ? "❤️" : "🤍"}
                </button>
              </div>
              
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
              
              {/* Badges para qualidade do ar e UV */}
              <div className="badges-container">
                <AirQualityBadge aqi={2} /> {/* Valor simulado para demonstração */}
                <UVIndexBadge uvi={4} />    {/* Valor simulado para demonstração */}
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
                
                <div className="weather-detail" role="listitem">
                  <span className="weather-detail-label" id="pressure-label">Pressão</span>
                  <span className="weather-detail-value" aria-labelledby="pressure-label">
                    {weather.main.pressure} hPa
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Conteúdo da tab Previsão */}
          <div 
            id="tab-previsao" 
            role="tabpanel" 
            aria-labelledby="tab-button-previsao"
            className={`tab-content ${activeTab === 'previsao' ? 'active' : ''}`}
          >
            <div className="glass-card">
              <div className="forecast-container">
                <h3 className="forecast-title">Previsão para 5 dias</h3>
                
                <div className="daily-forecast">
                  {dailyForecast.length > 0 ? (
                    dailyForecast.map((day, index) => (
                      <ForecastDay
                        key={index}
                        date={day.dt}
                        icon={day.icon}
                        tempMax={day.temp_max}
                        tempMin={day.temp_min}
                        condition={day.description}
                      />
                    ))
                  ) : (
                    <p>Carregando previsão...</p>
                  )}
                </div>
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