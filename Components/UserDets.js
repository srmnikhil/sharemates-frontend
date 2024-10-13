import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { FontAwesome } from '@expo/vector-icons';
import Battery from "./Battery";
import Network from "./Network";
const UserDets = ({ details, onClose, latitude, longitude }) => {
    const [address, setAddress] = useState('');
    const getAddressFromCoordinates = async (latitude, longitude) => {
        const apiKey = 'pk.0b751818c95090760ba35b90c4ecdf07'; // Replace with your LocationIQ API key
        const url = `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`;
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.display_name) {
                const address = data.display_name; // The full address in a readable format
                console.log('Address:', address);
                setAddress(address); 
            } else {
                console.error('No address found for the given coordinates.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        // Fetch the address when the component mounts or when latitude/longitude change
        if (latitude && longitude) {
            getAddressFromCoordinates(latitude, longitude);
        }
    }, [latitude, longitude]);

    return (
        <Modal isVisible={details} onBackdropPress={onClose}>
            <View style={styles.modalContent}>
                <View style={{ alignItems: 'center' }} >
                    <Text style={styles.headText}>Nikhil Sharma</Text>
                    <Text style={styles.smallText}>Updated Today</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome name='map-pin' style={{ fontSize: 20, color: "#C90101" }} />
                        <Text style={styles.mainText}>{address ? address : 'Loading address...'}
                        </Text>
                    </View>
                    <Battery />
                    <Network />
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
    headText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "#2E59D7",
        textAlign: "center",
        width: '90%', // Add this line to set the width to 100%
    },
    smallText: {
        width: '90%',
        color: "#CCCCCC",
        fontSize: 16,
    },
    mainText: {
        width: '90%',
        fontSize: 18,
        textAlign: "center",
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

export default UserDets;
