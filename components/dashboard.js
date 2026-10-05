import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const DashboardScreen = ({ userName, onGoToProfile, onLogout, onFindRide }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.smallTitle}>LINCAMPRIDE</Text>
          <Text style={styles.dashboardTitle}>Dashboard</Text>
        </View>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>🚗</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.welcomeCard}>
          <Text style={styles.greeting}>Hello, {userName || 'Guest'}!</Text>
          <Text style={styles.welcomeText}>Welcome to Lincampride 🚀</Text>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={onFindRide}>
          <View style={styles.iconBox}><Text>🔎</Text></View>
          <View style={styles.buttonCopy}>
            <Text style={styles.primaryText}>Find a Ride</Text>
            <Text style={styles.secondaryText}>View available campus rides</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={onGoToProfile}>
          <View style={styles.iconBoxLight}><Text>👤</Text></View>
          <View style={styles.buttonCopy}>
            <Text style={styles.secondaryButtonTitle}>Go to Profile</Text>
            <Text style={styles.secondaryButtonSub}>View your profile</Text>
          </View>
          <Text style={styles.arrowGreen}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F8F4' },
  header: {
    backgroundColor: '#d1e001ff',
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  smallTitle: { color: '#BDE8D0', fontSize: 11, fontWeight: '800', letterSpacing: 2 },
  dashboardTitle: { color: '#fff', fontSize: 27, fontWeight: '800', marginTop: 4 },
  headerBadge: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: '#D9F5E6',
    alignItems: 'center', justifyContent: 'center',
  },
  headerBadgeText: { fontSize: 22 },
  content: { flex: 1, padding: 20, justifyContent: 'center' },
  welcomeCard: {
    backgroundColor: '#fff', borderRadius: 20, padding: 22, marginBottom: 18,
    borderWidth: 1, borderColor: '#DCEBE2',
  },
  greeting: { fontSize: 28, fontWeight: '800', color: '#17352A' },
  welcomeText: { fontSize: 15, color: '#6B7E75', marginTop: 6 },
  primaryButton: {
    backgroundColor: '#d1e001ff', borderRadius: 17, padding: 15, flexDirection: 'row',
    alignItems: 'center', marginBottom: 12,
  },
  iconBox: { width: 44, height: 44, borderRadius: 13, backgroundColor: '#D9F5E6', alignItems: 'center', justifyContent: 'center' },
  buttonCopy: { flex: 1, marginLeft: 13 },
  primaryText: { color: '#fff', fontSize: 17, fontWeight: '800' },
  secondaryText: { color: '#C9EAD7', fontSize: 12, marginTop: 2 },
  arrow: { color: '#fff', fontSize: 30, fontWeight: '300' },
  secondaryButton: {
    backgroundColor: '#fff', borderRadius: 17, padding: 15, flexDirection: 'row',
    alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#DCEBE2',
  },
  iconBoxLight: { width: 44, height: 44, borderRadius: 13, backgroundColor: '#EAF6EF', alignItems: 'center', justifyContent: 'center' },
  secondaryButtonTitle: { color: '#17352A', fontSize: 17, fontWeight: '800' },
  secondaryButtonSub: { color: '#718078', fontSize: 12, marginTop: 2 },
  arrowGreen: { color: '#d1e001ff', fontSize: 30, fontWeight: '300' },
  logoutButton: { paddingVertical: 14, alignItems: 'center', marginTop: 4 },
  logoutText: { color: '#C0392B', fontSize: 15, fontWeight: '700' },
});

export default DashboardScreen;
