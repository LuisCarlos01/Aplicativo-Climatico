import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../theme';

interface ErrorViewProps {
  message: string;
  onRetry?: () => void;
  error?: Error;
}

const ErrorView: React.FC<ErrorViewProps> = ({ 
  message, 
  onRetry,
  error,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? theme.colors.dark : theme.colors.light;
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Icon name="cloud-offline-outline" size={80} color={colors.error} />
      
      <Text style={[styles.title, { color: colors.error }]}>
        Ops! Algo deu errado.
      </Text>
      
      <Text style={[styles.message, { color: colors.text }]}>
        {message}
      </Text>
      
      {error && __DEV__ && (
        <Text style={[styles.errorDetails, { color: colors.textSecondary }]}>
          {error.toString()}
        </Text>
      )}
      
      {onRetry && (
        <TouchableOpacity
          style={[styles.retryButton, { backgroundColor: colors.primary }]}
          onPress={onRetry}
        >
          <Icon name="refresh-outline" size={20} color="#FFFFFF" style={styles.buttonIcon} />
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      )}
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
  title: {
    fontSize: theme.typography.size.xl,
    fontWeight: theme.typography.weight.bold as any,
    marginTop: theme.spacing.large,
    marginBottom: theme.spacing.small,
  },
  message: {
    fontSize: theme.typography.size.md,
    textAlign: 'center',
    marginBottom: theme.spacing.large,
  },
  errorDetails: {
    fontSize: theme.typography.size.sm,
    textAlign: 'center',
    marginBottom: theme.spacing.large,
    padding: theme.spacing.medium,
    maxWidth: '90%',
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    borderRadius: theme.spacing.borderRadius.medium,
    marginTop: theme.spacing.medium,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.medium as any,
  },
  buttonIcon: {
    marginRight: theme.spacing.small,
  },
});

export default ErrorView;
