import { Text, FlatList, ActivityIndicator } from 'react-native'
import OrderListItem from '@/components/OrderListItem';
import { useMyOrderList } from '@/api/orders';



export default function OrdersScreen() {

  const {data: orders, isLoading, error} = useMyOrderList();

  if(isLoading) {
    return <ActivityIndicator />

  }

  if(error) {
    return <Text>Failes to fetch</Text>
  }

  return (

      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />

  );
}
