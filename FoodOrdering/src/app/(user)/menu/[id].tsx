import {Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Image, Pressable, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { defaultPizzaImage } from '@components/ProductListItem';
//import products from '@assets/data/products';
import Button from '@components/Button';
import { useCart } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';
import { useProduct } from '@/api/products';
import  RemoteImage  from '@/components/RemoteImage';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];


const ProductDetailsScreen = () => {
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

    const { data: product,isLoading, error,} = useProduct(id);


    const { addItem } = useCart();
    const router = useRouter();
    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');


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
            <Stack.Screen options={{ title: product.name }} />
            <RemoteImage path={ product.image} fallback={defaultPizzaImage} style={styles.image} />

            <Text > Select size</Text>
            <View style={styles.sizes} >
                {sizes.map((size) => (
                    <Pressable
                        onPress={() => {
                            setSelectedSize(size);
                        }}
                        style={[
                            styles.size,
                            {
                                backgroundColor: selectedSize === size ? 'gainsboro' : 'white'
                            },
                        ]}
                        key={size}
                    >
                        <Text style={[styles.sizeText, { color: selectedSize === size ? 'black' : 'gainsboro' }]}>{size}</Text>

                    </Pressable>

                ))}

            </View>

            <Text style={styles.price}>Price: ${product.price}</Text>
            <Button text="Add to cart" onPress={addToCard} />
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
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 'auto',
    },

    sizes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    size: {
        backgroundColor: 'gainsboro',
        width: 50,
        aspectRatio: 1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sizeText: {
        fontSize: 20,
        fontWeight: '500',
        color: 'black',
    },
});




export default ProductDetailsScreen;
