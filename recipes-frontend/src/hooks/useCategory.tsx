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
export const useDeleteCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteCategory = async (categoryId: number) => {
      setLoading(true);

      try {
          const response = await axios.delete(`http://localhost:9090/api/ingredients/deleteIngredient/${categoryId}`);
          // Optionally, you can handle the response or perform additional actions here
          console.log('Category deleted successfully:', response.data);
      } catch (error:any) {
          console.error('Error deleting Category:', error);
          setError(error);
      } finally {
          setLoading(false);
      }
  };

  return { deleteCategory, loading, error };
};