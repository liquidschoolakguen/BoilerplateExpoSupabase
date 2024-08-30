import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import Button from '@/components/Button';
import { Link, Redirect} from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';
import ButtonRed from '@/components/ButtonRed';



const LandingPage = () => {
  const { session, loading, isAdmin } = useAuth();

  if (loading) {
    return <ActivityIndicator />
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }


  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>


      <ButtonRed  onPress={() => supabase.auth.signOut()} text="Sign out" />
    </View>
  );
};

export default LandingPage;
