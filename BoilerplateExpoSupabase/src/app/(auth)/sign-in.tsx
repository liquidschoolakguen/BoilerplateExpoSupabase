import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { Link, Stack } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useTranslation } from 'react-i18next';


const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [triggerSignIn, setTriggerSignIn] = useState(false);

  const { t } = useTranslation();

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
      <Stack.Screen options={{ title: t('user_account.sign_in')}} />

      <Button onPress={() => quickLogin('U@web.de', '111111')} disabled={loading} text="Quick USER Login" />

      <Button onPress={() => quickLogin('1234567887654321@gmail.com', '12345678')} disabled={loading} text="Quick ADMIN Login" />

      <Text style={styles.label}>{t('extra.email_adress')}</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder={t('extra.placeholder_email_adress')}
        style={styles.input}
        autoCapitalize='none'
      />

      <Text style={styles.label}>{t('extra.password')}</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
        secureTextEntry
      />

      <Button onPress={signInWithEmail} disabled={loading} text={loading ? t('user_account.signing_in...'): t('user_account.sign_in')} />


      <Link href="/sign-up" style={styles.textButton}>
      {t('user_account.create_account')}
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
