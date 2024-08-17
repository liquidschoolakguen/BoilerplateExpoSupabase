import Button from '@/components/Button';
import { defaultPizzaImage } from '@/components/ProductListItem';
import Colors from '@/constants/Colors';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from '@/api/products';
import * as  FileSystem from 'expo-file-system';
import { randomUUID } from 'expo-crypto';
import { supabase } from '@/lib/supabase';
import { decode } from 'base64-arraybuffer';
const CreateProductScreen = () => {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0]);

  const isUpdating = !!id;
  //console.log('id B:', id);

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: updatingProduct } = useProduct(id);
  const { mutate: deleteProduct } = useDeleteProduct();

  const router = useRouter();

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name);
      setPrice(updatingProduct.price.toString());
      setImage(updatingProduct.image);
    }
  }, [updatingProduct]);



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


  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };


  const onUpdate = async () => {
    if (!validate()) {
      return;
    }
    const imagePath = await uploadImage();
    // Save to database
    updateProduct({ id, name, price: parseFloat(price), image: imagePath }, {
      onSuccess: () => {
        resetFileds();
        router.back();
      },
    });
  }

  const onCreate = async () => {
    if (!validate()) {
      return;
    }

    const imagePath = await uploadImage();
    // Save to database
    insertProduct({ name, price: parseFloat(price), image: imagePath }, {
      onSuccess: () => {
        resetFileds();
        router.back();
      },
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({

      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }


  }


  const onDelete = () => {
    deleteProduct(id, {
      onSuccess: () => {
        resetFileds();
        router.replace('/(admin)');
      }
    });

  }

  const confirmDelete = () => {
    Alert.alert('Confirm', 'Are you sure you want to delete this product?', [
      {
        text: 'Cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: onDelete,
      }
    ])
  }



  const uploadImage = async () => {
    // console.log('image:');
    if (!image?.startsWith('file://')) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: 'base64',
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = 'image/png';
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, decode(base64), { contentType });
    //console.log('error:', error);
    if (data) {
      return data.path;
    }
  };


  return (
    <View style={styles.container}  >
      <Stack.Screen options={{ title: isUpdating ? 'Update Product' : 'Create Product' }} />
      <Image source={{ uri: image || defaultPizzaImage }} style={styles.image} />
      <Text onPress={pickImage} style={styles.textButton}>
        Select Image
      </Text>
      <Text style={styles.label}>Name</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Name" />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput value={price} onChangeText={setPrice} style={styles.input} placeholder="9.99" keyboardType='numeric' />
      <Text style={{ color: 'red' }}>{errors}</Text>
      <Button onPress={onSubmit} text={isUpdating ? 'Update' : "Create"} />
      {isUpdating && (
        <Text onPress={confirmDelete} style={styles.textButton} >
          Delete
        </Text>
      )}
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
