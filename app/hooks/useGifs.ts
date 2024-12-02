import { useState } from 'react';
import axios from 'axios';

const apiKey = process.env.EXPO_PUBLIC_API_KEY;
const url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`;

const useGif = () => {
  const [gif, setGif] = useState<string>(''); // Stores the gif URL
  const [loading, setLoading] = useState<boolean>(false); // Indicates loading state

  const fetchData = async (tag: string = '') => {
    setLoading(true); // Start loading
    try {
      const { data } = await axios.get(tag ? `${url}&tag=${tag}` : url);
      const imageSource = data.data.images.downsized_large.url; // Extract the gif URL
      setGif(imageSource); // Update the gif state
    } catch (error) {
      console.error('Error fetching data:', error); // Handle errors
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return { gif, loading, fetchData }; // Return gif, loading, and fetchData function
};

export default useGif;
