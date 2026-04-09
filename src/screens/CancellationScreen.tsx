import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Title, Snackbar } from 'react-native-paper';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type CancellationScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export default function CancellationScreen({ navigation }: CancellationScreenProps) {
  const [referenceNumber, setReferenceNumber] = useState('');
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const handleCancellation = () => {
    if (!referenceNumber) {
      setMessage('Please enter a reference number');
      setVisible(true);
      return;
    }

    // In a real app, this would verify the reference number against a database
    setMessage('Reservation cancelled successfully');
    setVisible(true);

    setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Title>Cancel Reservation</Title>
      
      <TextInput
        label="Reference Number"
        value={referenceNumber}
        onChangeText={setReferenceNumber}
        style={styles.input}
      />

      <Button mode="contained" onPress={handleCancellation} style={styles.button}>
        Cancel Reservation
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