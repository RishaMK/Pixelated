import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Spinner from './Spinner';
import useGif from '../hooks/useGifs';
import { Image } from 'expo-image';

const Random = () => {
  const { gif, loading, fetchData } = useGif();

  const defaultImage = 'https://images.app.goo.gl/EFgtEA1omtKKuW7G7';

  return (
    <View style={styles.container}>
      <Text style={styles.header}>A RANDOM GIF</Text>

      {loading ? (
        <Spinner />
      ) : (
        <Image
          source={{ uri: gif || defaultImage }} 
          style={styles.image}
          contentFit="contain"
        />
      )}

      <Button
        title="GENERATE"
        onPress={() => fetchData()}  
        color="#FF69B4"  
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '40%',
    backgroundColor: '#ffe4c4', 
    borderRadius: 20,
    alignItems: 'center',
    padding: 20,
    margin: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
   
  },
  header: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#333', 
    marginVertical: 10,
    textAlign: 'center', 
  },
  image: {
    width: '100%',
    height: 200,
    maxHeight: 300,
    borderRadius: 10, 
  },
  Button:{
    margin:70,
  }
});

export default Random;