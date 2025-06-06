import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useAuthStore } from '@/store/auth';
import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import api from '../../utils/api';

// Google Auth imports
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import DashboardScreen from '../(tabs)/index';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOTP] = useState('');
  const [error, setError] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const { login, isLoading } = useAuthStore();

  // Google Auth setup
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '44910573289-i1jacuj76s6ucco452t539ud2m62fgsm.apps.googleusercontent.com', // your client ID
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      handleGoogleLogin(id_token);
    }
  }, [response]);

  const handleGoogleLogin = async (token: string) => {
    try {
      const res = await api.post('/api/auth/google-login', { token });
      // Save tokens/user as needed (e.g., in your auth store)
      router.replace('/(tabs)'); // always go to dashboard after login
    } catch (err) {
      setError('Google login failed');
    }
  };

  const handleLogin = async () => {
    try {
      setError('');
      await login(email, password);
      router.replace('/(tabs)'); // always go to dashboard after login
    } catch (err: any) {
      if (err?.response?.status === 403) {
        setShowOTP(true);
        Alert.alert('OTP Sent', 'Please check your phone for the OTP.');
      } else {
        setError('Invalid email or password');
      }
    }
  };

  // const handleVerifyOTP = async () => {
  //   try {
  //     setError('');
  //     // Call backend to verify OTP
  //     const res = await api.post('/api/auth/verify-login-otp', { email, otp });
  //     // Save tokens/user as needed, then route
  //     // You may want to update your auth store here
  //     router.replace('/(tabs)');
  //   } catch (err) {
  //     setError('Invalid or expired OTP');
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg' }}
          style={styles.headerImage}
        />
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Track your expenses with ease</Text>
      </View>

      <View style={styles.form}>
        {!showOTP ? (
          <>
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              error={error}
            />
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
            />
            <Button
              title="Sign In"
              onPress={handleLogin}
              loading={isLoading}
            />
            <Button
              title="Sign in with Google"
              onPress={() => promptAsync()}
              disabled={!request}
            />
            <Link href="/register" asChild>
              <Button
                title="Create Account"
                variant="outline"
                onPress={() => {}}
              />
            </Link>
          </>
        ) : (
          <>
            <Input
              label="OTP"
              value={otp}
              onChangeText={setOTP}
              placeholder="Enter the OTP"
              error={error}
            />
            {/* <Button
              title="Verify OTP"
              // onPress={handleVerifyOTP}
              loading={isLoading}
            /> */}
            <Button
              title="Back to Login"
              variant="outline"
              onPress={() => setShowOTP(false)}
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 300,
    justifyContent: 'flex-end',
    padding: 24,
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.9,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#fff',
    opacity: 0.8,
  },
  form: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
});