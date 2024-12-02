import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Spinner from './Spinner';
import useGif from '../hooks/useGifs';
import { Image } from 'expo-image';

const Tag = () => {
  const [tag, setTag] = useState(''); // Store the input tag
  const { gif, loading, fetchData } = useGif(); // Remove tag from here to avoid automatic fetching

  // Function to handle the button click and fetch the GIF
  const handleGenerateClick = () => {
    fetchData(tag); // Fetch the GIF based on the tag
  };

  const defaultImage = 'https://images.app.goo.gl/EFgtEA1omtKKuW7G7';

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SEARCH RANDOM GIF</Text>

      {loading ? (
        <Spinner />
      ) : (
        <Image
          source={{ uri: gif || defaultImage }} // Use default image if gif is empty
          style={styles.image}
          contentFit="contain"
        />
      )}

      <TextInput
        style={styles.input}
        onChangeText={(text) => setTag(text)} // Update tag state as the user types
        placeholder="Search here"
        value={tag}
      />

      <Button
        title="GENERATE"
        onPress={handleGenerateClick} // Trigger fetchData when the button is pressed
        color="#32CD32"  // Set the button color (equivalent to bg-green-300)
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    backgroundColor: '#32CD32', // green-400
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
    width: '100%', // Use full width of the container
    height: 200,   // Limit the height to ensure it doesn't overflow
    maxHeight: 300, // Max height to maintain the aspect ratio
    resizeMode: 'contain', // Ensure the image is contained within the box
    marginVertical: 10,
  },
  input: {
    width: '80%',
    backgroundColor: '#90EE90', // green-300
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default Tag;
