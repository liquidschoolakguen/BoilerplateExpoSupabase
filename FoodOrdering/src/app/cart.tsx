import React from 'react';
import { View, StyleSheet, Platform, FlatList, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useCart } from '@/providers/CartProvider';
import CartListItem from '@/components/CartListItem';
import Button from '@/components/Button';


const CartScreen = () => {
  const router = useRouter();
  const { items, total } = useCart();

  return (
    <View style={{padding: 10}}    >
      <FlatList data={items} renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10}}
         />
      <Text style={{marginTop: 20, fontSize: 20, fontWeight: '500'}}>${total.toFixed(2)}</Text>
      <Button text="Checkout" onPress={() => router.push('/checkout')} />

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
