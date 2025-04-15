import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  useColorScheme,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../theme';

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  onSearchPress?: () => void;
  onMenuPress?: () => void;
  showSearch?: boolean;
  showMenu?: boolean;
  showBack?: boolean;
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  onBackPress,
  onSearchPress,
  onMenuPress,
  showSearch = true,
  showMenu = false,
  showBack = false,
  transparent = false,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? theme.colors.dark : theme.colors.light;
  
  const containerStyle = [
    styles.container,
    transparent ? styles.transparent : { backgroundColor: colors.card },
  ];
  
  const textColor = transparent ? '#FFFFFF' : colors.text;
  const iconColor = transparent ? '#FFFFFF' : colors.text;
  
  return (
    <>
      <StatusBar
        barStyle={transparent || isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <View style={containerStyle}>
        <View style={styles.leftContainer}>
          {showBack && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onBackPress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon name="arrow-back" size={24} color={iconColor} />
            </TouchableOpacity>
          )}
        </View>
        
        <Text 
          style={[styles.title, { color: textColor }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        
        <View style={styles.rightContainer}>
          {showSearch && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onSearchPress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon name="search-outline" size={24} color={iconColor} />
            </TouchableOpacity>
          )}
          
          {showMenu && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onMenuPress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon name="menu-outline" size={24} color={iconColor} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56 + (Platform.OS === 'ios' ? 44 : 0),
    paddingTop: Platform.OS === 'ios' ? 44 : 0,
    paddingHorizontal: theme.spacing.medium,
    zIndex: 10,
  },
  transparent: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  leftContainer: {
    flexDirection: 'row',
    width: 80,
  },
  rightContainer: {
    flexDirection: 'row',
    width: 80,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: theme.typography.size.lg,
    fontWeight: '600' as any,
    flex: 1,
    textAlign: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
