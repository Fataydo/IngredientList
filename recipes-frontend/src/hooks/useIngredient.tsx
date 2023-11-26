import { useState, useEffect } from 'react';
import axios from 'axios';
import { IngredientC } from '../components/interface';

export const useGetAllIngredients = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);;
  const [ingredients, setIngredients] = useState<IngredientC[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9090/api/ingredients/getAllIngredients');
        setIngredients(response.data);
      } catch (error:any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs once, similar to componentDidMount

  return { isLoading, error, ingredients };
};

export const useDeleteIngredient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteIngredient = async (ingredientId: number) => {
      setLoading(true);

      try {
          const response = await axios.delete(`http://localhost:9090/api/ingredients/deleteIngredient/${ingredientId}`);
          // Optionally, you can handle the response or perform additional actions here
          console.log('Ingredient deleted successfully:', response.data);
      } catch (error:any) {
          console.error('Error deleting Ingredient:', error);
          setError(error);
      } finally {
          setLoading(false);
      }
  };

  return { deleteIngredient, loading, error };
};
