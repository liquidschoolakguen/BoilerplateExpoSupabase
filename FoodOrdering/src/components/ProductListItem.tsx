import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import Colors from '../constants/Colors';
import { Tables } from '../types';
import { Link, useSegments } from 'expo-router';
import RemoteImage from './RemoteImage';

export const defaultPizzaImage =
'https://t3.ftcdn.net/jpg/01/96/84/80/360_F_196848062_Sihgh6Dh395bIO2y4TStBsHbFaEpvrTE.jpg';

type ProductListItemProps = {
  product: Tables<'products'> ;
};

const ProductListItem = ({product}: ProductListItemProps) => {
  const segments = useSegments(); // das braucht man, damit die admin und die user route nicht durcheinander kommen
  return (
    // @ts-ignore
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
    <Pressable style={styles.container}>
      <RemoteImage
      path={ product.image }
      fallback={defaultPizzaImage}
      style={styles.image}
      resizeMode='contain'
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>



    </Pressable>
    </Link>
  );



}

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: '50%',
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
