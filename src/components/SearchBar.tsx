import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  useColorScheme,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../theme';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onClear,
  placeholder = 'Buscar cidade...',
  autoFocus = false,
  value: externalValue,
  onChangeText: externalOnChangeText,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? theme.colors.dark : theme.colors.light;
  
  // State management for controlled or uncontrolled component
  const [localValue, setLocalValue] = useState('');
  const value = externalValue !== undefined ? externalValue : localValue;
  
  const onChangeText = (text: string) => {
    if (externalOnChangeText) {
      externalOnChangeText(text);
    } else {
      setLocalValue(text);
    }
  };
  
  // Animation for clear button
  const clearButtonOpacity = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(clearButtonOpacity, {
      toValue: value.length > 0 ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [value]);
  
  // Handle search submission
  const handleSubmit = () => {
    if (value.trim()) {
      onSearch(value.trim());
    }
  };
  
  // Handle clearing the search
  const handleClear = () => {
    onChangeText('');
    if (onClear) {
      onClear();
    }
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={[styles.searchBar, { backgroundColor: isDark ? colors.border : '#F0F0F0' }]}>
        <Icon name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
        
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={handleSubmit}
          autoCapitalize="words"
          autoCorrect={false}
          returnKeyType="search"
          clearButtonMode="never"
          autoFocus={autoFocus}
        />
        
        <Animated.View style={[styles.clearButton, { opacity: clearButtonOpacity }]}>
          {value.length > 0 && (
            <TouchableOpacity onPress={handleClear} hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <Icon name="close-circle" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.medium,
    paddingTop: Platform.OS === 'ios' ? theme.spacing.small : theme.spacing.medium,
    paddingBottom: theme.spacing.small,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.spacing.borderRadius.medium,
    paddingHorizontal: theme.spacing.medium,
    height: 48,
  },
  searchIcon: {
    marginRight: theme.spacing.small,
  },
  input: {
    flex: 1,
    fontSize: theme.typography.size.md,
    padding: 0,
  },
  clearButton: {
    marginLeft: theme.spacing.small,
  },
});

export default SearchBar;
