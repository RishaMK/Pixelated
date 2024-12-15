import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useCameraPermissions } from 'expo-camera'; 

const Home = () => {
  const router = useRouter();

  const [permission, requestPermission] = useCameraPermissions();
  const hasPermission = permission?.status === 'granted'; 

  const backgroundImage = 'https://media.giphy.com/media/YrZECW1GgBkqat6F0B/giphy.gif';

  const handleScanQRCode = async () => {
    if (hasPermission) {
      router.push('/QRScanPage');
    } else {
      const permissionResponse = await requestPermission();
      if (permissionResponse.status === 'granted') {
        router.push('/QRScanPage');
      } else {
        Alert.alert(
          'Permission Denied',
          'Camera permission is required to scan QR codes. Please enable it in settings.'
        );
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: backgroundImage }} 
        style={styles.backgroundImage}
        resizeMode="contain"
      />
      <View style={styles.overlayContent}>
        <Text style={styles.title}>Welcome to PIXELATED!</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.buttonRandomGIF]} 
            onPress={() => router.push('/RandomPage')}
          >
            <Text style={styles.buttonText}>RandomGIF</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.buttonSearchGIF]} 
            onPress={() => router.push('/TagPage')}
          >
            <Text style={styles.buttonText}>SearchGIF</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.buttonRandomGIF]} 
            onPress={handleScanQRCode}  
          >
            <Text style={styles.buttonText}>Scan QR Code</Text>
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
    padding: 20,
    backgroundColor: '#FFD27B',
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
    maxHeight: 350,
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
    marginTop:30,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'column', 
    justifyContent: 'space-between',
    gap: 20,
    marginBottom:50
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonRandomGIF: {
    backgroundColor: '#FFD1DC',
  },
  buttonSearchGIF: {
    backgroundColor: '#77DD77',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;
