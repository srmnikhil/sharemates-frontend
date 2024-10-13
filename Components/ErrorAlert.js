import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import errorGif from "../assets/error.gif";

const ErrorAlert = ({ error, onClose }) => {
  return (
    <Modal isVisible={error} onBackdropPress={onClose}>
      <View style={styles.modalContent}>
        <Image source={errorGif} style={{ width: 100, height: 100 }} />
        <Text style={styles.alertText}>
          No Field should remains blank. Please fill all the fields.
        </Text>
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

export default ErrorAlert;
