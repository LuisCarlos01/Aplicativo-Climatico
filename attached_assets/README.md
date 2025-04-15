# App Clima - Aplicativo de Previsão do Tempo

Um aplicativo de previsão do tempo moderno e responsivo construído com React Native, oferecendo informações meteorológicas detalhadas e uma interface intuitiva.

![Screenshot do App](./screenshots/app-screenshot.png)

## ✨ Funcionalidades

- **Informações detalhadas de clima:**

  - Temperatura atual
  - Sensação térmica
  - Umidade do ar
  - Velocidade do vento
  - Condições climáticas (ex: céu limpo, nublado)

- **Previsão do tempo:**

  - Previsão por hora para as próximas 24 horas
  - Previsão diária para os próximos 5-7 dias

- **Geolocalização:**

  - Detecção automática da localização do usuário
  - Exibição do clima local baseado na posição atual

- **Busca por cidade:**

  - Pesquisa manual por cidade
  - Exibição de informações detalhadas para qualquer localidade

- **Interface:**
  - Design moderno e responsivo
  - Modo claro/escuro com alternância por botão
  - Transições suaves entre estados
  - Pull-to-refresh para atualizar dados

## 🛠️ Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento mobile
- **Axios**: Cliente HTTP para consumo de API
- **React Navigation**: Sistema de navegação entre telas
- **React Native Vector Icons**: Biblioteca de ícones
- **React Native Geolocation Service**: Acesso à localização do dispositivo
- **OpenWeatherMap API**: Fonte de dados meteorológicos

## 📱 Capturas de Tela

<!-- Adicione capturas de tela do seu aplicativo aqui -->

## 📦 Instalação e Execução

### Pré-requisitos

- Node.js instalado (versão 14 ou superior)
- JDK 11 ou superior
- Android Studio (para desenvolvimento Android)
- Xcode (para desenvolvimento iOS - apenas macOS)
- React Native CLI

### Passos para instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/app-clima.git
cd app-clima
```

2. Instale as dependências:

```bash
npm install
```

3. Configure a API:

   - Crie uma conta no [OpenWeatherMap](https://openweathermap.org/)
   - Obtenha uma chave de API gratuita
   - Abra o arquivo `src/services/weatherService.js`
   - Substitua `YOUR_OPENWEATHERMAP_API_KEY` pela sua chave

4. Execute o aplicativo:

Para Android:

```bash
npx react-native run-android
```

Para iOS:

```bash
npx react-native run-ios
```

## 🗂️ Estrutura do Projeto

```
app-clima/
├── android/               # Arquivos específicos do Android
├── ios/                   # Arquivos específicos do iOS
├── src/                   # Código fonte do aplicativo
│   ├── assets/            # Imagens e outros recursos estáticos
│   ├── components/        # Componentes reutilizáveis
│   │   ├── Header.js
│   │   ├── SearchBar.js
│   │   ├── WeatherCard.js
│   │   ├── HourlyForecast.js
│   │   ├── DailyForecast.js
│   │   ├── Loading.js
│   │   └── ErrorView.js
│   ├── screens/           # Telas do aplicativo
│   │   └── HomeScreen.js
│   ├── services/          # Serviços e integração com APIs
│   │   └── weatherService.js
│   └── utils/             # Funções utilitárias
│       └── geolocation.js
├── App.tsx                # Componente principal
└── index.js               # Ponto de entrada do aplicativo
```

## 📃 Licença

Este projeto está licenciado sob a licença MIT - consulte o arquivo [LICENSE](LICENSE) para obter detalhes.

## 👨‍💻 Autor

Desenvolvido por [Seu Nome](https://github.com/seu-usuario)

## 🙏 Créditos

- [OpenWeatherMap](https://openweathermap.org/) pela API de dados meteorológicos
- [Ionicons](https://ionicons.com/) pelos ícones utilizados
- [React Native Community](https://reactnative.dev/community/overview) pelo suporte e recursos

---

## 🚀 Próximos Passos

- Adicionar suporte para múltiplos idiomas
- Implementar notificações para alertas meteorológicos
- Adicionar gráficos para visualização de dados históricos
- Melhorar acessibilidade
