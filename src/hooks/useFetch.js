import { useState, useEffect } from "react";
import { products as data } from "../lib/Data.js";
//import axios from 'axios';

const useFetch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const demoFetchData = async () => {
    try {
      setTimeout(() => {
        setProducts(data);
        setLoading(false);
      }, 3000);
    } catch (err) {
      console.error(err.message);
    }
  };

  // const fetchData = async () => {
  //     try {
  //         const response = await axios.get(
  //             `https://api.escuelajs.co/api/v1/products`
  //         );
  //         console.log("fetched");

  //         setProducts(response.data);
  //         setLoading(false);
  //     } catch (error) {
  //         console.error(error.message);
  //         setError(error.message);
  //         setLoading(false);
  //     }
  // };

  useEffect(() => {
    //fetchData();
    demoFetchData();
  }, []);

  return { products, loading, error };
};

export default useFetch;
