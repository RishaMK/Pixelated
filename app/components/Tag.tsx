import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Spinner from '../components/Spinner';
import useGif from '../hooks/useGifs';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';  

export default function TagScreen() {
  const [tag, setTag] = useState('');
  const { gif, loading, fetchData } = useGif();
  const router = useRouter();  

  const defaultImage = 'https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif';


  const handleGenerateClick = () => {
    if (tag.trim() === '') {
      alert('Please enter a search term.');
      return;
    }
    fetchData(tag);  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search for a GIF</Text>
      <View style={styles.overlayContent}>
      {loading ? (
        <Spinner />
      ) : (
        <Image
          source={{ uri: gif || defaultImage }}
          style={styles.image}
          contentFit="contain"
        />
      )}

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setTag(text)}
          placeholder="Enter a search term"
          value={tag}
          placeholderTextColor="#AAA"
        />
        <Button title="SEARCH" onPress={handleGenerateClick} color="#77DD77" />
      </View>
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFD27B',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlayContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: 360,
    maxHeight: 550,
    padding: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 0, 
    overflow: 'hidden', 
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginVertical: 20,
  },
  searchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#77DD77',
  },
});
