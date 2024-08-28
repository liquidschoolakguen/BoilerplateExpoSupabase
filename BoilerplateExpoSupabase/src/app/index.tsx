import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';
import ButtonRed from '@/components/ButtonRed';


// das hier scheint der Startpunkt zu sein
const index = () => {


  const { session, loading, isAdmin } = useAuth();

  //console.log('________Beginn');
  if (loading) {
    //console.log('loading...');
    return <ActivityIndicator />
  }
    //console.log('loading beendet ');

  if (!session) {
    //console.log('session nicht vorhanden');
    //console.log('_______________________');
    return <Redirect href="/sign-in" />;
  }
   // console.log('session vorhanden');
  if (!isAdmin) {
    //console.log('kein Admin');
   // console.log('_______________________');
    return <Redirect href="/landing-page" />;

  }
   // console.log('Admin');
   // console.log('_______________________');
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10, backgroundColor: '#92a8d1' }}>
     <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>


      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />

      </Link>


      <ButtonRed  onPress={() => supabase.auth.signOut()} text="Sign out" />
    </View>
  );
};

export default index;
