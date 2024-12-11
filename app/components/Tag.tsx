import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
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

  const handleDownloadQr = () => {
    if (qrCode) {
      const link = document.createElement('a');
      link.href = `data:image/png;base64,${qrCode}`;
      link.download = 'qr_code.png';
      link.click();
    }
  };

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

      <Button
        title="Generate QR"
        onPress={handleGenerateQr}
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

      <Button 
        title="Go Back" 
        onPress={() => router.back()} 
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
    overflow: 'scroll',
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
  qrContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  qrImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});
