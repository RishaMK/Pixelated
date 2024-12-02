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
    width: '80%',
    backgroundColor: '#FF1493', 
    borderRadius: 20,
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginVertical: 10,
  },
  image: {
    width: '100%', 
    height: 200,   
    maxHeight: 300, 
    resizeMode: 'contain', 
    marginVertical: 10,
  },
});

export default Random;
