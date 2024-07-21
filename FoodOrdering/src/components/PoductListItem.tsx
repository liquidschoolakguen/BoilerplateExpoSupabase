import { StyleSheet, Text, View, Image } from 'react-native';
import Colors from '../constants/Colors';



const ProductListItem = ({product}: {product: any}) => {
 console.log(product);
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>

    </View>
  );



}

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 12,
  },
  image: { 
    width: '100%', 
    aspectRatio: 1 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',

  }
});
