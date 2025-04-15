// Ícones meteorológicos premium animados
const weatherIcons = {
  // Ícones para dia claro
  '01d': `
    <svg class="premium-icon sun-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle class="sun" cx="50" cy="50" r="20" fill="#FFD700" stroke="#FFA500" stroke-width="2">
        <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
      </circle>
      <g class="sun-rays">
        <line x1="50" y1="15" x2="50" y2="25" stroke="#FFD700" stroke-width="3" stroke-linecap="round">
          <animate attributeName="y1" values="15;12;15" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="50" y1="75" x2="50" y2="85" stroke="#FFD700" stroke-width="3" stroke-linecap="round">
          <animate attributeName="y2" values="85;88;85" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="15" y1="50" x2="25" y2="50" stroke="#FFD700" stroke-width="3" stroke-linecap="round">
          <animate attributeName="x1" values="15;12;15" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="75" y1="50" x2="85" y2="50" stroke="#FFD700" stroke-width="3" stroke-linecap="round">
          <animate attributeName="x2" values="85;88;85" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="25" y1="25" x2="30" y2="30" stroke="#FFD700" stroke-width="3" stroke-linecap="round">
          <animate attributeName="x1" values="25;22;25" dur="3s" repeatCount="indefinite" />
          <animate attributeName="y1" values="25;22;25" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="70" y1="70" x2="75" y2="75" stroke="#FFD700" stroke-width="3" stroke-linecap="round">
          <animate attributeName="x2" values="75;78;75" dur="3s" repeatCount="indefinite" />
          <animate attributeName="y2" values="75;78;75" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="25" y1="75" x2="30" y2="70" stroke="#FFD700" stroke-width="3" stroke-linecap="round">
          <animate attributeName="x1" values="25;22;25" dur="3s" repeatCount="indefinite" />
          <animate attributeName="y1" values="75;78;75" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="70" y1="30" x2="75" y2="25" stroke="#FFD700" stroke-width="3" stroke-linecap="round">
          <animate attributeName="x2" values="75;78;75" dur="3s" repeatCount="indefinite" />
          <animate attributeName="y2" values="25;22;25" dur="3s" repeatCount="indefinite" />
        </line>
      </g>
    </svg>
  `,
  
  // Ícones para noite clara
  '01n': `
    <svg class="premium-icon moon-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="moonGradient" cx="50%" cy="50%" r="65%" fx="80%" fy="40%">
          <stop offset="0%" stop-color="#FEFCD7" />
          <stop offset="100%" stop-color="#F1DA8C" />
        </radialGradient>
      </defs>
      <path class="moon" d="M50 15 C15 15 15 85 50 85 C85 85 85 55 65 40 C65 40 65 15 50 15" fill="url(#moonGradient)" stroke="#C8A951" stroke-width="1">
        <animate attributeName="d" values="M50 15 C15 15 15 85 50 85 C85 85 85 55 65 40 C65 40 65 15 50 15;M50 20 C20 20 20 80 50 80 C80 80 80 50 62 35 C62 35 65 20 50 20;M50 15 C15 15 15 85 50 85 C85 85 85 55 65 40 C65 40 65 15 50 15" dur="8s" repeatCount="indefinite" />
      </path>
      <circle cx="40" cy="35" r="4" fill="#C8A951" fill-opacity="0.4" />
      <circle cx="65" cy="55" r="3" fill="#C8A951" fill-opacity="0.3" />
      <circle cx="55" cy="70" r="2" fill="#C8A951" fill-opacity="0.4" />
    </svg>
  `,
  
  // Ícones para parcialmente nublado durante o dia
  '02d': `
    <svg class="premium-icon partly-cloudy-day" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="100%" stop-color="#E6E6E6" />
        </linearGradient>
      </defs>
      <circle class="sun" cx="35" cy="35" r="12" fill="#FFD700" stroke="#FFA500" stroke-width="1.5">
        <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
      </circle>
      <g class="sun-rays">
        <line x1="35" y1="18" x2="35" y2="22" stroke="#FFD700" stroke-width="2" stroke-linecap="round" />
        <line x1="35" y1="48" x2="35" y2="52" stroke="#FFD700" stroke-width="2" stroke-linecap="round" />
        <line x1="18" y1="35" x2="22" y2="35" stroke="#FFD700" stroke-width="2" stroke-linecap="round" />
        <line x1="48" y1="35" x2="52" y2="35" stroke="#FFD700" stroke-width="2" stroke-linecap="round" />
        <line x1="23" y1="23" x2="26" y2="26" stroke="#FFD700" stroke-width="2" stroke-linecap="round" />
        <line x1="44" y1="44" x2="47" y2="47" stroke="#FFD700" stroke-width="2" stroke-linecap="round" />
        <line x1="23" y1="47" x2="26" y2="44" stroke="#FFD700" stroke-width="2" stroke-linecap="round" />
        <line x1="44" y1="26" x2="47" y2="23" stroke="#FFD700" stroke-width="2" stroke-linecap="round" />
      </g>
      <g class="cloud" transform="translate(5, 5)">
        <path d="M25 55 C15 55 5 60 5 70 C5 78 15 85 30 85 C45 85 65 85 75 85 C90 85 95 75 95 65 C95 55 85 50 75 50 C75 40 65 30 55 30 C40 30 35 45 35 50 C30 45 20 50 25 55" fill="url(#cloudGradient)" stroke="#E6E6E6" stroke-width="1">
          <animate attributeName="d" values="M25 55 C15 55 5 60 5 70 C5 78 15 85 30 85 C45 85 65 85 75 85 C90 85 95 75 95 65 C95 55 85 50 75 50 C75 40 65 30 55 30 C40 30 35 45 35 50 C30 45 20 50 25 55;M25 57 C15 57 5 62 5 72 C5 80 15 87 30 87 C45 87 65 87 75 87 C90 87 95 77 95 67 C95 57 85 52 75 52 C75 42 65 32 55 32 C40 32 35 47 35 52 C30 47 20 52 25 57;M25 55 C15 55 5 60 5 70 C5 78 15 85 30 85 C45 85 65 85 75 85 C90 85 95 75 95 65 C95 55 85 50 75 50 C75 40 65 30 55 30 C40 30 35 45 35 50 C30 45 20 50 25 55" dur="8s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  `,
  
  // Ícones para parcialmente nublado durante a noite
  '02n': `
    <svg class="premium-icon partly-cloudy-night" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cloudGradientNight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E6E6E6" />
          <stop offset="100%" stop-color="#CCCCCC" />
        </linearGradient>
        <radialGradient id="moonGradientSmall" cx="50%" cy="50%" r="65%" fx="80%" fy="40%">
          <stop offset="0%" stop-color="#FEFCD7" />
          <stop offset="100%" stop-color="#F1DA8C" />
        </radialGradient>
      </defs>
      <path class="moon" d="M35 20 C22 20 22 50 35 50 C48 50 48 37 40 30 C40 30 40 20 35 20" fill="url(#moonGradientSmall)" stroke="#C8A951" stroke-width="0.75">
        <animate attributeName="d" values="M35 20 C22 20 22 50 35 50 C48 50 48 37 40 30 C40 30 40 20 35 20;M35 23 C25 23 25 47 35 47 C45 47 45 34 38 27 C38 27 40 23 35 23;M35 20 C22 20 22 50 35 50 C48 50 48 37 40 30 C40 30 40 20 35 20" dur="8s" repeatCount="indefinite" />
      </path>
      <g class="cloud" transform="translate(5, 5)">
        <path d="M25 55 C15 55 5 60 5 70 C5 78 15 85 30 85 C45 85 65 85 75 85 C90 85 95 75 95 65 C95 55 85 50 75 50 C75 40 65 30 55 30 C40 30 35 45 35 50 C30 45 20 50 25 55" fill="url(#cloudGradientNight)" stroke="#CCCCCC" stroke-width="1">
          <animate attributeName="d" values="M25 55 C15 55 5 60 5 70 C5 78 15 85 30 85 C45 85 65 85 75 85 C90 85 95 75 95 65 C95 55 85 50 75 50 C75 40 65 30 55 30 C40 30 35 45 35 50 C30 45 20 50 25 55;M25 57 C15 57 5 62 5 72 C5 80 15 87 30 87 C45 87 65 87 75 87 C90 87 95 77 95 67 C95 57 85 52 75 52 C75 42 65 32 55 32 C40 32 35 47 35 52 C30 47 20 52 25 57;M25 55 C15 55 5 60 5 70 C5 78 15 85 30 85 C45 85 65 85 75 85 C90 85 95 75 95 65 C95 55 85 50 75 50 C75 40 65 30 55 30 C40 30 35 45 35 50 C30 45 20 50 25 55" dur="8s" repeatCount="indefinite" />
        </path>
      </g>
      <circle cx="32" cy="27" r="1.5" fill="#C8A951" fill-opacity="0.4" />
      <circle cx="40" cy="37" r="1" fill="#C8A951" fill-opacity="0.3" />
    </svg>
  `,
  
  // Ícones para nublado
  '03d': `
    <svg class="premium-icon cloudy" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cloudGradientBig" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="100%" stop-color="#E6E6E6" />
        </linearGradient>
      </defs>
      <g class="cloud" transform="translate(5, 20)">
        <path d="M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35" fill="url(#cloudGradientBig)" stroke="#E6E6E6" stroke-width="1">
          <animate attributeName="d" values="M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35;M25 37 C10 37 5 47 5 57 C5 67 15 77 30 77 C45 77 65 77 75 77 C90 77 95 67 95 57 C95 47 85 37 75 37 C75 22 60 17 50 17 C35 17 30 27 35 37 C25 27 10 27 25 37;M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35" dur="10s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  `,
  '03n': `
    <svg class="premium-icon cloudy-night" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cloudGradientNightBig" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E6E6E6" />
          <stop offset="100%" stop-color="#CCCCCC" />
        </linearGradient>
      </defs>
      <g class="cloud" transform="translate(5, 20)">
        <path d="M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35" fill="url(#cloudGradientNightBig)" stroke="#CCCCCC" stroke-width="1">
          <animate attributeName="d" values="M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35;M25 37 C10 37 5 47 5 57 C5 67 15 77 30 77 C45 77 65 77 75 77 C90 77 95 67 95 57 C95 47 85 37 75 37 C75 22 60 17 50 17 C35 17 30 27 35 37 C25 27 10 27 25 37;M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35" dur="10s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  `,
  
  // Ícones para nuvens quebradas
  '04d': `
    <svg class="premium-icon broken-clouds" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cloudGradientBack" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="100%" stop-color="#E6E6E6" />
        </linearGradient>
        <linearGradient id="cloudGradientFront" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F5F5F5" />
          <stop offset="100%" stop-color="#CCCCCC" />
        </linearGradient>
      </defs>
      <g class="cloud back" transform="translate(15, 10) scale(0.8)">
        <path d="M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35" fill="url(#cloudGradientBack)" stroke="#E6E6E6" stroke-width="1">
          <animate attributeName="d" values="M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35;M25 37 C10 37 5 47 5 57 C5 67 15 77 30 77 C45 77 65 77 75 77 C90 77 95 67 95 57 C95 47 85 37 75 37 C75 22 60 17 50 17 C35 17 30 27 35 37 C25 27 10 27 25 37;M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35" dur="12s" repeatCount="indefinite" />
        </path>
      </g>
      <g class="cloud front" transform="translate(0, 30) scale(0.9)">
        <path d="M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35" fill="url(#cloudGradientFront)" stroke="#CCCCCC" stroke-width="1">
          <animate attributeName="d" values="M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35;M23 33 C8 33 3 43 3 53 C3 63 13 73 28 73 C43 73 63 73 73 73 C88 73 93 63 93 53 C93 43 83 33 73 33 C73 18 58 13 48 13 C33 13 28 23 33 33 C23 23 8 23 23 33;M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35" dur="10s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  `,
  '04n': `
    <svg class="premium-icon broken-clouds-night" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cloudGradientBackNight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E6E6E6" />
          <stop offset="100%" stop-color="#CCCCCC" />
        </linearGradient>
        <linearGradient id="cloudGradientFrontNight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#DDDDDD" />
          <stop offset="100%" stop-color="#AAAAAA" />
        </linearGradient>
      </defs>
      <g class="cloud back" transform="translate(15, 10) scale(0.8)">
        <path d="M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35" fill="url(#cloudGradientBackNight)" stroke="#CCCCCC" stroke-width="1">
          <animate attributeName="d" values="M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35;M25 37 C10 37 5 47 5 57 C5 67 15 77 30 77 C45 77 65 77 75 77 C90 77 95 67 95 57 C95 47 85 37 75 37 C75 22 60 17 50 17 C35 17 30 27 35 37 C25 27 10 27 25 37;M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35" dur="12s" repeatCount="indefinite" />
        </path>
      </g>
      <g class="cloud front" transform="translate(0, 30) scale(0.9)">
        <path d="M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35" fill="url(#cloudGradientFrontNight)" stroke="#AAAAAA" stroke-width="1">
          <animate attributeName="d" values="M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35;M23 33 C8 33 3 43 3 53 C3 63 13 73 28 73 C43 73 63 73 73 73 C88 73 93 63 93 53 C93 43 83 33 73 33 C73 18 58 13 48 13 C33 13 28 23 33 33 C23 23 8 23 23 33;M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35" dur="10s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  `,
  
  // Ícones para chuva
  '09d': `
    <svg class="premium-icon rain" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cloudGradientRain" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E6E6E6" />
          <stop offset="100%" stop-color="#CCCCCC" />
        </linearGradient>
        <linearGradient id="rainDropGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4CC4FF" />
          <stop offset="100%" stop-color="#3F9BDA" />
        </linearGradient>
      </defs>
      <g class="cloud" transform="translate(5, 18)">
        <path d="M25 35 C10 35 5 45 5 50 C5 58 15 65 30 65 C45 65 65 65 75 65 C90 65 95 55 95 48 C95 40 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35" fill="url(#cloudGradientRain)" stroke="#B8B8B8" stroke-width="1">
          <animate attributeName="d" values="M25 35 C10 35 5 45 5 50 C5 58 15 65 30 65 C45 65 65 65 75 65 C90 65 95 55 95 48 C95 40 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35;M25 37 C10 37 5 47 5 52 C5 60 15 67 30 67 C45 67 65 67 75 67 C90 67 95 57 95 50 C95 42 85 37 75 37 C75 22 60 17 50 17 C35 17 30 27 35 37 C25 27 10 27 25 37;M25 35 C10 35 5 45 5 50 C5 58 15 65 30 65 C45 65 65 65 75 65 C90 65 95 55 95 48 C95 40 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35" dur="10s" repeatCount="indefinite" />
        </path>
      </g>
      
      <g class="rain-drops">
        <!-- Drop 1 -->
        <path d="M30 70 L30 75 C30 77 28 77 28 75 L28 70" fill="url(#rainDropGradient)" stroke="#3F9BDA" stroke-width="0.5">
          <animate attributeName="transform" values="translate(0,0); translate(0,20); translate(0,0)" dur="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
        </path>
        
        <!-- Drop 2 -->
        <path d="M50 70 L50 75 C50 77 48 77 48 75 L48 70" fill="url(#rainDropGradient)" stroke="#3F9BDA" stroke-width="0.5">
          <animate attributeName="transform" values="translate(0,0); translate(0,20); translate(0,0)" dur="1.3s" begin="0.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0;1" dur="1.3s" begin="0.2s" repeatCount="indefinite" />
        </path>
        
        <!-- Drop 3 -->
        <path d="M70 70 L70 75 C70 77 68 77 68 75 L68 70" fill="url(#rainDropGradient)" stroke="#3F9BDA" stroke-width="0.5">
          <animate attributeName="transform" values="translate(0,0); translate(0,20); translate(0,0)" dur="0.9s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0;1" dur="0.9s" begin="0.5s" repeatCount="indefinite" />
        </path>
        
        <!-- Drop 4 -->
        <path d="M20 72 L20 77 C20 79 18 79 18 77 L18 72" fill="url(#rainDropGradient)" stroke="#3F9BDA" stroke-width="0.5">
          <animate attributeName="transform" values="translate(0,0); translate(0,20); translate(0,0)" dur="1.1s" begin="0.7s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0;1" dur="1.1s" begin="0.7s" repeatCount="indefinite" />
        </path>
        
        <!-- Drop 5 -->
        <path d="M80 72 L80 77 C80 79 78 79 78 77 L78 72" fill="url(#rainDropGradient)" stroke="#3F9BDA" stroke-width="0.5">
          <animate attributeName="transform" values="translate(0,0); translate(0,20); translate(0,0)" dur="1.2s" begin="0.3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0;1" dur="1.2s" begin="0.3s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  `,
  '09n': `
    <svg class="premium-icon rain-night" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cloudGradientRainNight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#CCCCCC" />
          <stop offset="100%" stop-color="#999999" />
        </linearGradient>
        <linearGradient id="rainDropGradientNight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4CC4FF" />
          <stop offset="100%" stop-color="#3F9BDA" />
        </linearGradient>
      </defs>
      <g class="cloud" transform="translate(5, 18)">
        <path d="M25 35 C10 35 5 45 5 50 C5 58 15 65 30 65 C45 65 65 65 75 65 C90 65 95 55 95 48 C95 40 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35" fill="url(#cloudGradientRainNight)" stroke="#999999" stroke-width="1">
          <animate attributeName="d" values="M25 35 C10 35 5 45 5 50 C5 58 15 65 30 65 C45 65 65 65 75 65 C90 65 95 55 95 48 C95 40 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35;M25 37 C10 37 5 47 5 52 C5 60 15 67 30 67 C45 67 65 67 75 67 C90 67 95 57 95 50 C95 42 85 37 75 37 C75 22 60 17 50 17 C35 17 30 27 35 37 C25 27 10 27 25 37;M25 35 C10 35 5 45 5 50 C5 58 15 65 30 65 C45 65 65 65 75 65 C90 65 95 55 95 48 C95 40 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35" dur="10s" repeatCount="indefinite" />
        </path>
      </g>
      
      <g class="rain-drops">
        <!-- Drop 1 -->
        <path d="M30 70 L30 75 C30 77 28 77 28 75 L28 70" fill="url(#rainDropGradientNight)" stroke="#3F9BDA" stroke-width="0.5">
          <animate attributeName="transform" values="translate(0,0); translate(0,20); translate(0,0)" dur="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
        </path>
        
        <!-- Drop 2 -->
        <path d="M50 70 L50 75 C50 77 48 77 48 75 L48 70" fill="url(#rainDropGradientNight)" stroke="#3F9BDA" stroke-width="0.5">
          <animate attributeName="transform" values="translate(0,0); translate(0,20); translate(0,0)" dur="1.3s" begin="0.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0;1" dur="1.3s" begin="0.2s" repeatCount="indefinite" />
        </path>
        
        <!-- Drop 3 -->
        <path d="M70 70 L70 75 C70 77 68 77 68 75 L68 70" fill="url(#rainDropGradientNight)" stroke="#3F9BDA" stroke-width="0.5">
          <animate attributeName="transform" values="translate(0,0); translate(0,20); translate(0,0)" dur="0.9s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0;1" dur="0.9s" begin="0.5s" repeatCount="indefinite" />
        </path>
        
        <!-- Drop 4 -->
        <path d="M20 72 L20 77 C20 79 18 79 18 77 L18 72" fill="url(#rainDropGradientNight)" stroke="#3F9BDA" stroke-width="0.5">
          <animate attributeName="transform" values="translate(0,0); translate(0,20); translate(0,0)" dur="1.1s" begin="0.7s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0;1" dur="1.1s" begin="0.7s" repeatCount="indefinite" />
        </path>
        
        <!-- Drop 5 -->
        <path d="M80 72 L80 77 C80 79 78 79 78 77 L78 72" fill="url(#rainDropGradientNight)" stroke="#3F9BDA" stroke-width="0.5">
          <animate attributeName="transform" values="translate(0,0); translate(0,20); translate(0,0)" dur="1.2s" begin="0.3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0;1" dur="1.2s" begin="0.3s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  `,
  
  // Ícones para chuva leve
  '10d': `
    <svg class="premium-icon light-rain" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cloudGradientLightRain" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="100%" stop-color="#E6E6E6" />
        </linearGradient>
        <linearGradient id="rainDropGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4CC4FF" />
          <stop offset="100%" stop-color="#3F9BDA" />
        </linearGradient>
      </defs>
      <circle class="sun" cx="25" cy="30" r="12" fill="#FFD700" stroke="#FFA500" stroke-width="1.5">
        <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
      </circle>
      <g class="sun-rays">
        <line x1="25" y1="15" x2="25" y2="17" stroke="#FFD700" stroke-width="2" stroke-linecap="round" />
        <line x1="25" y1="43" x2="25" y2="45" stroke="#FFD700" stroke-width="2" stroke-linecap="round" />
        <line x1="10" y1="30" x2="12" y2="30" stroke="#FFD700" stroke-width="2" stroke-linecap="round" />
        <line x1="38" y1="30" x2="40" y2="30" stroke="#FFD700" stroke-width="2" stroke-linecap="round" />
        <line x1="15" y1="20" x2="17" y2="22" stroke="#FFD700" stroke-width="2" stroke-linecap="round" />
        <line x1="33" y1="38" x2="35" y2="40" stroke="#FFD700" stroke-width="2" stroke-linecap="round" />
        <line x1="15" y1="40" x2="17" y2="38" stroke="#FFD700" stroke-width="2" stroke-linecap="round" />
        <line x1="33" y1="22" x2="35" y2="20" stroke="#FFD700" stroke-width="2" stroke-linecap="round" />
      </g>
      <g class="cloud" transform="translate(5, 20)">
        <path d="M25 35 C15 35 5 40 5 50 C5 58 15 65 30 65 C45 65 65 65 75 65 C90 65 95 55 95 48 C95 40 85 35 75 35 C75 20 60 15 50 15 C35 15 35 25 35 35 C30 30 20 35 25 35" fill="url(#cloudGradientLightRain)" stroke="#E6E6E6" stroke-width="1" opacity="0.9">
          <animate attributeName="d" values="M25 35 C15 35 5 40 5 50 C5 58 15 65 30 65 C45 65 65 65 75 65 C90 65 95 55 95 48 C95 40 85 35 75 35 C75 20 60 15 50 15 C35 15 35 25 35 35 C30 30 20 35 25 35;M25 37 C15 37 5 42 5 52 C5 60 15 67 30 67 C45 67 65 67 75 67 C90 67 95 57 95 50 C95 42 85 37 75 37 C75 22 60 17 50 17 C35 17 35 27 35 37 C30 32 20 37 25 37;M25 35 C15 35 5 40 5 50 C5 58 15 65 30 65 C45 65 65 65 75 65 C90 65 95 55 95 48 C95 40 85 35 75 35 C75 20 60 15 50 15 C35 15 35 25 35 35 C30 30 20 35 25 35" dur="10s" repeatCount="indefinite" />
        </path>
      </g>
      
      <g class="rain-drops">
        <!-- Drop 1 -->
        <path d="M30 70 L30 75 C30 77 28 77 28 75 L28 70" fill="url(#rainDropGradientLight)" stroke="#3F9BDA" stroke-width="0.5">
          <animate attributeName="transform" values="translate(0,0); translate(0,20); translate(0,0)" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite" />
        </path>
        
        <!-- Drop 2 -->
        <path d="M60 70 L60 75 C60 77 58 77 58 75 L58 70" fill="url(#rainDropGradientLight)" stroke="#3F9BDA" stroke-width="0.5">
          <animate attributeName="transform" values="translate(0,0); translate(0,20); translate(0,0)" dur="1.8s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0;1" dur="1.8s" begin="0.5s" repeatCount="indefinite" />
        </path>
        
        <!-- Drop 3 -->
        <path d="M75 73 L75 78 C75 80 73 80 73 78 L73 73" fill="url(#rainDropGradientLight)" stroke="#3F9BDA" stroke-width="0.5">
          <animate attributeName="transform" values="translate(0,0); translate(0,20); translate(0,0)" dur="1.6s" begin="0.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0;1" dur="1.6s" begin="0.8s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  `,
  '10n': `
    <svg class="premium-icon light-rain-night" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cloudGradientLightRainNight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E6E6E6" />
          <stop offset="100%" stop-color="#CCCCCC" />
        </linearGradient>
        <linearGradient id="rainDropGradientLightNight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4CC4FF" />
          <stop offset="100%" stop-color="#3F9BDA" />
        </linearGradient>
        <radialGradient id="moonGradientRain" cx="50%" cy="50%" r="65%" fx="80%" fy="40%">
          <stop offset="0%" stop-color="#FEFCD7" />
          <stop offset="100%" stop-color="#F1DA8C" />
        </radialGradient>
      </defs>
      <path class="moon" d="M25 15 C15 15 15 40 25 40 C35 40 35 30 28 25 C28 25 28 15 25 15" fill="url(#moonGradientRain)" stroke="#C8A951" stroke-width="0.75">
        <animate attributeName="d" values="M25 15 C15 15 15 40 25 40 C35 40 35 30 28 25 C28 25 28 15 25 15;M25 17 C17 17 17 38 25 38 C33 38 33 28 27 23 C27 23 28 17 25 17;M25 15 C15 15 15 40 25 40 C35 40 35 30 28 25 C28 25 28 15 25 15" dur="8s" repeatCount="indefinite" />
      </path>
      <g class="cloud" transform="translate(5, 20)">
        <path d="M25 35 C15 35 5 40 5 50 C5 58 15 65 30 65 C45 65 65 65 75 65 C90 65 95 55 95 48 C95 40 85 35 75 35 C75 20 60 15 50 15 C35 15 35 25 35 35 C30 30 20 35 25 35" fill="url(#cloudGradientLightRainNight)" stroke="#CCCCCC" stroke-width="1" opacity="0.9">
          <animate attributeName="d" values="M25 35 C15 35 5 40 5 50 C5 58 15 65 30 65 C45 65 65 65 75 65 C90 65 95 55 95 48 C95 40 85 35 75 35 C75 20 60 15 50 15 C35 15 35 25 35 35 C30 30 20 35 25 35;M25 37 C15 37 5 42 5 52 C5 60 15 67 30 67 C45 67 65 67 75 67 C90 67 95 57 95 50 C95 42 85 37 75 37 C75 22 60 17 50 17 C35 17 35 27 35 37 C30 32 20 37 25 37;M25 35 C15 35 5 40 5 50 C5 58 15 65 30 65 C45 65 65 65 75 65 C90 65 95 55 95 48 C95 40 85 35 75 35 C75 20 60 15 50 15 C35 15 35 25 35 35 C30 30 20 35 25 35" dur="10s" repeatCount="indefinite" />
        </path>
      </g>
      
      <g class="rain-drops">
        <!-- Drop 1 -->
        <path d="M30 70 L30 75 C30 77 28 77 28 75 L28 70" fill="url(#rainDropGradientLightNight)" stroke="#3F9BDA" stroke-width="0.5">
          <animate attributeName="transform" values="translate(0,0); translate(0,20); translate(0,0)" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite" />
        </path>
        
        <!-- Drop 2 -->
        <path d="M60 70 L60 75 C60 77 58 77 58 75 L58 70" fill="url(#rainDropGradientLightNight)" stroke="#3F9BDA" stroke-width="0.5">
          <animate attributeName="transform" values="translate(0,0); translate(0,20); translate(0,0)" dur="1.8s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0;1" dur="1.8s" begin="0.5s" repeatCount="indefinite" />
        </path>
        
        <!-- Drop 3 -->
        <path d="M75 73 L75 78 C75 80 73 80 73 78 L73 73" fill="url(#rainDropGradientLightNight)" stroke="#3F9BDA" stroke-width="0.5">
          <animate attributeName="transform" values="translate(0,0); translate(0,20); translate(0,0)" dur="1.6s" begin="0.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0;1" dur="1.6s" begin="0.8s" repeatCount="indefinite" />
        </path>
      </g>
      <circle cx="20" cy="20" r="1.5" fill="#C8A951" fill-opacity="0.4" />
      <circle cx="28" cy="30" r="1" fill="#C8A951" fill-opacity="0.3" />
    </svg>
  `,
  
  // Ícones para tempestade
  '11d': `
    <svg class="premium-icon thunderstorm" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cloudGradientThunder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4F4F4F" />
          <stop offset="100%" stop-color="#373737" />
        </linearGradient>
        <linearGradient id="lightningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFF176" />
          <stop offset="100%" stop-color="#FFEB3B" />
        </linearGradient>
      </defs>
      <g class="cloud" transform="translate(5, 15)">
        <path d="M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35" fill="url(#cloudGradientThunder)" stroke="#333333" stroke-width="1">
          <animate attributeName="d" values="M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35;M25 37 C10 37 5 47 5 57 C5 67 15 77 30 77 C45 77 65 77 75 77 C90 77 95 67 95 57 C95 47 85 37 75 37 C75 22 60 17 50 17 C35 17 30 27 35 37 C25 27 10 27 25 37;M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35" dur="15s" repeatCount="indefinite" />
        </path>
      </g>
      
      <!-- Lightning Bolts -->
      <g class="lightning">
        <path d="M55 65 L50 75 L55 75 L45 90 L50 80 L45 80 L50 65" fill="url(#lightningGradient)" stroke="#FFA000" stroke-width="0.75">
          <animate attributeName="opacity" values="0;1;0;1;0" dur="2s" begin="0.2s" repeatCount="indefinite" />
        </path>
        <path d="M35 70 L30 80 L35 80 L25 95" fill="url(#lightningGradient)" stroke="#FFA000" stroke-width="0.75" opacity="0">
          <animate attributeName="opacity" values="0;1;0" dur="3s" begin="1s" repeatCount="indefinite" />
        </path>
      </g>
      
      <!-- Rain Drops -->
      <g class="rain-drops">
        <path d="M30 70 L30 75 C30 77 28 77 28 75 L28 70" fill="#4CC4FF" stroke="#3F9BDA" stroke-width="0.5">
          <animate attributeName="transform" values="translate(0,0); translate(0,15); translate(0,0)" dur="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
        </path>
        
        <path d="M70 70 L70 75 C70 77 68 77 68 75 L68 70" fill="#4CC4FF" stroke="#3F9BDA" stroke-width="0.5">
          <animate attributeName="transform" values="translate(0,0); translate(0,15); translate(0,0)" dur="0.9s" begin="0.3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0;1" dur="0.9s" begin="0.3s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  `,
  '11n': `
    <svg class="premium-icon thunderstorm-night" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cloudGradientThunderNight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#333333" />
          <stop offset="100%" stop-color="#1A1A1A" />
        </linearGradient>
        <linearGradient id="lightningGradientNight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFF176" />
          <stop offset="100%" stop-color="#FFEB3B" />
        </linearGradient>
      </defs>
      <g class="cloud" transform="translate(5, 15)">
        <path d="M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35" fill="url(#cloudGradientThunderNight)" stroke="#1A1A1A" stroke-width="1">
          <animate attributeName="d" values="M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35;M25 37 C10 37 5 47 5 57 C5 67 15 77 30 77 C45 77 65 77 75 77 C90 77 95 67 95 57 C95 47 85 37 75 37 C75 22 60 17 50 17 C35 17 30 27 35 37 C25 27 10 27 25 37;M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35" dur="15s" repeatCount="indefinite" />
        </path>
      </g>
      
      <!-- Lightning Bolts -->
      <g class="lightning">
        <path d="M55 65 L50 75 L55 75 L45 90 L50 80 L45 80 L50 65" fill="url(#lightningGradientNight)" stroke="#FFA000" stroke-width="0.75">
          <animate attributeName="opacity" values="0;1;0;1;0" dur="2s" begin="0.2s" repeatCount="indefinite" />
        </path>
        <path d="M35 70 L30 80 L35 80 L25 95" fill="url(#lightningGradientNight)" stroke="#FFA000" stroke-width="0.75" opacity="0">
          <animate attributeName="opacity" values="0;1;0" dur="3s" begin="1s" repeatCount="indefinite" />
        </path>
      </g>
      
      <!-- Rain Drops -->
      <g class="rain-drops">
        <path d="M30 70 L30 75 C30 77 28 77 28 75 L28 70" fill="#4CC4FF" stroke="#3F9BDA" stroke-width="0.5">
          <animate attributeName="transform" values="translate(0,0); translate(0,15); translate(0,0)" dur="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
        </path>
        
        <path d="M70 70 L70 75 C70 77 68 77 68 75 L68 70" fill="#4CC4FF" stroke="#3F9BDA" stroke-width="0.5">
          <animate attributeName="transform" values="translate(0,0); translate(0,15); translate(0,0)" dur="0.9s" begin="0.3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0;1" dur="0.9s" begin="0.3s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  `,
  
  // Ícones para neve
  '13d': `
    <svg class="premium-icon snow" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cloudGradientSnow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F5F5F5" />
          <stop offset="100%" stop-color="#E0E0E0" />
        </linearGradient>
        <radialGradient id="snowflakeGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="100%" stop-color="#E0E0FF" />
        </radialGradient>
      </defs>
      <g class="cloud" transform="translate(5, 15)">
        <path d="M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35" fill="url(#cloudGradientSnow)" stroke="#E0E0E0" stroke-width="1">
          <animate attributeName="d" values="M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35;M25 37 C10 37 5 47 5 57 C5 67 15 77 30 77 C45 77 65 77 75 77 C90 77 95 67 95 57 C95 47 85 37 75 37 C75 22 60 17 50 17 C35 17 30 27 35 37 C25 27 10 27 25 37;M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35" dur="15s" repeatCount="indefinite" />
        </path>
      </g>
      
      <!-- Snowflakes -->
      <g class="snowflakes">
        <!-- Snowflake 1 -->
        <g transform="translate(30, 80)">
          <path d="M0 -6 L0 6 M-6 0 L6 0 M-4 -4 L4 4 M-4 4 L4 -4" stroke="#BDBDFF" stroke-width="1.5" stroke-linecap="round" />
          <circle cx="0" cy="0" r="2" fill="url(#snowflakeGradient)" />
          <animateTransform attributeName="transform" type="translate" values="30,75; 30,95; 30,75" dur="2s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="5s" repeatCount="indefinite" additive="sum" />
        </g>
        
        <!-- Snowflake 2 -->
        <g transform="translate(50, 75)">
          <path d="M0 -6 L0 6 M-6 0 L6 0 M-4 -4 L4 4 M-4 4 L4 -4" stroke="#BDBDFF" stroke-width="1.5" stroke-linecap="round" />
          <circle cx="0" cy="0" r="2" fill="url(#snowflakeGradient)" />
          <animateTransform attributeName="transform" type="translate" values="50,75; 50,95; 50,75" dur="2.5s" begin="0.2s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="5s" repeatCount="indefinite" additive="sum" />
        </g>
        
        <!-- Snowflake 3 -->
        <g transform="translate(70, 80)">
          <path d="M0 -6 L0 6 M-6 0 L6 0 M-4 -4 L4 4 M-4 4 L4 -4" stroke="#BDBDFF" stroke-width="1.5" stroke-linecap="round" />
          <circle cx="0" cy="0" r="2" fill="url(#snowflakeGradient)" />
          <animateTransform attributeName="transform" type="translate" values="70,75; 70,95; 70,75" dur="2.2s" begin="0.4s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="4s" repeatCount="indefinite" additive="sum" />
        </g>
      </g>
    </svg>
  `,
  '13n': `
    <svg class="premium-icon snow-night" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cloudGradientSnowNight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E5E5E5" />
          <stop offset="100%" stop-color="#C8C8C8" />
        </linearGradient>
        <radialGradient id="snowflakeGradientNight" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="100%" stop-color="#E0E0FF" />
        </radialGradient>
      </defs>
      <g class="cloud" transform="translate(5, 15)">
        <path d="M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35" fill="url(#cloudGradientSnowNight)" stroke="#C8C8C8" stroke-width="1">
          <animate attributeName="d" values="M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35;M25 37 C10 37 5 47 5 57 C5 67 15 77 30 77 C45 77 65 77 75 77 C90 77 95 67 95 57 C95 47 85 37 75 37 C75 22 60 17 50 17 C35 17 30 27 35 37 C25 27 10 27 25 37;M25 35 C10 35 5 45 5 55 C5 65 15 75 30 75 C45 75 65 75 75 75 C90 75 95 65 95 55 C95 45 85 35 75 35 C75 20 60 15 50 15 C35 15 30 25 35 35 C25 25 10 25 25 35" dur="15s" repeatCount="indefinite" />
        </path>
      </g>
      
      <!-- Snowflakes -->
      <g class="snowflakes">
        <!-- Snowflake 1 -->
        <g transform="translate(30, 80)">
          <path d="M0 -6 L0 6 M-6 0 L6 0 M-4 -4 L4 4 M-4 4 L4 -4" stroke="#BDBDFF" stroke-width="1.5" stroke-linecap="round" />
          <circle cx="0" cy="0" r="2" fill="url(#snowflakeGradientNight)" />
          <animateTransform attributeName="transform" type="translate" values="30,75; 30,95; 30,75" dur="2s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="5s" repeatCount="indefinite" additive="sum" />
        </g>
        
        <!-- Snowflake 2 -->
        <g transform="translate(50, 75)">
          <path d="M0 -6 L0 6 M-6 0 L6 0 M-4 -4 L4 4 M-4 4 L4 -4" stroke="#BDBDFF" stroke-width="1.5" stroke-linecap="round" />
          <circle cx="0" cy="0" r="2" fill="url(#snowflakeGradientNight)" />
          <animateTransform attributeName="transform" type="translate" values="50,75; 50,95; 50,75" dur="2.5s" begin="0.2s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="5s" repeatCount="indefinite" additive="sum" />
        </g>
        
        <!-- Snowflake 3 -->
        <g transform="translate(70, 80)">
          <path d="M0 -6 L0 6 M-6 0 L6 0 M-4 -4 L4 4 M-4 4 L4 -4" stroke="#BDBDFF" stroke-width="1.5" stroke-linecap="round" />
          <circle cx="0" cy="0" r="2" fill="url(#snowflakeGradientNight)" />
          <animateTransform attributeName="transform" type="translate" values="70,75; 70,95; 70,75" dur="2.2s" begin="0.4s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="4s" repeatCount="indefinite" additive="sum" />
        </g>
      </g>
    </svg>
  `,
  
  // Ícones para névoa
  '50d': `
    <svg class="premium-icon mist" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mistGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#B0BEC5" />
          <stop offset="100%" stop-color="#78909C" />
        </linearGradient>
      </defs>
      <!-- Sun behind mist -->
      <circle cx="30" cy="30" r="15" fill="#FFA726" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.3;0.5" dur="5s" repeatCount="indefinite" />
      </circle>
      
      <!-- Mist layers -->
      <g class="mist-layers">
        <path d="M10 40 H90" stroke="url(#mistGradient)" stroke-width="4" stroke-linecap="round" opacity="0.9">
          <animate attributeName="y" values="40;38;40" dur="6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0.7;0.9" dur="6s" repeatCount="indefinite" />
        </path>
        
        <path d="M5 50 H85" stroke="url(#mistGradient)" stroke-width="5" stroke-linecap="round" opacity="0.8">
          <animate attributeName="y" values="50;52;50" dur="7s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.6;0.8" dur="7s" repeatCount="indefinite" />
        </path>
        
        <path d="M15 60 H95" stroke="url(#mistGradient)" stroke-width="6" stroke-linecap="round" opacity="0.7">
          <animate attributeName="y" values="60;58;60" dur="8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0.5;0.7" dur="8s" repeatCount="indefinite" />
        </path>
        
        <path d="M10 70 H90" stroke="url(#mistGradient)" stroke-width="7" stroke-linecap="round" opacity="0.6">
          <animate attributeName="y" values="70;72;70" dur="9s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.4;0.6" dur="9s" repeatCount="indefinite" />
        </path>
        
        <path d="M20 80 H80" stroke="url(#mistGradient)" stroke-width="8" stroke-linecap="round" opacity="0.5">
          <animate attributeName="y" values="80;78;80" dur="10s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.3;0.5" dur="10s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  `,
  '50n': `
    <svg class="premium-icon mist-night" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mistGradientNight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#90A4AE" />
          <stop offset="100%" stop-color="#546E7A" />
        </linearGradient>
        <radialGradient id="moonGradientMist" cx="50%" cy="50%" r="65%" fx="80%" fy="40%">
          <stop offset="0%" stop-color="#FEFCD7" />
          <stop offset="100%" stop-color="#F1DA8C" />
        </radialGradient>
      </defs>
      <!-- Moon behind mist -->
      <path class="moon" d="M30 15 C20 15 20 40 30 40 C40 40 40 30 33 25 C33 25 33 15 30 15" fill="url(#moonGradientMist)" stroke="#C8A951" stroke-width="0.75" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.4;0.6" dur="5s" repeatCount="indefinite" />
      </path>
      
      <!-- Mist layers -->
      <g class="mist-layers">
        <path d="M10 40 H90" stroke="url(#mistGradientNight)" stroke-width="4" stroke-linecap="round" opacity="0.9">
          <animate attributeName="y" values="40;38;40" dur="6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0.7;0.9" dur="6s" repeatCount="indefinite" />
        </path>
        
        <path d="M5 50 H85" stroke="url(#mistGradientNight)" stroke-width="5" stroke-linecap="round" opacity="0.8">
          <animate attributeName="y" values="50;52;50" dur="7s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.6;0.8" dur="7s" repeatCount="indefinite" />
        </path>
        
        <path d="M15 60 H95" stroke="url(#mistGradientNight)" stroke-width="6" stroke-linecap="round" opacity="0.7">
          <animate attributeName="y" values="60;58;60" dur="8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0.5;0.7" dur="8s" repeatCount="indefinite" />
        </path>
        
        <path d="M10 70 H90" stroke="url(#mistGradientNight)" stroke-width="7" stroke-linecap="round" opacity="0.6">
          <animate attributeName="y" values="70;72;70" dur="9s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.4;0.6" dur="9s" repeatCount="indefinite" />
        </path>
        
        <path d="M20 80 H80" stroke="url(#mistGradientNight)" stroke-width="8" stroke-linecap="round" opacity="0.5">
          <animate attributeName="y" values="80;78;80" dur="10s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.3;0.5" dur="10s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  `
};

// Exporta os ícones
export default weatherIcons;