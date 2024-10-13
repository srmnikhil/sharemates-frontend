import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import errorGif from "../assets/error.gif";
import winking from "../assets/winking.gif";

const CustomAlert = ({ isVisible, onClose }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContent}>
        <Image source={errorGif} style={{ width: 100, height: 100 }} />
        <Text style={styles.alertText}>
          Please enter a valid 10-digit mobile number {'\n'}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, }}>
          <Image source={winking} style={{ width: 35, height: 35 }} />
          <Text style={styles.hintText}>Hint: starting with 6 and onwards.</Text>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.button} accessibilityLabel="Close Alert" accessibilityRole="button">
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    paddingBottom: 10,
    borderRadius: 15,
    alignItems: 'center',
  },
  alertText: {
    fontSize: 20,
    textAlign: "left",
    width: '90%', // Add this line to set the width to 100%
    marginBottom: -25
  },
  hintText: {
    width: '90%',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "left",
    fontStyle: 'italic',
  },
  button: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CustomAlert;
