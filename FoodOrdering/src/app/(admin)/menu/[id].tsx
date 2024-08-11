import { Link, router, Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Image, Pressable, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { defaultPizzaImage } from '@components/ProductListItem';
import products from '@assets/data/products';
import Button from '@components/Button';
import { useCart } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useProduct } from '@/api/products';


const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];


const ProductDetailsScreen = () => {
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);


    const { addItem } = useCart();
    //console.log('id A:', id);
    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

    const {
        data: product,
        isLoading,
        error,
      } = useProduct(id);

      if (isLoading) {
        return <ActivityIndicator />;
      }
      if (error || !product) {
        return <Text>Failed to fetch product</Text>;
      }
    //const product = products.find((p) => p.id.toString() === id);

    const addToCard = () => {
        if (!product) {
            console.log('Product not found');
            return;
        }
        //console.warn(product);
        //console.warn(selectedSize);
        addItem(product, selectedSize);
        router.push('/cart');
    }

    if (!product) {
        return <Text>Product not found</Text>;
    }


    return (
        <View style={styles.container}>

            <Stack.Screen options={{
                title: 'Menu',
                headerRight: () => (
                    //@ts-ignore
                    <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <FontAwesome
                                    name="pencil"
                                    size={25}
                                    color={Colors.light.tint}
                                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                />
                            )}
                        </Pressable>
                    </Link>
                ),
            }} />




            <Stack.Screen options={{ title: product.name }} />
            <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} />


            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>

        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        flex: 1,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    subtitle: {
        marginVertical: 10,
        fontWeight: '600',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',

    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    }


});




export default ProductDetailsScreen;
