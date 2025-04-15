import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onPress: () => void;
  size?: number;
  style?: ViewStyle;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onPress,
  size = 24,
  style,
}) => {
  // Animation values
  const [scale] = useState(new Animated.Value(1));
  const [rotation] = useState(new Animated.Value(0));
  
  const handlePress = () => {
    // Start animation sequence
    Animated.sequence([
      // First scale up quickly
      Animated.timing(scale, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.cubic,
      }),
      // Then scale back to normal
      Animated.timing(scale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.cubic,
      }),
    ]).start();

    // Add some rotation if toggling to favorite
    if (!isFavorite) {
      Animated.timing(rotation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.elastic(2),
      }).start(() => {
        rotation.setValue(0);
      });
    }
    
    // Call the provided onPress handler
    onPress();
  };
  
  // Create rotation transform
  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '72deg'],
  });
  
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          styles.iconContainer,
          {
            transform: [
              { scale },
              { rotate: rotateInterpolation },
            ],
          },
        ]}
      >
        <Icon
          name={isFavorite ? 'star' : 'star-outline'}
          size={size}
          color={isFavorite ? '#FFD700' : '#FFFFFF'}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    // Apply shadow to make the icon stand out
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
});

export default FavoriteButton;
