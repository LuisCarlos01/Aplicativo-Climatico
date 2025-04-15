const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

// Lê e substitui a chave da API no HTML
let htmlTemplate = fs.readFileSync(path.join(__dirname, 'public/index.html'), 'utf8');
htmlTemplate = htmlTemplate.replace("%%OPENWEATHER_API_KEY%%", process.env.OPENWEATHER_API_KEY || '');
fs.writeFileSync(path.join(__dirname, 'public/index.html'), htmlTemplate);

module.exports = {
  mode: 'development',
  entry: './index.web.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    fallback: {
      "crypto": false,
      "stream": false,
      "path": false,
      "fs": false
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.OPENWEATHER_API_KEY': JSON.stringify(process.env.OPENWEATHER_API_KEY),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 5001,
    open: true,
    hot: true,
    allowedHosts: 'all',
  },
};