import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type MyReservationsScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

type Reservation = {
  id: string;
  name: string;
  email: string;
  roomId: number;
  date: string;
  referenceNumber: string;
};

export default function MyReservationsScreen({ navigation }: MyReservationsScreenProps) {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      const savedReservations = await AsyncStorage.getItem('reservations');
      if (savedReservations) {
        setReservations(JSON.parse(savedReservations));
      }
    } catch (error) {
      console.error('Error loading reservations:', error);
    }
  };

  const handleCancelReservation = async (referenceNumber: string) => {
    try {
      const updatedReservations = reservations.filter(
        res => res.referenceNumber !== referenceNumber
      );
      await AsyncStorage.setItem('reservations', JSON.stringify(updatedReservations));
      setReservations(updatedReservations);
    } catch (error) {
      console.error('Error canceling reservation:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>My Reservations</Title>
      {reservations.length === 0 ? (
        <Paragraph style={styles.noReservations}>
          You don't have any reservations yet.
        </Paragraph>
      ) : (
        reservations.map((reservation) => (
          <Card key={reservation.referenceNumber} style={styles.card}>
            <Card.Content>
              <Title>Room {reservation.roomId}</Title>
              <Paragraph>Name: {reservation.name}</Paragraph>
              <Paragraph>Date: {new Date(reservation.date).toLocaleDateString()}</Paragraph>
              <Paragraph>Reference: {reservation.referenceNumber}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button 
                mode="contained" 
                onPress={() => handleCancelReservation(reservation.referenceNumber)}
                style={styles.cancelButton}
              >
                Cancel Reservation
              </Button>
            </Card.Actions>
          </Card>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  noReservations: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 8,
  },
}); 