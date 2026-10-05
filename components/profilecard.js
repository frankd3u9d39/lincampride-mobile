import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export const ProfileCard = ({ name, title, avatar }) => (
  <View style={styles.card}>
    <View style={styles.avatarRing}>
      <Image
        source={typeof avatar === 'string' ? { uri: avatar } : avatar}
        style={styles.avatar}
      />
    </View>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.titleText}>{title}</Text>
    <View style={styles.badge}><Text style={styles.badgeText}>Lincampride Member</Text></View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff', borderRadius: 24, padding: 28, alignItems: 'center',
    marginHorizontal: 20, borderWidth: 1, borderColor: '#DCEBE2',
  },
  avatarRing: {
    padding: 4, borderRadius: 56, backgroundColor: '#D9F5E6', marginBottom: 14,
  },
  avatar: { width: 96, height: 96, borderRadius: 48 },
  name: { fontSize: 21, fontWeight: '800', color: '#17352A', textAlign: 'center' },
  titleText: { fontSize: 14, color: '#667970', marginTop: 5 },
  badge: { backgroundColor: '#EAF6EF', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, marginTop: 14 },
  badgeText: { color: '#d1e001ff', fontSize: 12, fontWeight: '700' },
});
