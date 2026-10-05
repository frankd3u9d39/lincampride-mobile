import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SeatSelector = ({ farePerSeat = 100, onSeatChange }) => {
  const [seats, setSeats] = useState(1);

  const incrementSeats = () => {
    setSeats(prev => prev + 1);
    if (onSeatChange) onSeatChange(seats + 1);
  };

  const decrementSeats = () => {
    if (seats > 1) {
      setSeats(prev => prev - 1);
      if (onSeatChange) onSeatChange(seats - 1);
    }
  };

  const totalFare = seats * farePerSeat;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Number of Seats</Text>

      <View style={styles.counterRow}>
        <TouchableOpacity style={styles.button} onPress={decrementSeats}>
          <Text style={styles.buttonText}>−</Text>
        </TouchableOpacity>

        <Text style={styles.count}>{seats}</Text>

        <TouchableOpacity style={styles.button} onPress={incrementSeats}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fareContainer}>
        <Text style={styles.fareLabel}>Total Fare</Text>
        <Text style={styles.fareValue}>₦{totalFare}</Text>
        <Text style={styles.fareDetail}>
          (₦{farePerSeat} × {seats} {seats === 1 ? 'seat' : 'seats'})
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 12,
    textAlign: 'center',
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#d1e001ff',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '300',
  },
  count: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginHorizontal: 30,
    minWidth: 40,
    textAlign: 'center',
  },
  fareContainer: {
    backgroundColor: '#F4FAF6',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  fareLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  fareValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#d1e001ff',
  },
  fareDetail: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});

export default SeatSelector;