import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { Link, Stack } from 'expo-router';
import { supabase } from '@/lib/supabase';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [triggerSignIn, setTriggerSignIn] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) Alert.alert('Error', 'fff: ' + error.message);
    setLoading(false);
  }

  useEffect(() => {
    if (triggerSignIn) {
      signInWithEmail();
      setTriggerSignIn(false);
    }
  }, [email, password, triggerSignIn]);

  const quickLogin = (quickEmail: string, quickPassword: string) => {
    setEmail(quickEmail);
    setPassword(quickPassword);
    setTriggerSignIn(true);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Sign in' }} />
      <Button onPress={() => quickLogin('1234567887654321@gmail.com', '12345678')} disabled={loading} text="Quick ADMIN" />
      <Button onPress={() => quickLogin('U@web.de', '111111')} disabled={loading} text="Quick USER" />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
        secureTextEntry
      />

      <Button onPress={signInWithEmail} disabled={loading} text={loading ? "Signing in..." : "Sign in"} />


      <Link href="/sign-up" style={styles.textButton}>
        Create an account
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default SignInScreen;
