import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from './CustomAlert';
import loginImage from "../assets/loginGIF.gif";
export default function LoginScreen({ onNavigateToRegister, fetchLocation, setIsLoggedIn }) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isAlertVisible, setAlertVisible] = useState(false);
  const handleLogin = async () => {
    if (mobileNumber.length !== 10 || !/^[6-9]/.test(mobileNumber)) {
      setAlertVisible(true); // Show the custom alert
      return;
    } else {
      try {
        const response = await fetch(`http://192.168.109.103:5000/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ emailOrMobile: mobileNumber, password: password })
        });
        const json = await response.json();
        if (json.token) {
          await AsyncStorage.setItem('userToken', json.token);
          setIsLoggedIn(true);
          fetchLocation(); // Fetch location after successful login
          ToastAndroid.show('User Logged in Successfully.', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Invalid Credentials', ToastAndroid.LONG);
        }
      } catch (error) {
        ToastAndroid.show('Internal Server Error', ToastAndroid.LONG);
        console.error(error);
      };
    }
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={loginImage} // Replace with your image URL
          style={styles.image}
        />
      </View>
      <Text style={styles.heading}>Let's sign you in.</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.countryCode}>+91</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your mobile number"
          keyboardType="numeric"
          maxLength={10}
          onChangeText={(text) => {
            // Allow only digits and ensure the number is valid
            if (/^\d*$/.test(text) && text.length <= 10) {
              // Allow first digit to be anything but validate on login
              setMobileNumber(text);
            }
          }}
          value={mobileNumber}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="*******************"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <CustomAlert isVisible={isAlertVisible} onClose={() => setAlertVisible(false)} />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={onNavigateToRegister}>
        <Text style={styles.buttonText}>New User? Register Here</Text>
      </TouchableOpacity>
      <Text style={{ textAlign: 'center', fontSize: 12, color: '#8e75e4' }}>Having Problem? Feel free to Contact @ sharemateofficial@gmail.com</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 325, // Set the desired width
    height: 200, // Set the desired height
    resizeMode: 'contain',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    maxWidth: "90%",
  },
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    borderRadius: 10,
    backgroundColor: "#FCFEFC",
    shadowColor: "#8e75e4",
    shadowOffset: { width: 5, height: 2 },
    shadowRadius: 4,
    elevation: 20,
  },
  heading: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
    color: "#130c6b",
    fontWeight: "bold"
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    paddingLeft: 15,
    padding: 5,
    marginBottom: 10,
  },
  countryCode: {
    fontSize: 18,
    marginLeft: 4,
  },
  input: {
    flex: 1,
    fontSize: 18,
    padding: 10,
  },
  button: {
    backgroundColor: '#3466FC', // Button background color
    padding: 15,
    borderRadius: 50,
    width: 260,
    alignItems: 'center',
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: '#002C5C', // Button background color
    padding: 15,
    borderRadius: 50,
    width: 260,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
