import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import Modal from 'react-native-modal';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginScreen from './Components/Login';
import UserDets from './Components/UserDets';
export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(false);
  const [mapType, setMapType] = useState('standard'); // State to manage map type
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

  const fetchLocation = async () => {
    setLoading(true);
    setErrorMsg(null);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      setLoading(false);
      return;
    }

    try {
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    } catch (error) {
      setErrorMsg('Failed to fetch location');
    } finally {
      setLoading(false);
    }
  };

  const handleUserDetails = () => {
    console.log("UserClicked");
    setDetails(true);
  }

  useEffect(() => {
    fetchLocation();
  }, []);

  const getDirections = () => {
    if (location) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;
      Linking.openURL(url);
    }
  };

  const toggleMapType = () => {
    setMapType((prevType) => (prevType === 'standard' ? 'hybrid' : 'standard'));
  };

  let locationText = 'Waiting for location...';
  if (errorMsg) {
    locationText = errorMsg;
  } else if (location) {
    locationText = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
  }

  return (
    <View style={styles.container}>
      {!isLoggedIn ? (
        <View style={styles.loginContainer}>
          <LoginScreen fetchLocation={fetchLocation} setIsLoggedIn={setIsLoggedIn} />
        </View>
      ) : (
        <>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              {location ? (
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                  mapType={mapType} // Set the map type here
                >
                  <Marker
                    coordinate={{
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }}
                    title="You are here"
                    description="This is your current location"
                  />
                </MapView>
              ) : (
                <Text style={styles.text}>{locationText}</Text>
              )}
              {details ? (<Modal onBackdropPress={() => setDetails(false)}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Location Details</Text>
                  <Text style={styles.modalText}>Latitude: {location.latitude}</Text>
                  <Text style={styles.modalText}>Longitude: {location.longitude}</Text>
                  <TouchableOpacity onPress={() => setDetails(false)} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </Modal>) : null}
              <TouchableOpacity onPress={fetchLocation} style={styles.refreshIcon}>
                <Icon name="refresh" size={30} color="#000" />
              </TouchableOpacity>

              <TouchableOpacity onPress={getDirections} style={styles.directionsIcon}>
                <Icon name="navigate" size={30} color="white" />
              </TouchableOpacity>

              <TouchableOpacity onPress={toggleMapType} style={styles.toggleMapTypeIcon}>
                <Icon name={mapType === 'standard' ? "earth" : "map"} size={30} color="#000" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.userIcon} onPress={handleUserDetails}>
                <Icon name="person" size={30} color="#000" />
              </TouchableOpacity>
              {details && (
                <UserDets details={details} setDetails={setDetails} onClose={() => setDetails(false)} latitude={location.latitude} longitude={location.longitude} />
              )}
            </>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
  },
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  map: {
    marginTop: 40,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  modalContent: {
    backgroundColor: 'white',
    paddingBottom: 10,
    borderRadius: 15,
    alignItems: 'center',
  },
  refreshIcon: {
    position: 'absolute',
    top: 40,
    right: 10,
    margin: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    elevation: 2,
  },
  directionsIcon: {
    position: 'absolute',
    top: 100,
    right: 10,
    margin: 10,
    backgroundColor: '#1FA5DE',
    padding: 10,
    borderRadius: 50,
    elevation: 2,
  },
  toggleMapTypeIcon: {
    position: 'absolute',
    top: 160,
    right: 10,
    margin: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    elevation: 2,
  },
  userIcon: {
    position: 'absolute',
    top: 40,
    left: 10,
    margin: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    elevation: 2,
  },
});