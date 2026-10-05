import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import SeatSelector from './SeatSelector';

const BookRideScreen = ({ onGoBack, selectedRide }) => {
  const [selectedSeats, setSelectedSeats] = useState(1);
  const farePerSeat = selectedRide?.fare || 150;

  const handleSeatChange = (newSeatCount) => {
    setSelectedSeats(newSeatCount);
  };

  const handleBookRide = () => {
    alert(`Ride booked with ${selectedSeats} seat(s)! Total: ₦${selectedSeats * farePerSeat}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.screenTitle}>Book a Ride</Text>

        {selectedRide && (
          <View style={styles.rideInfo}>
            <Text style={styles.rideInfoText}>🚗 {selectedRide.driver}</Text>
            <Text style={styles.rideInfoText}>📍 {selectedRide.from} → {selectedRide.to}</Text>
            <Text style={styles.rideInfoText}>⏰ {selectedRide.time}</Text>
          </View>
        )}

        <SeatSelector
          farePerSeat={farePerSeat}
          onSeatChange={handleSeatChange}
        />

        <TouchableOpacity style={styles.bookButton} onPress={handleBookRide}>
          <Text style={styles.bookButtonText}>Confirm Booking</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={onGoBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F8F4',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a2e',
    textAlign: 'center',
    marginBottom: 4,
  },
  rideInfo: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  rideInfoText: {
    fontSize: 14,
    color: '#333',
    paddingVertical: 2,
  },
  bookButton: {
    backgroundColor: '#d1e001ff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default BookRideScreen;