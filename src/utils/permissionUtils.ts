import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

// Request location permissions on Android
export const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    try {
      const granted = await Geolocation.requestAuthorization('whenInUse');
      return granted === 'granted';
    } catch (error) {
      console.error('Error requesting iOS location permission:', error);
      return false;
    }
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permissão de localização',
          message:
            'App Clima precisa acessar sua localização para mostrar a previsão do tempo para sua região atual.',
          buttonNeutral: 'Perguntar depois',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.error('Error requesting Android location permission:', error);
      return false;
    }
  }
};

// Check if location permission is granted
export const checkLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    try {
      const status = await Geolocation.requestAuthorization('whenInUse');
      return status === 'granted';
    } catch (error) {
      console.error('Error checking iOS location permission:', error);
      return false;
    }
  } else {
    try {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted;
    } catch (error) {
      console.error('Error checking Android location permission:', error);
      return false;
    }
  }
};
