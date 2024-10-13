// LocationComponent.js
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

const LocationComponent = ({ setLocation }) => {
  const [isForegroundTracking, setIsForegroundTracking] = useState(false);
  const [isBackgroundTracking, setIsBackgroundTracking] = useState(false);

  const requestPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    // Request background permissions
    let { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus !== 'granted') {
      Alert.alert('Background location permission was denied');
      return;
    }
  };

  const startForegroundTracking = async () => {
    setIsForegroundTracking(true);
    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 30000, // Set time interval to 30 seconds
        distanceInterval: 0, // Only update on location change
      },
      (newLocation) => {
        setLocation(newLocation.coords);
      }
    );
  };

  const startBackgroundTracking = async () => {
    setIsBackgroundTracking(true);
    await Location.startLocationUpdatesAsync('background-location-task', {
      accuracy: Location.Accuracy.High,
      timeInterval: 30000, // Set time interval to 30 seconds
      distanceInterval: 0,
    });
  };

  useEffect(() => {
    requestPermissions();
    startForegroundTracking();
    startBackgroundTracking();

    return () => {
      setIsForegroundTracking(false);
      setIsBackgroundTracking(false);
      Location.stopLocationUpdatesAsync('background-location-task');
    };
  }, []);

  return null;
};

export default LocationComponent;
