// app/components/Random.tsx
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
          source={{ uri: gif || defaultImage }} // Use default image if gif is empty
          style={styles.image}
          contentFit="contain"
        />
      )}

      <Button
        title="GENERATE"
        onPress={() => fetchData()}  // Fetch new GIF
        color="#FF69B4"  // Set the button color (equivalent to bg-pink-300)
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    backgroundColor: '#FF1493', // pink-400
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
});

export default Random;
