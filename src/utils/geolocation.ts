import Geolocation from 'react-native-geolocation-service';
import { checkLocationPermission, requestLocationPermission } from './permissionUtils';

interface GeolocationPosition {
  latitude: number;
  longitude: number;
  timestamp: number;
}

// Get current position with timeout and high accuracy
export const getCurrentPosition = async (): Promise<GeolocationPosition> => {
  // Check if permission is already granted
  let hasPermission = await checkLocationPermission();
  
  // If not, request it
  if (!hasPermission) {
    hasPermission = await requestLocationPermission();
  }
  
  if (!hasPermission) {
    throw new Error('Permission denied');
  }
  
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: position.timestamp,
        });
      },
      error => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  });
};

// Watch position changes
export const watchPosition = (
  onSuccess: (position: GeolocationPosition) => void,
  onError: (error: any) => void,
): number | undefined => {
  checkLocationPermission().then(hasPermission => {
    if (!hasPermission) {
      onError(new Error('Permission denied'));
      return;
    }
    
    return Geolocation.watchPosition(
      position => {
        onSuccess({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: position.timestamp,
        });
      },
      error => {
        onError(error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 500, // Minimum distance (meters) before receiving updates
        interval: 5000, // Minimum time (milliseconds) between updates
        fastestInterval: 2000, // Fastest rate at which app can handle updates
      },
    );
  });
};

// Clear watch position
export const clearWatch = (watchId: number): void => {
  Geolocation.clearWatch(watchId);
};

// Stop watching position changes
export const stopObserving = (): void => {
  Geolocation.stopObserving();
};
