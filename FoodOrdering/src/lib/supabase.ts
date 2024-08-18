import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/database.types';

const MAX_STORAGE_SIZE = 2048;

const ExpoSecureStoreAdapter = {
  getItem: async (key: string) => {
    const partCount = await SecureStore.getItemAsync(`${key}_partCount`);
    if (!partCount) {
      return null;
    }

    const totalParts = parseInt(partCount, 10);
    let fullString = '';

    for (let i = 0; i < totalParts; i++) {
      const partValue = await SecureStore.getItemAsync(`${key}_part${i}`);
      if (partValue) {
        fullString += partValue;
      }
    }

    return fullString;
  },

  setItem: async (key: string, value: string) => {
    const parts = Math.ceil(value.length / MAX_STORAGE_SIZE);

    for (let i = 0; i < parts; i++) {
      const partValue = value.substring(i * MAX_STORAGE_SIZE, (i + 1) * MAX_STORAGE_SIZE);
      await SecureStore.setItemAsync(`${key}_part${i}`, partValue);
    }

    await SecureStore.setItemAsync(`${key}_partCount`, parts.toString());
  },

  removeItem: async (key: string) => {
    const partCount = await SecureStore.getItemAsync(`${key}_partCount`);
    if (!partCount) {
      return;
    }

    const totalParts = parseInt(partCount, 10);
    for (let i = 0; i < totalParts; i++) {
      await SecureStore.deleteItemAsync(`${key}_part${i}`);
    }

    await SecureStore.deleteItemAsync(`${key}_partCount`);
  },
};


const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL||'';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON||'';



export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
