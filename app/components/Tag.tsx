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
        <Button title="SEARCH" onPress={handleGenerateClick} color="#32CD32" />
      </View>

      {/* Optional: Navigation Button to go back or to other screen */}
      <Button 
        title="Go Back" 
        onPress={() => router.back()}  // Using router.back() for navigating back
        color="#FF69B4"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe4c4',
    padding: 20,
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
    borderColor: '#CCC',
  },
});
