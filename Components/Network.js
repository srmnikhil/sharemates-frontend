import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as Network from 'expo-network';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';

const NETWORK_STATUS_TASK = 'NETWORK_STATUS_TASK';

// Define the task for fetching network status
TaskManager.defineTask(NETWORK_STATUS_TASK, async () => {
  const networkState = await Network.getNetworkStateAsync();

  console.log('Network Type:', networkState.type, 'Connected:', networkState.isConnected);

  // Return the result to indicate that the task is complete
  return BackgroundFetch.Result.NewData;
});

const NetworkStatus = () => {
  const [networkType, setNetworkType] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const fetchNetworkInfo = async () => {
    try {
      const networkState = await Network.getNetworkStateAsync();
      setNetworkType(networkState.type);
      setIsConnected(networkState.isConnected);
    } catch (error) {
      console.error('Error fetching network state:', error);
    }
  };

  useEffect(() => {
    fetchNetworkInfo(); // Fetch initial network info

    // Register the background task
    const registerBackgroundFetch = async () => {
      await BackgroundFetch.registerTaskAsync(NETWORK_STATUS_TASK, {
        minimumInterval: 15 * 60, // 15 minutes
        stopOnTerminate: false,
        startOnBoot: true,
      });
    };

    registerBackgroundFetch();
  }, [networkType, isConnected]);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        {isConnected ? networkType === "CELLULAR" ? <Image
          source={require('../assets/cellular.png')}
          style={styles.network}
        /> : <Image
          source={require('../assets/wifi.png')}
          style={styles.network}
        />
          : <Image
            source={require('../assets/nointernet.png')}
            style={styles.network}
          />}
        <Text style={styles.text}>
          {isConnected ? `Connected via ${networkType}` : 'No internet connection'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
  network: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  }
});

export default NetworkStatus;
