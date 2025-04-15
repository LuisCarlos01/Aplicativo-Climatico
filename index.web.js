/**
 * Web entry point for AppClima
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import WebApp from './web-app';

// Disponibilizando a API key do .env para o cliente
if (window.ENV && window.ENV.OPENWEATHER_API_KEY) {
  process.env.OPENWEATHER_API_KEY = window.ENV.OPENWEATHER_API_KEY;
}

// Usando React 18 createRoot API para renderizar o componente
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<WebApp />);