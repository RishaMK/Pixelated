import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, Alert, Platform } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRScanPage = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState<string | null>(null);
  const scannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    } else {
      setHasPermission(true); // Assume permission for web :)
    }
  }, []);

  useEffect(() => {
    if (Platform.OS === 'web' && scannerRef.current) {
      const html5QrcodeScanner = new Html5QrcodeScanner(
        scannerRef.current.id,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        false
      );

      html5QrcodeScanner.render(
        (decodedText) => {
          setData(decodedText);
          Alert.alert('QR Code Scanned', `Data: ${decodedText}`);
          html5QrcodeScanner.clear();
        },
        (error) => {
          console.error('QR code scan error:', error);
        }
      );

      return () => {
        html5QrcodeScanner.clear();
      };
    }
  }, [scannerRef]);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    Alert.alert('QR Code Scanned', `Type: ${type}, Data: ${data}`);
    setData(data);
  };

  if (Platform.OS !== 'web' && hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (Platform.OS !== 'web' && hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera.</Text>
        <Button
          title="Grant Permission"
          onPress={() => BarCodeScanner.requestPermissionsAsync()}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan a QR Code</Text>
      {Platform.OS === 'web' ? (
        <div id="scanner" ref={scannerRef} style={{ width: '100%', height: 300 }} />
      ) : (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
      {data && <Text>Scanned Data: {data}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    overflow: 'scroll',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default QRScanPage;
