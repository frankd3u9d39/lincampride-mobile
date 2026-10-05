import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

/**
 * Mock data – this will be replaced with API data later
 */
const MOCK_RIDES = [
  {
    id: '1',
    driver: 'Obi james',
    from: 'Campus Gate',
    to: 'City Mall',
    time: '09:35 AM',
    seats: 1,
    fare: 500,
  },
  {
    id: '2',
    driver: 'Lucky Smith',
    from: 'Hostel B',
    to: 'Market Square',
    time: '02:15 AM',
    seats: 3,
    fare: 400,
  },
  {
    id: '3',
    driver: 'Johnson',
    from: 'Library',
    to: 'Bus Terminal',
    time: '01:00 PM',
    seats: 2,
    fare: 420,
  },
  {
    id: '4',
    driver: 'Favour Obi',
    from: 'Faculty of Science',
    to: 'Shopping Complex',
    time: '4:30 PM',
    seats: 2,
    fare: 480,
  },
  {
    id: '5',
    driver: 'Joy Ojo',
    from: 'Student Center',
    to: 'Train Station',
    time: '09:55 PM',
    seats: 3,
    fare: 520,
  },
];

const FindRideScreen = ({ onGoBack, onBookRide }) => {
  // ----- STATE -----
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);

  // ----- LOAD MOCK DATA (simulates API call) -----
  const loadRides = () => {
    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      setRides(MOCK_RIDES);
      setLoading(false);
    }, 1500);
  };

  // ----- REFRESH HANDLER -----
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRides(MOCK_RIDES);
      setRefreshing(false);
    }, 1500);
  };

  // ----- BOOK RIDE HANDLER -----
  const handleBookRide = (ride) => {
    setSelectedRide(ride);
    // Navigate to Book Ride screen with the selected ride data
    onBookRide(ride);
  };

  // ----- LOAD DATA ON MOUNT -----
  useEffect(() => {
    loadRides();
  }, []);

  // ============================================================
  // RENDER: LOADING STATE
  // ============================================================
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#d1e001ff" />
          <Text style={styles.loadingText}>Finding available rides...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ============================================================
  // RENDER: EMPTY STATE (No rides available)
  // ============================================================
  if (rides.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.emptyIcon}>🚗</Text>
          <Text style={styles.emptyTitle}>No Rides Available</Text>
          <Text style={styles.emptySubtitle}>
            Check back later or try a different route.
          </Text>
          <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
            <Text style={styles.refreshButtonText}>Refresh</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={onGoBack}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ============================================================
  // RENDER: SUCCESS STATE (List of rides)
  // ============================================================
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onGoBack} style={styles.headerBack}>
          <Text style={styles.headerBackText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Available Rides</Text>
        <View style={styles.headerSpacer} />
      </View>

      <FlatList
        data={rides}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        renderItem={({ item }) => (
          <View style={styles.rideCard}>
            {/* Driver Info */}
            <View style={styles.rideHeader}>
              <Text style={styles.driverName}>{item.driver}</Text>
              <View style={styles.seatsBadge}>
                <Text style={styles.seatsBadgeText}>{item.seats} seats</Text>
              </View>
            </View>

            {/* Route Info */}
            <View style={styles.routeContainer}>
              <View style={styles.routePoint}>
                <View style={styles.routeDotGreen} />
                <Text style={styles.routeText}>{item.from}</Text>
              </View>
              <View style={styles.routeLine} />
              <View style={styles.routePoint}>
                <View style={styles.routeDotRed} />
                <Text style={styles.routeText}>{item.to}</Text>
              </View>
            </View>

            {/* Ride Details */}
            <View style={styles.rideDetails}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>⏰ Time</Text>
                <Text style={styles.detailValue}>{item.time}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>💰 Fare</Text>
                <Text style={styles.detailValue}>₦{item.fare}</Text>
              </View>
            </View>

            {/* Book Ride Button */}
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => handleBookRide(item)}
            >
              <Text style={styles.bookButtonText}>Book This Ride</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Showing {rides.length} ride{rides.length > 1 ? 's' : ''} available
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

// ----- STYLES -----
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F8F4',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerBack: {
    padding: 4,
  },
  headerBackText: {
    fontSize: 16,
    color: '#d1e001ff',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  headerSpacer: {
    width: 50,
  },

  // List
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },

  // Loading State
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },

  // Empty State
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  refreshButton: {
    backgroundColor: '#d1e001ff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 10,
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  backButtonText: {
    color: '#666',
    fontSize: 16,
  },

  // Ride Card
  rideCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  driverName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  seatsBadge: {
    backgroundColor: '#d1e001ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  seatsBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  // Route
  routeContainer: {
    marginBottom: 12,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  routeDotGreen: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#518f1fff',
    marginRight: 10,
  },
  routeDotRed: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e74c3c',
    marginRight: 10,
  },
  routeText: {
    fontSize: 14,
    color: '#333',
  },
  routeLine: {
    width: 2,
    height: 10,
    backgroundColor: '#ddd',
    marginLeft: 4,
    marginVertical: 2,
  },

  // Details
  rideDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
    marginBottom: 12,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
  },

  // Book Button
  bookButton: {
    backgroundColor: '#d1e001ff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});

export default FindRideScreen;