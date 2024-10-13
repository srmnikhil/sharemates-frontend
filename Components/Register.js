import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ToastAndroid } from 'react-native';
import ErrorAlert from './ErrorAlert';
import loginImage from "../assets/loginGIF.gif";
export default function RegisterScreen({ onNavigateToLogin }) {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleRegister = async () => {
    if (name.length < 3) {
      ToastAndroid.show('Name must have min 3 char.', ToastAndroid.LONG);
    } else if (mobileNumber.length < 10) {
      ToastAndroid.show('Please enter a valid mobile number', ToastAndroid.LONG);
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      ToastAndroid.show('Please enter a valid email', ToastAndroid.LONG);
    } else if (password.length < 6) {
      ToastAndroid.show('Password must have min 6 char.', ToastAndroid.LONG);
    } else {
      try {
        const response = await fetch(`http://192.168.109.103:5000/api/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, mobileNumber, password })
        });
        const json = await response.json();
        if (json.token) {
          ToastAndroid.show('User Registered Successfully.', ToastAndroid.LONG);
          onNavigateToLogin(); // Navigate back to login screen
        } else{
          ToastAndroid.show('User Already Exists with email or mobile number', ToastAndroid.LONG);
        }
      } catch (error) {
        ToastAndroid.show('Internal Server Error', ToastAndroid.LONG);
        console.error(error);
      }
    }
  }
  return (
    <View style={styles.loginContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={loginImage} // Replace with your image URL
          style={styles.image}
        />
      </View>
      <Text style={styles.heading}>Let's register you.</Text>
      <Text style={styles.info}>Please register using valid details to avoid permanent account suspension on ShareMate.</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your name here"

          onChangeText={(name) => { setName(name) }}
          value={name}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.countryCode}>+91</Text>
        <TextInput
          style={styles.input}
          placeholder="9876543210"
          keyboardType="numeric"
          maxLength={10}
          onChangeText={(mobile) => {
            // Allow only digits and ensure the number is valid
            if (/^\d*$/.test(mobile) && mobile.length <= 10) {
              // Allow first digit to be anything but validate on login
              setMobileNumber(mobile);
            }
          }}
          value={mobileNumber}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="example@email.com"
          onChangeText={(email) => { setEmail(email) }}
          value={email}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="*******************"
          secureTextEntry={true}
          onChangeText={(password) => { setPassword(password) }}
          value={password}
        />
      </View>
      <ErrorAlert error={error} onClose={() => setError(false)} />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signInButton} onPress={onNavigateToLogin}>
        <Text style={styles.buttonText}>Already User? Sign in Here</Text>
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
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    maxWidth: "90%",
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    color: "#130c6b",
    fontWeight: "bold"
  },
  info: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: "#F76464",
    fontStyle: "italic",
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    padding: 5,
    paddingLeft: 15,
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
  signInButton: {
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
