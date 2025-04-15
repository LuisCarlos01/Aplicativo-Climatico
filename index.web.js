/**
 * Web entry point for AppClima
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import WebApp from './web-app';

// A API key já está disponível em window.ENV, definida no HTML

// Usando React 18 createRoot API para renderizar o componente
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<WebApp />);