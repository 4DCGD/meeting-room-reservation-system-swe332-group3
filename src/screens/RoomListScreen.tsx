import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Card, Title, Paragraph, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RoomListScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

// Mock room data
const rooms = [
  { id: 1, name: 'Room A', capacity: 20 },
  { id: 2, name: 'Room B', capacity: 50 },
  { id: 3, name: 'Room C', capacity: 100 },
];

export default function RoomListScreen({ navigation }: RoomListScreenProps) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCapacity, setSelectedCapacity] = useState('20');

  const filteredRooms = rooms.filter(
    room => room.capacity >= parseInt(selectedCapacity)
  );

  const handleRoomSelect = (roomId: number) => {
    navigation.navigate('Reservation', {
      roomId,
      date: date.toISOString(),
    });
  };

  return (
    <View style={styles.container}>
      <Button onPress={() => setShowDatePicker(true)}>
        Select Date: {date.toLocaleDateString()}
      </Button>
      
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}

      <TextInput
        label="Minimum Capacity"
        value={selectedCapacity}
        onChangeText={setSelectedCapacity}
        keyboardType="numeric"
        style={styles.input}
      />

      <ScrollView style={styles.roomList}>
        {filteredRooms.map(room => (
          <Card
            key={room.id}
            style={styles.card}
            onPress={() => handleRoomSelect(room.id)}
          >
            <Card.Content>
              <Title>{room.name}</Title>
              <Paragraph>Capacity: {room.capacity} people</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
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
  roomList: {
    marginTop: 16,
  },
  card: {
    marginBottom: 8,
  },
}); 