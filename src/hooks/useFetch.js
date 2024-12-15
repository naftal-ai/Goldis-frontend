import { useState, useEffect } from "react";
import { API_BASE_URL } from "../lib/Constants";
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const fetchData = async (url) => {
    try {
        const response = await axios.get(
            API_BASE_URL.concat(url)
        );
        console.log("fetched");

        setData(response.data);
        setLoading(false);
    } catch (error) {
        console.error(error.message);
        setError(error);
        setLoading(false);
    }
};

  useEffect(() => {
    fetchData(url);
    
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
