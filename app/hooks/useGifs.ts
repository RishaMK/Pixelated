import { useState } from 'react';
import axios from 'axios';

const apiKey = process.env.EXPO_PUBLIC_API_KEY;
const url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`;

const useGif = () => {
  const [gif, setGif] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); 

  const fetchData = async (tag: string = '') => {
    setLoading(true); 
    try {
      const { data } = await axios.get(tag ? `${url}&tag=${tag}` : url);
      const imageSource = data.data.images.downsized_large.url; 
      setGif(imageSource); 
    } catch (error) {
      console.error('Error fetching data:', error); 
    } finally {
      setLoading(false);
    }
  };

  return { gif, loading, fetchData }; 
};

export default useGif;
