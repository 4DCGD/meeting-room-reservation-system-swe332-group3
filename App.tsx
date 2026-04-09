import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from './src/screens/HomeScreen';
import RoomListScreen from './src/screens/RoomListScreen';
import ReservationScreen from './src/screens/ReservationScreen';
import CancellationScreen from './src/screens/CancellationScreen';
import MyReservationsScreen from './src/screens/MyReservationsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'RESRV - Meeting Room Reservation' }}
          />
          <Stack.Screen
            name="RoomList"
            component={RoomListScreen}
            options={{ title: 'Available Rooms' }}
          />
          <Stack.Screen
            name="Reservation"
            component={ReservationScreen}
            options={{ title: 'Make Reservation' }}
          />
          <Stack.Screen
            name="Cancellation"
            component={CancellationScreen}
            options={{ title: 'Cancel Reservation' }}
          />
          <Stack.Screen
            name="MyReservations"
            component={MyReservationsScreen}
            options={{ title: 'My Reservations' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
} 