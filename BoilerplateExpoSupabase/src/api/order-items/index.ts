
import { supabase } from '@/lib/supabase';
import { InsertTables } from '@/types';
import { useMutation} from '@tanstack/react-query';




export const useInsertOrderItems = () => {


  return useMutation({
    async mutationFn(items: InsertTables<'order_items'>[]) {
      const { error, data: newProduct } = await supabase
      .from('order_items')
      .insert(items)//hintere variable überschreibt die user_id von data
      .select();

      if (error) {
        throw error;
      }

      return newProduct;
    },


  });
};
