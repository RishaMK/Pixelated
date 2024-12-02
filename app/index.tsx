// app/index.tsx
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import Random from './components/Random';
import Tag from './components/Tag';

export default function App() {
  return (
    <ImageBackground style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>RANDOM GIF GENERATOR</Text>
        <View style={styles.content}>
          <Random />
          <Tag />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,  // Ensure the container grows based on content size
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  background: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  header: {
    backgroundColor: '#00bcd4',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 20,
    marginTop: 20,
    width: '90%',
  },
  content: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    marginTop: 30,
  },
});
