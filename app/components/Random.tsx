import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
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
      <Button
        title="Next (TagPage)"
        onPress={() => router.push('/TagPage')}  
        color="#32CD32" 
      />
    </View>
  );
};

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

export default Random;