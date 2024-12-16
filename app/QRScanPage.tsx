import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, Alert, Platform, Linking } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRScanPage = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const scannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    } else {
      setHasPermission(true);
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
          handleRedirect(decodedText);
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

  const handleRedirect = (url: string) => {
    if (url.startsWith('https://') || url.startsWith('http://')) {
      Linking.openURL(url).catch((err) => Alert.alert('Error', `Failed to open URL: ${err.message}`));
    } else {
      Alert.alert('Invalid QR Code', 'The scanned QR code does not contain a valid URL.');
    }
  };

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    handleRedirect(data);
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
          onPress={() => Camera.requestCameraPermissionsAsync()}
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
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
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
