import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Spinner from '../components/Spinner';
import useGif from '../hooks/useGifs';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';  

export default function TagScreen() {
  const [tag, setTag] = useState('');
  const { gif, loading, fetchData } = useGif();
  const router = useRouter();  
  const [qrCode, setQrCode] = useState<string | null>(null);

  const defaultImage = 'https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif';

  const handleGenerateQr = async (gifData: string) => {
    const qrData = gifData || defaultImage;
    try {
      const response = await fetch(`http://127.0.0.1:5000/generate_qr?data=${encodeURIComponent(qrData)}`);
      const data = await response.json();

      if (data.qr_code) {
        setQrCode(data.qr_code); // Update the QR code state
      } else {
        Alert.alert("Error", "Failed to generate QR code.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while generating the QR code.");
    }
  };

  const handleDownloadQr = () => {
    if (qrCode) {
      const link = document.createElement('a');
      link.href = `data:image/png;base64,${qrCode}`;
      link.download = 'qr_code.png';
      link.click();
    }
  };

  const handleGenerateClick = async () => {
    if (tag.trim() === '') {
      alert('Please enter a search term.');
      return;
    }

    // Fetch new GIF based on tag
    await fetchData(tag);
  };

  // UseEffect to generate QR code when gif state is updated
  useEffect(() => {
    if (gif) {
      handleGenerateQr(gif);
    }
  }, [gif]);

  return (
    <View style={styles.container}>
      <Image 
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.overlayContent}>
        <Text style={styles.title}>Search for a GIF</Text>

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
        </View>

        {/* Button to generate QR removed, QR code will be generated automatically on gif update */}

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
            onPress={handleGenerateClick}
          >
            <Text style={styles.buttonText}>GENERATE</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.buttonNext]} 
            onPress={() => router.push('/RandomPage')}   
          >
            <Text style={styles.buttonText}>RANDOM GIF</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  searchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10
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
  qrContainer: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 10
  },
  qrImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
  },
  button: {
    width: '40%',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonGenerate: {
    backgroundColor: '#FFD1DC', 
  },
  buttonNext: {
    backgroundColor: '#77DD77', 
  },
  buttonText: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
