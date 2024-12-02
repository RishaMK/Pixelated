import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Spinner from './Spinner';
import useGif from '../hooks/useGifs';
import { Image } from 'expo-image';

const Tag = () => {
  const [tag, setTag] = useState(''); 
  const { gif, loading, fetchData } = useGif(); 


  const handleGenerateClick = () => {
    fetchData(tag); 
  };

  const defaultImage = 'https://images.app.goo.gl/EFgtEA1omtKKuW7G7';

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SEARCH RANDOM GIF</Text>

      {loading ? (
        <Spinner />
      ) : (
        <Image
          source={{ uri: gif || defaultImage }} 
          style={styles.image}
          contentFit="contain"
        />
      )}

      <TextInput
        style={styles.input}
        onChangeText={(text) => setTag(text)} 
        placeholder="Search here"
        value={tag}
      />

      <Button
        title="GENERATE"
        onPress={handleGenerateClick} 
        color="#32CD32"  
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    backgroundColor: '#32CD32', 
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
  input: {
    width: '80%',
    backgroundColor: '#90EE90', 
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default Tag;
