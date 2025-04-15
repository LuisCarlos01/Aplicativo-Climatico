// Define background images for different weather conditions

// We'll use SVG backgrounds for better performance
const clearDaySVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4A90E2" />
      <stop offset="100%" stop-color="#87CEFA" />
    </linearGradient>
    <radialGradient id="sunGlow" cx="50%" cy="30%" r="30%" fx="50%" fy="30%">
      <stop offset="0%" stop-color="#FFEB3B" stop-opacity="0.7" />
      <stop offset="100%" stop-color="#FFEB3B" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#skyGradient)" />
  <circle cx="50%" cy="30%" r="60" fill="#FFEB3B" />
  <circle cx="50%" cy="30%" r="120" fill="url(#sunGlow)" />
</svg>
`;

const clearNightSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="nightSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1A237E" />
      <stop offset="100%" stop-color="#303F9F" />
    </linearGradient>
    <radialGradient id="moonGlow" cx="60%" cy="30%" r="30%" fx="60%" fy="30%">
      <stop offset="0%" stop-color="#E0E0E0" stop-opacity="0.5" />
      <stop offset="100%" stop-color="#E0E0E0" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#nightSkyGradient)" />
  <circle cx="60%" cy="30%" r="45" fill="#E0E0E0" />
  <circle cx="60%" cy="30%" r="100" fill="url(#moonGlow)" />
  <circle cx="30%" cy="20%" r="2" fill="#FFFFFF" />
  <circle cx="40%" cy="40%" r="1.5" fill="#FFFFFF" />
  <circle cx="70%" cy="60%" r="2" fill="#FFFFFF" />
  <circle cx="80%" cy="30%" r="1.5" fill="#FFFFFF" />
  <circle cx="20%" cy="50%" r="1" fill="#FFFFFF" />
  <circle cx="85%" cy="50%" r="1" fill="#FFFFFF" />
</svg>
`;

const cloudySVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="cloudySkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#616E7C" />
      <stop offset="100%" stop-color="#9EA7B1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#cloudySkyGradient)" />
  <ellipse cx="400" cy="200" rx="180" ry="100" fill="#E0E0E0" />
  <ellipse cx="320" cy="180" rx="120" ry="60" fill="#F5F5F5" />
  <ellipse cx="500" cy="180" rx="150" ry="70" fill="#F5F5F5" />
  <ellipse cx="200" cy="250" rx="120" ry="60" fill="#E0E0E0" />
  <ellipse cx="600" cy="280" rx="150" ry="70" fill="#E0E0E0" />
</svg>
`;

const rainSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="rainSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4B6584" />
      <stop offset="100%" stop-color="#778CA3" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#rainSkyGradient)" />
  <ellipse cx="400" cy="150" rx="200" ry="100" fill="#546E7A" />
  <ellipse cx="350" cy="140" rx="150" ry="70" fill="#607D8B" />
  <ellipse cx="480" cy="140" rx="180" ry="80" fill="#607D8B" />
  <line x1="300" y1="250" x2="280" y2="350" stroke="#B3E5FC" stroke-width="2" />
  <line x1="350" y1="250" x2="330" y2="400" stroke="#B3E5FC" stroke-width="2" />
  <line x1="400" y1="250" x2="380" y2="380" stroke="#B3E5FC" stroke-width="2" />
  <line x1="450" y1="250" x2="430" y2="350" stroke="#B3E5FC" stroke-width="2" />
  <line x1="500" y1="250" x2="480" y2="400" stroke="#B3E5FC" stroke-width="2" />
</svg>
`;

const thunderstormSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="stormSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#263238" />
      <stop offset="100%" stop-color="#37474F" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#stormSkyGradient)" />
  <ellipse cx="400" cy="150" rx="200" ry="100" fill="#455A64" />
  <ellipse cx="350" cy="140" rx="150" ry="70" fill="#546E7A" />
  <ellipse cx="480" cy="140" rx="180" ry="80" fill="#546E7A" />
  <polygon points="400,250 350,350 410,350 370,450" fill="#FFEB3B" />
  <line x1="300" y1="250" x2="280" y2="350" stroke="#B3E5FC" stroke-width="2" />
  <line x1="450" y1="250" x2="430" y2="350" stroke="#B3E5FC" stroke-width="2" />
  <line x1="500" y1="250" x2="480" y2="400" stroke="#B3E5FC" stroke-width="2" />
</svg>
`;

const snowSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="snowSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#B0BEC5" />
      <stop offset="100%" stop-color="#CFD8DC" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#snowSkyGradient)" />
  <ellipse cx="400" cy="150" rx="200" ry="100" fill="#90A4AE" />
  <ellipse cx="350" cy="140" rx="150" ry="70" fill="#B0BEC5" />
  <ellipse cx="480" cy="140" rx="180" ry="80" fill="#B0BEC5" />
  <circle cx="300" cy="280" r="5" fill="white" />
  <circle cx="350" cy="320" r="5" fill="white" />
  <circle cx="400" cy="280" r="5" fill="white" />
  <circle cx="450" cy="320" r="5" fill="white" />
  <circle cx="500" cy="280" r="5" fill="white" />
  <circle cx="325" cy="380" r="5" fill="white" />
  <circle cx="375" cy="350" r="5" fill="white" />
  <circle cx="425" cy="380" r="5" fill="white" />
  <circle cx="475" cy="350" r="5" fill="white" />
</svg>
`;

const weatherBackgrounds = {
  // Weather condition IDs mapped to background SVGs
  clearDay: clearDaySVG,
  clearNight: clearNightSVG,
  cloudy: cloudySVG,
  rain: rainSVG,
  thunderstorm: thunderstormSVG,
  snow: snowSVG,
  
  // Helper function to get background based on weather condition
  getBackgroundForCondition: (conditionId: number, isDay: boolean = true): string => {
    // Clear sky
    if (conditionId === 800) {
      return isDay ? clearDaySVG : clearNightSVG;
    }
    
    // Few clouds, scattered clouds
    if (conditionId === 801 || conditionId === 802) {
      return cloudySVG;
    }
    
    // Broken clouds, overcast clouds
    if (conditionId === 803 || conditionId === 804) {
      return cloudySVG;
    }
    
    // Rain conditions
    if (conditionId >= 300 && conditionId < 600) {
      return rainSVG;
    }
    
    // Thunderstorm
    if (conditionId >= 200 && conditionId < 300) {
      return thunderstormSVG;
    }
    
    // Snow
    if (conditionId >= 600 && conditionId < 700) {
      return snowSVG;
    }
    
    // Default to clear
    return isDay ? clearDaySVG : clearNightSVG;
  }
};

export default weatherBackgrounds;
