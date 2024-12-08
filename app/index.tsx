import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router'; 

const Home = () => {
  const router = useRouter();

  const backgroundImage = 'https://media.giphy.com/media/YrZECW1GgBkqat6F0B/giphy.gif';


  return (
    <ImageBackground 
      source={{ uri: backgroundImage }} 
      style={styles.container}
      resizeMode="contain"
    >
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to the GIF Generator!</Text>
        <Button 
          title="Go to Random GIF" 
          onPress={() => router.push('/RandomPage')} 
          color="#FF69B4" 
        />
        <Button 
          title="Go to Search GIF" 
          onPress={() => router.push('/TagPage')} 
          color="#32CD32" 
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    maxWidth: 360,
    padding: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8, 
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
  button: {
    marginTop: 20,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: '#FF69B4', 
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});

export default Home;
