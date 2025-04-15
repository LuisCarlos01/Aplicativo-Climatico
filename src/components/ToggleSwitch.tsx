import React, { useEffect, useRef } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Easing,
  ViewStyle,
  Text,
} from 'react-native';
import theme from '../theme';

interface ToggleSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  activeColor?: string;
  inactiveColor?: string;
  style?: ViewStyle;
  label?: string;
  disabled?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  value,
  onValueChange,
  activeColor = theme.colors.light.primary,
  inactiveColor = '#E0E0E0',
  style,
  label,
  disabled = false,
}) => {
  // Animation references
  const switchTranslate = useRef(new Animated.Value(value ? 1 : 0)).current;
  const backgroundColorAnim = useRef(new Animated.Value(value ? 1 : 0)).current;
  
  // Update animations when value changes
  useEffect(() => {
    Animated.parallel([
      Animated.timing(switchTranslate, {
        toValue: value ? 1 : 0,
        duration: 200,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: true,
      }),
      Animated.timing(backgroundColorAnim, {
        toValue: value ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [value, switchTranslate, backgroundColorAnim]);
  
  // Interpolate values for animations
  const translateX = switchTranslate.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });
  
  const backgroundColor = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColor, activeColor],
  });
  
  // Toggle handler
  const toggleSwitch = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };
  
  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, disabled && styles.disabledLabel]}>
          {label}
        </Text>
      )}
      <TouchableWithoutFeedback onPress={toggleSwitch}>
        <View style={styles.switchContainer}>
          <Animated.View
            style={[
              styles.switchTrack,
              { backgroundColor },
              disabled && styles.disabled,
            ]}
          >
            <Animated.View
              style={[
                styles.switchThumb,
                {
                  transform: [{ translateX }],
                },
                disabled && styles.disabledThumb,
              ]}
            />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginRight: theme.spacing.medium,
    fontSize: theme.typography.size.md,
    color: theme.colors.light.text,
  },
  disabledLabel: {
    color: theme.colors.light.textSecondary,
  },
  switchContainer: {
    padding: 8,
  },
  switchTrack: {
    width: 40,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
  },
  switchThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 2,
  },
  disabled: {
    opacity: 0.5,
  },
  disabledThumb: {
    backgroundColor: '#F5F5F5',
  },
});

export default ToggleSwitch;
