import { ActivityIndicator, FlatList, Text } from 'react-native';
//import products from '@assets/data/products'; dummyData wird nicht mehr gebraucht,
//nachdem die Datenbank eingebunden wurde
import ProductListItem from '@components/ProductListItem';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { useProductList } from  '@/api/products';

export default function TabOneScreen() {


  // man kann die Daten von der Datenbank auch einfacher mit einem fetch in usteEffect abrufen.
  //useQuery ist aber eine bessere Lösung, da es die Daten automatisch aktualisiert,
  // wenn sie sich ändern und cached die Daten auch automatisch.
  const {data: products, error, isLoading} = useProductList();

  if(isLoading){
    return <ActivityIndicator></ActivityIndicator>
  }

  if(error){
    return <Text>Failed to fetch product</Text>
  }




  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}
