import { supabase } from '@/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useInsertOrderListener = () => {

  const queryClient = useQueryClient();

  useEffect(() => {
    //console.log(orders);


    const ordersSubscription = supabase.channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          console.log('Change received!', payload)
          queryClient.invalidateQueries(  { queryKey: ['orders'] }) ;
        }
      )
      .subscribe()


      //return wird ausgeführt wenn die Komponente unmounted wird. Unmounted bedeutet, dass die Komponente nicht mehr gerendert wird.
      return () => {
        ordersSubscription.unsubscribe();
      }


  }, []);
}


export const useUpdateOrderListener = (id: number) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const orders = supabase
      .channel('custom-filter-channel')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${id}`,
        },
        (payload) => {
            queryClient.invalidateQueries(  { queryKey: ['orders', id] }) ;
        }
      )
      .subscribe();

    return () => {
      orders.unsubscribe();
    };
  }, []);
}
