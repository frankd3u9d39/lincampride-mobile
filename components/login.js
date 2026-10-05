import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const LoginScreen = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !email.includes('@') || !email.includes('.')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      Alert.alert('Invalid Password', 'Password must be at least 6 characters.');
      return;
    }

    onLoginSuccess(email);
    Alert.alert('Login Successful ✅', `Welcome, ${email.split('@')[0]}!`);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.brandBlock}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>L</Text>
        </View>
        <Text style={styles.brandName}>Lincampride</Text>
        <Text style={styles.brandTagline}>Campus rides, made simple</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue your journey</Text>

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#8A9A92"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter password"
            placeholderTextColor="#8A9A92"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.toggleText}>{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        </View>

        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Text style={styles.footer}>
          Don't have an account? <Text style={styles.link}>Sign Up</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1e001ff',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  brandBlock: {
    alignItems: 'center',
    marginBottom: 22,
  },
  logoCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#D9F5E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  logoText: {
    color: '#d1e001ff',
    fontSize: 32,
    fontWeight: '900',
  },
  brandName: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '800',
  },
  brandTagline: {
    color: '#D9F5E6',
    fontSize: 13,
    marginTop: 3,
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 7,
  },
  title: {
    fontSize: 27,
    fontWeight: '800',
    color: '#17352A',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#718078',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 22,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#355247',
    marginBottom: 7,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#CFE0D7',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 15,
    color: '#17352A',
    backgroundColor: '#F7FBF8',
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CFE0D7',
    borderRadius: 12,
    backgroundColor: '#F7FBF8',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 15,
    color: '#17352A',
  },
  toggleButton: {
    paddingHorizontal: 14,
    height: 50,
    justifyContent: 'center',
  },
  toggleText: {
    color: '#d1e001ff',
    fontWeight: '800',
  },
  button: {
    backgroundColor: '#d1e001ff',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#07552E',
    opacity: 0.92,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
  },
  footer: {
    textAlign: 'center',
    marginTop: 18,
    color: '#718078',
    fontSize: 13,
  },
  link: {
    color: '#d1e001ff',
    fontWeight: '800',
  },
});

export default LoginScreen;
