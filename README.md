# 🌦️ App Clima – Previsão do Tempo com Estilo e Inteligência

![React Native](https://img.shields.io/badge/React%20Native-Mobile%20App-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-HTTP%20Client-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![OpenWeather](https://img.shields.io/badge/OpenWeatherMap-API-007ACC?style=for-the-badge&logo=weather&logoColor=white)
![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

Um aplicativo moderno e responsivo de **previsão do tempo**, construído com **React Native**, que oferece dados meteorológicos detalhados com uma interface fluida, intuitiva e com suporte a modo escuro.

![Screenshot do App](./screenshots/app-screenshot.png)

---

## ✨ Funcionalidades Principais

- 📍 **Geolocalização Automática**
  - Detecta a localização do usuário em tempo real
  - Exibe o clima atual baseado na posição

- 🔎 **Busca por Cidade**
  - Pesquisa manual com previsão detalhada
  - Suporte a qualquer localidade global

- ☀️ **Detalhes Climáticos**
  - Temperatura atual
  - Sensação térmica
  - Umidade relativa
  - Velocidade do vento
  - Descrição do clima (ex: nublado, limpo)

- 📆 **Previsões Avançadas**
  - Previsão por hora para as próximas 24h
  - Previsão diária para 5 a 7 dias

- 🎨 **Interface Moderna**
  - Modo claro/escuro com alternância rápida
  - Transições suaves
  - Suporte a pull-to-refresh

---

## 🧰 Tecnologias Utilizadas

- **React Native** – Framework mobile nativo
- **Axios** – Requisições HTTP
- **OpenWeatherMap API** – Dados meteorológicos
- **React Navigation** – Navegação entre telas
- **React Native Geolocation Service** – Localização via GPS
- **React Native Vector Icons** – Ícones de alta qualidade

---

## 📱 Capturas de Tela

<!-- Adicione aqui suas capturas de tela atualizadas -->

---

## 📦 Instalação e Execução

### ⚙️ Pré-requisitos

- Node.js (v14+)
- JDK 11+
- Android Studio (para Android)
- Xcode (para iOS - macOS)
- React Native CLI

### 🚀 Passo a passo

1. Clone o repositório:

```bash
git clone https://github.com/LuisCarlos01/Appclima.git
cd app-clima
```

2. Instale as dependências:

```bash
npm install
```

3. Configure a API:

- Crie uma conta no [OpenWeatherMap](https://openweathermap.org/)
- Copie sua chave da API
- Edite `src/services/weatherService.js` e substitua:

```js
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
```

4. Execute o app:

Para Android:
```bash
npx react-native run-android
```

Para iOS:
```bash
npx react-native run-ios
```

---

## 🗂️ Estrutura do Projeto

```
app-clima/
├── android/
├── ios/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.js
│   │   ├── SearchBar.js
│   │   ├── WeatherCard.js
│   │   ├── HourlyForecast.js
│   │   ├── DailyForecast.js
│   │   ├── Loading.js
│   │   └── ErrorView.js
│   ├── screens/
│   │   └── HomeScreen.js
│   ├── services/
│   │   └── weatherService.js
│   └── utils/
│       └── geolocation.js
├── App.tsx
└── index.js
```

---

## 🔐 Licença

Distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Desenvolvido por

Feito com 💙 por **Luis Carlos**  
[GitHub](https://github.com/LuisCarlos01) | [LinkedIn](https://www.linkedin.com/in/luizcarloss/)

---

## 🙌 Créditos

- [OpenWeatherMap](https://openweathermap.org/)
- [Ionicons](https://ionicons.com/)
- [React Native Community](https://reactnative.dev/community/overview)

---

## 📈 Roadmap

- 🌐 Suporte a múltiplos idiomas
- 🔔 Notificações com alertas climáticos
- 📊 Gráficos para dados históricos
- ♿ Acessibilidade aprimorada
```

---
