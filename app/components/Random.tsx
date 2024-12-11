import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Spinner from './Spinner';
import useGif from '../hooks/useGifs';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

const Random = () => {
  const { gif, loading, fetchData } = useGif();
  const router = useRouter(); 

  const defaultImage = 'https://images.gr-assets.com/hostedimages/1591136181ra/29584860.gif';

  return (
    <View style={styles.container}>
      <Image 
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.overlayContent}>
        <Text style={styles.title}>A RANDOM GIF</Text>

        {loading ? (
          <Spinner />
        ) : (
          <Image
            source={{ uri: gif || defaultImage }} 
            style={styles.image}
            contentFit="contain"
          />
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.buttonGenerate]} 
            onPress={() => fetchData()}  
          >
            <Text style={styles.buttonText}>GENERATE</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.buttonNext]} 
            onPress={() => router.push('/TagPage')}  
          >
            <Text style={styles.buttonText}>Next (TagPage)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD27B',  // Background color
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlayContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: 360,
    maxHeight: 550,  // Increased height to accommodate the buttons properly
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'column', 
    justifyContent: 'space-between',
    gap: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonGenerate: {
    backgroundColor: '#FFD1DC',  // Pink color for Generate
  },
  buttonNext: {
    backgroundColor: '#77DD77',  // Green color for Next (TagPage)
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Random;
