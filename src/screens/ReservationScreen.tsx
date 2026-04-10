import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Title, Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

type ReservationScreenProps = {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any, 'Reservation'>;
};

// Generate a random reference number
const generateReferenceNumber = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${timestamp}${random}`;
};

export default function ReservationScreen({ navigation, route }: ReservationScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const handleReservation = async () => {
    if (!name || !email) {
      setMessage('Please fill in all fields');
      setVisible(true);
      return;
    }

    const referenceNumber = generateReferenceNumber();
    
    try {
      // Get existing reservations
      const existingReservations = await AsyncStorage.getItem('reservations');
      const reservations = existingReservations ? JSON.parse(existingReservations) : [];

      // Add new reservation
      const newReservation = {
        id: Date.now().toString(),
        name,
        email,
        roomId: route.params?.roomId,
        date: route.params?.date,
        referenceNumber,
      };

      // Save updated reservations
      await AsyncStorage.setItem(
        'reservations',
        JSON.stringify([...reservations, newReservation])
      );

      setMessage(`Reservation successful! Your reference number is: ${referenceNumber}`);
      setVisible(true);

      setTimeout(() => {
        navigation.navigate('Home');
      }, 3000);
    } catch (error) {
      setMessage('Error saving reservation. Please try again.');
      setVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Title>Complete Your Reservation</Title>
      
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />

      <Button mode="contained" onPress={handleReservation} style={styles.button}>
        Confirm Reservation
      </Button>

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={3000}
      >
        {message}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginVertical: 8,
  },
  button: {
    marginTop: 16,
  },
}); 