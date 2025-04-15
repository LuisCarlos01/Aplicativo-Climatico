/**
 * AppClima - Weather Application
 */

import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from './src/context/ThemeContext';
import {LocationProvider} from './src/context/LocationContext';
import {WeatherProvider} from './src/context/WeatherContext';
import AppNavigator from './src/navigation/AppNavigator';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <LocationProvider>
        <WeatherProvider>
          <NavigationContainer>
            <View style={styles.container}>
              <AppNavigator />
            </View>
          </NavigationContainer>
        </WeatherProvider>
      </LocationProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
