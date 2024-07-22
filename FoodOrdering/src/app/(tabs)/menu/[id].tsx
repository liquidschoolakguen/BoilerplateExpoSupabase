import { Stack, useLocalSearchParams } from 'expo-router';
import {View, Text} from 'react-native';



const ProductDetailsScreen = () => {
    const {id} = useLocalSearchParams();
    return (
        <View>
            <Stack.Screen  options={{title: 'Details'}}/>
            <Text>Product Details Screen  {id}  </Text>
        </View>
    );
};

export default ProductDetailsScreen;