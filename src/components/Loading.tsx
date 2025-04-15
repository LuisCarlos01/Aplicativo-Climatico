import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing, useColorScheme } from 'react-native';
import theme from '../theme';
import Icon from 'react-native-vector-icons/Ionicons';

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = 'Carregando dados do clima...' }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? theme.colors.dark : theme.colors.light;
  
  // Animation values
  const cloudRotation = new Animated.Value(0);
  const sunOpacity = new Animated.Value(0);
  const rainOpacity = new Animated.Value(0);
  
  useEffect(() => {
    // Cloud rotation animation
    Animated.loop(
      Animated.timing(cloudRotation, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
    
    // Sun fade in/out animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(sunOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(sunOpacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    // Rain fade in/out animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(rainOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(rainOpacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
  
  // Map rotation value to rotation transform
  const spin = cloudRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.animationContainer}>
        <Animated.View style={[styles.iconContainer, { opacity: sunOpacity }]}>
          <Icon name="sunny-outline" size={48} color="#FFB300" />
        </Animated.View>
        
        <Animated.View 
          style={[
            styles.iconContainer, 
            { transform: [{ rotate: spin }] }
          ]}
        >
          <Icon name="cloud-outline" size={64} color={colors.primary} />
        </Animated.View>
        
        <Animated.View style={[styles.iconContainer, { opacity: rainOpacity, marginTop: 10 }]}>
          <Icon name="rainy-outline" size={32} color={colors.info} />
        </Animated.View>
      </View>
      
      <Text style={[styles.text, { color: colors.text }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.large,
  },
  animationContainer: {
    position: 'relative',
    height: 130,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.large,
  },
  iconContainer: {
    position: 'absolute',
  },
  text: {
    fontSize: theme.typography.size.md,
    textAlign: 'center',
    marginTop: theme.spacing.large,
  },
});

export default Loading;
