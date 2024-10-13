import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as Battery from 'expo-battery';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';

const BATTERY_STATUS_TASK = 'BATTERY_STATUS_TASK';

// Define the task for fetching battery status
TaskManager.defineTask(BATTERY_STATUS_TASK, async () => {
    const level = await Battery.getBatteryLevelAsync();
    const isCharging = await Battery.getBatteryStateAsync();
    
    console.log('Battery level:', level * 100, 'Charging:', isCharging);
    
    // Return the result to indicate that the task is complete
    return BackgroundFetch.Result.NewData;
});

const BatteryStatus = () => {
    const [batteryLevel, setBatteryLevel] = useState(null);
    const [charging, setCharging] = useState(false);

    const getBatteryStatus = async () => {
        const level = await Battery.getBatteryLevelAsync();
        const isCharging = await Battery.getBatteryStateAsync();
        setBatteryLevel(level * 100);
        setCharging(isCharging === Battery.BatteryState.CHARGING);
    };

    useEffect(() => {
        getBatteryStatus();

        const batteryLevelSubscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
            setBatteryLevel(batteryLevel * 100);
        });

        const chargingSubscription = Battery.addBatteryStateListener(({ batteryState }) => {
            setCharging(batteryState === Battery.BatteryState.CHARGING);
        });

        // Register the background task
        const registerBackgroundFetch = async () => {
            await BackgroundFetch.registerTaskAsync(BATTERY_STATUS_TASK, {
                minimumInterval: 15 * 60, // 15 minutes
                stopOnTerminate: false,
                startOnBoot: true,
            });
        };

        registerBackgroundFetch();

        return () => {
            batteryLevelSubscription.remove();
            chargingSubscription.remove();
        };
    }, [batteryLevel, charging]);

    const getBatteryImage = () => {
        if (charging) {
            return require('../assets/charging.png');
        }
        if (batteryLevel > 89) {
            return require('../assets/full.png');
        }
        if (batteryLevel > 49) {
            return require('../assets/morehalf.png');
        }
        if (batteryLevel > 25) {
            return require('../assets/half.png');
        }
        return require('../assets/lowhalf.png');
    };

    const battery = batteryLevel !== null ? batteryLevel.toFixed(0) : 'Loading...';

    return (
        <View style ={{marginRight: 70}}>
            <View style={{ alignItems: 'center' }}>
                <Image
                    source={getBatteryImage()}
                    style={styles.battery}
                />
                <Text style={{ fontSize: 18 }}>Battery</Text>
                <Text style={{ color: "#A7A7A7" }}>{battery}%</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    battery: {
        width: 20,
        height: 20,
        resizeMode: "contain",
    },
});

export default BatteryStatus;
