import { CartItem, Tables } from '@/types';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { randomUUID } from 'expo-crypto'
import { useInsertOrder } from '@/api/orders';
import { useRouter } from 'expo-router';
import { useInsertOrderItems } from '@/api/order-items';

type Product = Tables<'products'>;
type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem['size']) => void;
  updateQuantity: (itemId: string, action: -1 | 1) => void;
  total: number;
  checkout: () => void;
};
const CartContext = createContext<CartType>({
  items: [],
  addItem: () => { },
  updateQuantity: () => { },
  total: 0,
  checkout: () => { },
});

const CartProvider = ({ children }: PropsWithChildren) => {

  const [items, setItems] = useState<CartItem[]>([]);

  //const { mutate: insertOrder } = useInsertOrder();
  const router = useRouter();

  const object = useInsertOrder();
  const insertOrder = object.mutate;


  const object2 = useInsertOrderItems();
  const insertOrderItems = object2.mutate;

  /**
   * Adds an item to the cart.
   */
  const addItem = (product: Product, size: CartItem['size']) => {
    // Check if the item already exists in the cart
    const existingItem = items.find(
      (item) => item.product_id === product.id && item.size === size
    );

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };
    setItems([newCartItem, ...items]);
  }

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    setItems(
      items.map((item =>
        item.id !== itemId
          ? item
          : { ...item, quantity: item.quantity + amount })).filter((item) => item.quantity > 0)
    );


    //console.log('updateQuantity', itemId, amount);
  };

  //console.log(items);

  //const total =123;
  const total = items.reduce((acc, item) => acc += item.product.price * item.quantity, 0);


  const clearCart = () => {
    setItems([]);
  }


  const checkout = () => {
    //console.warn('checkout');

    insertOrder({ total: total }, {onSuccess: saveOrderItems});

  }


  const saveOrderItems = (order: Tables<'orders'>) => {

    const orderItems = items.map((cartItem) => ({
      order_id: order.id,
      product_id: cartItem.product_id,
      size: cartItem.size,
      quantity: cartItem.quantity
    })

    );

    insertOrderItems(orderItems, {
      onSuccess: () => {
        console.log(order);
        clearCart();
        router.push(`/(user)/orders/${order.id}`);
    }
  });


  }

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total, checkout }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
export const useCart = () => useContext(CartContext);
