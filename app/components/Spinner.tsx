import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const Spinner = () => {
  return (
    <View style={styles.spinner}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  spinner: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Spinner;

