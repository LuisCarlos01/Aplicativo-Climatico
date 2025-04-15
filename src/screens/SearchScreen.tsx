import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import debounce from 'lodash.debounce';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppStackParamList } from '../navigation/AppNavigator';
import theme from '../theme';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { searchCity } from '../services/weatherService';
import { useLocation } from '../context/LocationContext';
import { useWeather } from '../context/WeatherContext';
import { Location } from '../services/locationService';
import { saveRecentSearch, getRecentSearches } from '../services/storageService';

type SearchScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Search'>;

interface SearchResult {
  id: string;
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

const SearchScreen: React.FC = () => {
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? theme.colors.dark : theme.colors.light;
  
  const { setCurrentLocation } = useLocation();
  const { loadWeatherAndForecast } = useWeather();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Load recent searches on mount
  useEffect(() => {
    const loadRecentSearches = async () => {
      const recent = await getRecentSearches();
      setRecentSearches(recent);
    };
    
    loadRecentSearches();
  }, []);
  
  // Debounce search to prevent too many API calls
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const cities = await searchCity(query);
        
        // Map API response to our format
        const searchResults: SearchResult[] = cities.map(city => ({
          id: `${city.lat},${city.lon}`,
          name: city.name,
          country: city.country,
          state: city.state,
          lat: city.lat,
          lon: city.lon,
        }));
        
        setResults(searchResults);
      } catch (err) {
        console.error('Error searching cities:', err);
        setError('Falha ao buscar cidades. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );
  
  // Handle search query changes
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    debouncedSearch(text);
  };
  
  // Handle recent search item press
  const handleRecentSearchPress = (query: string) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };
  
  // Handle city selection
  const handleSelectCity = async (city: SearchResult) => {
    try {
      // Create location object
      const location: Location = {
        id: city.id,
        name: city.name,
        country: city.country,
        state: city.state,
        lat: city.lat,
        lon: city.lon,
      };
      
      // Save city to recent searches
      await saveRecentSearch(city.name);
      
      // Set as current location
      await setCurrentLocation(location);
      
      // Navigate back to home
      navigation.goBack();
    } catch (err) {
      console.error('Error selecting city:', err);
      Alert.alert(
        'Erro',
        'Não foi possível selecionar esta cidade. Tente novamente.'
      );
    }
  };
  
  // Render result item
  const renderResultItem = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity
      style={[styles.resultItem, { borderBottomColor: colors.border }]}
      onPress={() => handleSelectCity(item)}
    >
      <Icon name="location-outline" size={20} color={colors.primary} style={styles.locationIcon} />
      <View style={styles.resultTextContainer}>
        <Text style={[styles.resultName, { color: colors.text }]}>
          {item.name}
        </Text>
        <Text style={[styles.resultDetail, { color: colors.textSecondary }]}>
          {item.state ? `${item.state}, ` : ''}{item.country}
        </Text>
      </View>
    </TouchableOpacity>
  );
  
  // Render recent search item
  const renderRecentItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[styles.recentItem, { backgroundColor: colors.card }]}
      onPress={() => handleRecentSearchPress(item)}
    >
      <Icon name="time-outline" size={16} color={colors.textSecondary} style={styles.recentIcon} />
      <Text style={[styles.recentText, { color: colors.text }]}>{item}</Text>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="Buscar Cidade"
        showBack={true}
        showSearch={false}
        onBackPress={() => navigation.goBack()}
      />
      
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearchChange}
          onSearch={debouncedSearch}
          placeholder="Digite o nome da cidade..."
          autoFocus={true}
        />
        
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
        
        {error && (
          <View style={styles.errorContainer}>
            <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
          </View>
        )}
        
        {!loading && results.length === 0 && searchQuery.length === 0 && (
          <>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Buscas Recentes
            </Text>
            
            {recentSearches.length > 0 ? (
              <View style={styles.recentItemsContainer}>
                {recentSearches.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.recentItem, { backgroundColor: colors.card }]}
                    onPress={() => handleRecentSearchPress(item)}
                  >
                    <Icon name="time-outline" size={16} color={colors.textSecondary} style={styles.recentIcon} />
                    <Text style={[styles.recentText, { color: colors.text }]}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                Nenhuma busca recente
              </Text>
            )}
          </>
        )}
        
        {!loading && results.length === 0 && searchQuery.length > 0 && (
          <View style={styles.noResultsContainer}>
            <Icon name="search-outline" size={48} color={colors.textSecondary} />
            <Text style={[styles.noResultsText, { color: colors.textSecondary }]}>
              Nenhuma cidade encontrada para "{searchQuery}"
            </Text>
          </View>
        )}
        
        {!loading && results.length > 0 && (
          <FlatList
            data={results}
            renderItem={renderResultItem}
            keyExtractor={item => item.id}
            style={styles.resultsList}
            keyboardShouldPersistTaps="handled"
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    padding: theme.spacing.large,
    alignItems: 'center',
  },
  errorContainer: {
    padding: theme.spacing.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: theme.typography.size.md,
    textAlign: 'center',
  },
  resultsList: {
    flex: 1,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.medium,
    borderBottomWidth: 1,
  },
  locationIcon: {
    marginRight: theme.spacing.small,
  },
  resultTextContainer: {
    flex: 1,
  },
  resultName: {
    fontSize: theme.typography.size.md,
    fontWeight: '500' as any,
  },
  resultDetail: {
    fontSize: theme.typography.size.sm,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: theme.typography.size.md,
    fontWeight: '600' as any,
    marginHorizontal: theme.spacing.medium,
    marginTop: theme.spacing.large,
    marginBottom: theme.spacing.small,
  },
  recentItemsContainer: {
    paddingHorizontal: theme.spacing.medium,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.spacing.borderRadius.medium,
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
    marginRight: theme.spacing.small,
    marginBottom: theme.spacing.small,
  },
  recentIcon: {
    marginRight: theme.spacing.tiny,
  },
  recentText: {
    fontSize: theme.typography.size.sm,
  },
  emptyText: {
    fontSize: theme.typography.size.md,
    textAlign: 'center',
    marginTop: theme.spacing.xlarge,
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.large,
    marginTop: theme.spacing.xlarge,
  },
  noResultsText: {
    fontSize: theme.typography.size.md,
    textAlign: 'center',
    marginTop: theme.spacing.medium,
  },
});

export default SearchScreen;
