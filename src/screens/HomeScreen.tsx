import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('RoomList')}
      >
        Book a Room
      </Button>

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('MyReservations')}
      >
        My Reservations
      </Button>

      <Button
        mode="outlined"
        style={styles.button}
        onPress={() => navigation.navigate('Cancellation')}
      >
        Cancel Reservation
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  button: {
    marginVertical: 8,
  },
}); 