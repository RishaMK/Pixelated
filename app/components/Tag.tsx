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
      <Text style={styles.header}>Search for a GIF</Text> {/* Clearer label */}

      {loading ? (
        <Spinner />
      ) : (
        <Image
          source={{ uri: gif || defaultImage }}
          style={styles.image}
          contentFit="cover" // Adjust for different fit preferences
        />
      )}

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setTag(text)}
          placeholder="Enter a search term"
          value={tag}
          placeholderTextColor="#CCC" // Lighter placeholder color
        />

        <Button title="SEARCH" onPress={handleGenerateClick} color="#32CD32" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height:'70%',
    width: '40%',
    backgroundColor: '#ffe4c4', // Lighter background
    borderRadius: 20,
    alignItems: 'center',
    padding: 20,
    margin: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2, // Add subtle shadow
  },
  header: {
    fontSize: 24, // Increase font size slightly
    fontWeight: 'bold',
    color: '#333', // Darker text color
    marginVertical: 10,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 120,
    maxHeight: 300,
    borderRadius: 10, // Rounded corners for GIF
    // contentFit: "contain", // Adjust for different fit preferences
  },
  searchRow: {
    flexDirection: 'row', // Make elements horizontal
    justifyContent: 'space-between', // Distribute evenly
    alignItems: 'center', // Align vertically
    width: '100%', // Take full width of container
    marginTop: 10, // Add margin top
  },
  input: {
    flex: 1, // Make input take remaining space after button
    backgroundColor: '#FFF', // White background
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    margin:30
  },
});

export default Tag;