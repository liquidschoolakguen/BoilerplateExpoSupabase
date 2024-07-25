import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { defaultPizzaImage } from '@components/ProductListItem';
import products from '@assets/data/products';
import Button from '@components/Button';


const sizes = ['S', 'M', 'L', 'XL'];


const ProductDetailsScreen = () => {
    const { id } = useLocalSearchParams();

    const [selectedSize, setSelectedSize] = useState('M');

    const product = products.find((p) => p.id.toString() === id);

    const addToCard = () => {
        console.warn('Add to cart: '+selectedSize);
    }

    if (!product) {
        return <Text>Product not found</Text>;
    }


    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: product.name }} />
            <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} />

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
