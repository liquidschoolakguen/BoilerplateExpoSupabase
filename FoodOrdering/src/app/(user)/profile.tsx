import { View, Text } from 'react-native'
import React from 'react'
import { supabase } from '@/lib/supabase'
import ButtonRed from '@/components/ButtonRed';
const ProfileScreen = () => {
  return (
    <View  style={{ flex: 1, justifyContent: 'center', padding: 10, }}>


      <ButtonRed text="Sign out" onPress={async () => await supabase.auth.signOut()} />
    </View>
  )
}

export default ProfileScreen
