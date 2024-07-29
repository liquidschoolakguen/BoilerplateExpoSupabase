import Button from '@/components/Button';
import { defaultPizzaImage } from '@/components/ProductListItem';
import Colors from '@/constants/Colors';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';

import * as ImagePicker from 'expo-image-picker';


const CreateProductScreen = () => {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState('');
  const [image, setImage] = useState<string|null>(null);

  const resetFileds = () => {
    setName('');
    setPrice('');
  }

  const validate = () => {
    if (!name || !price) {
      setErrors('Please fill all fields');
      return false;
    }

    if (isNaN(parseFloat(price))) {
      setErrors('Price must be a number');
      return false;
    }

    setErrors('');
    return true
  }

  const onCreate = () => {
    if (!validate()) {
      return;
    }

    console.warn('Create Product: ', name);

    // Save to database

    // Reset fields
    resetFileds();
  };

const pickImage = async () => {
 let result = await ImagePicker.launchImageLibraryAsync({

    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if(!result.canceled){
    setImage(result.assets[0].uri);
  }


}

  return (
    <View style={styles.container}  >
      <Image source={{ uri: image || defaultPizzaImage }} style={styles.image} />
      <Text onPress={pickImage} style={styles.textButton}>
        Select Image
      </Text>
      <Text style={styles.label}>Name</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Name" />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput value={price} onChangeText={setPrice} style={styles.input} placeholder="9.99" keyboardType='numeric' />
      <Text style={{ color: 'red' }}>{errors}</Text>
      <Button onPress={onCreate} text="Create" />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  label: {
    fontSize: 16,
    color: 'gray'

  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,

  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center',
    marginVertical: 20,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },

});


export default CreateProductScreen;
