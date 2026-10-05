import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// ----- IMPORTS -----
import LoginScreen from './components/login';
import { ProfileCard } from './components/profilecard';
import DashboardScreen from './components/dashboard';
import BookRideScreen from './components/BookRideScreen';
import FindRideScreen from './screens/FindRideScreen'; // ✅ NEW

export default function App() {
  const [screen, setScreen] = useState('splash');
  const [userName, setUserName] = useState('');
  const [selectedRide, setSelectedRide] = useState(null); // For passing ride data

  // ----- SPLASH SCREEN LOGIC -----
  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('login');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // ----- LOGIN SUCCESS HANDLER -----
  const handleLoginSuccess = (email) => {
    const name = email.split('@')[0];
    setUserName(name);
    setScreen('dashboard');
  };

  // ----- LOGOUT HANDLER -----
  const handleLogout = () => {
    setScreen('login');
  };

  // ----- BOOK RIDE HANDLER (from FindRideScreen) -----
  const handleBookRide = (ride) => {
    setSelectedRide(ride);
    setScreen('bookRide');
  };

  // ============================================================
  // SCREEN 1: SPLASH
  // ============================================================
  if (screen === 'splash') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lincampride!</Text>
        <Text style={styles.subtitle}>campus rides, made simple</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  // ============================================================
  // SCREEN 2: LOGIN
  // ============================================================
  if (screen === 'login') {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  // ============================================================
  // SCREEN 3: DASHBOARD
  // ============================================================
  if (screen === 'dashboard') {
    return (
      <DashboardScreen
        userName={userName}
        onGoToProfile={() => setScreen('profile')}
        onLogout={handleLogout}
        onFindRide={() => setScreen('findRide')}  // ✅ NEW
      />
    );
  }

  // ============================================================
  // SCREEN 4: FIND RIDE (NEW)
  // ============================================================
  if (screen === 'findRide') {
    return (
      <FindRideScreen
        onGoBack={() => setScreen('dashboard')}
        onBookRide={handleBookRide}
      />
    );
  }

  // ============================================================
  // SCREEN 5: BOOK RIDE
  // ============================================================
  if (screen === 'bookRide') {
    return (
      <BookRideScreen
        onGoBack={() => setScreen('findRide')}  // Go back to FindRide
        selectedRide={selectedRide}              // Pass the selected ride data
      />
    );
  }

  // ============================================================
  // SCREEN 6: PROFILE
  // ============================================================
  return (
    <View style={styles.profileContainer}>
      <ProfileCard
        name="Daniel King "
        title="Founder, Lincampride"
        avatar={require('./assets/profile.jpg')}
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setScreen('dashboard')}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

// ============================================================
// STYLES
// ============================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1e001ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 30,
  },
  profileContainer: {
    flex: 1,
    backgroundColor: '#d1e001ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
  },
  backButtonText: {
    color: '#d1e001ff',
    fontWeight: '600',
    fontSize: 16,
  },
});