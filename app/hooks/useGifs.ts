import { useState } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';

const EXPO_PUBLIC_API_KEY = Constants.manifest.extra.EXPO_PUBLIC_API_KEY; 

const url = `https://api.giphy.com/v1/gifs/random?api_key=${EXPO_PUBLIC_API_KEY}`;

const useGif = () => {
  const [gif, setGif] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async (tag = '') => {
    setLoading(true);
    try {
      const { data } = await axios.get(tag ? `${url}&tag=${tag}` : url);
      const imageSource = data.data[0]?.images?.downsized_large?.url; // Get the GIF URL
      setGif(imageSource); // Set the fetched GIF URL
    } catch (error) {
      console.error('Error fetching data:', error); // Log any errors
    } finally {
      setLoading(false);
    }
  };

  return { gif, loading, fetchData };
};

export default useGif;
