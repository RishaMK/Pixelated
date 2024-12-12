import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import Spinner from './Spinner';
import useGif from '../hooks/useGifs';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

const Random = () => {
  const { gif, loading, fetchData } = useGif();
  const [qrCode, setQrCode] = useState<string | null>(null);

  const router = useRouter(); 

  const defaultImage = 'https://images.gr-assets.com/hostedimages/1591136181ra/29584860.gif';

  // Function to generate QR code
  const handleGenerateQr = async () => {
    const qrData = gif || defaultImage;
    try {
      const response = await fetch(`http://127.0.0.1:5000/generate_qr?data=${encodeURIComponent(qrData)}`);
      const data = await response.json();

      if (data.qr_code) {
        setQrCode(data.qr_code);
      } else {
        Alert.alert("Error", "Failed to generate QR code.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while generating the QR code.");
    }
  };

  // Automatically generate QR code when the gif is updated
  useEffect(() => {
    if (gif) {
      handleGenerateQr();
    }
  }, [gif]);

  const handleDownloadQr = () => {
    if (qrCode) {
      const link = document.createElement('a');
      link.href = `data:image/png;base64,${qrCode}`;
      link.download = 'qr_code.png';
      link.click();
    }
  };

  // Function for handling the generate button press
  const handleGeneratePress = async () => {
    await fetchData();  // Fetch new GIF
    handleGenerateQr(); // Generate QR code automatically
  };

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

        <Button
          title="Generate QR"
          onPress={handleGeneratePress}
        />

        {qrCode && (
          <View style={styles.qrContainer}>
            <Image
              source={{ uri: `data:image/png;base64,${qrCode}` }}
              style={styles.qrImage}
            />
            <Button
              title="Download QR"
              onPress={handleDownloadQr}
            />
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.buttonGenerate]} 
            onPress={handleGeneratePress}  // Clicking this will generate a new gif and qr code
          >
            <Text style={styles.buttonText}>GENERATE</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.buttonNext]} 
            onPress={() => router.push('/TagPage')}  
          >
            <Text style={styles.buttonText}>KEYWORD</Text>
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
    width: '90%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 12, 
    overflow: 'hidden',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center'
  },
  button: {
    width: '40%',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonGenerate: {
    backgroundColor: '#FFD1DC',  // Pink color for Generate
  },
  buttonNext: {
    backgroundColor: '#77DD77',  // Green color for Next (TagPage)
  },
  buttonText: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
  },
  qrContainer: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  qrImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
});

export default Random;
