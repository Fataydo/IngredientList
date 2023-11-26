import { useState, useEffect } from 'react';
import axios from 'axios';
import { CategoryC } from '../components/interface';
export const useGetAllCategories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);;
  const [categories, setCategories] = useState<CategoryC[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9090/api/categories/getAllCategories');
        setCategories(response.data);
      } catch (error:any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { isLoading, error, categories };
};