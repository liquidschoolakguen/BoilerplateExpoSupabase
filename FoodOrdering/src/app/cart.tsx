import React from 'react';
import { View, StyleSheet, Platform, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useCart } from '@/providers/CartProvider';
import CartListItem from '@/components/CartListItem';


const CartScreen = () => {
  const router = useRouter();
  const { items } = useCart();

  return (
    <View style={styles.container}>
      <FlatList data={items} renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
         />


      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'flex-end',
    margin: 0,
    backgroundColor: 'blue',
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    padding: 22,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default CartScreen;
