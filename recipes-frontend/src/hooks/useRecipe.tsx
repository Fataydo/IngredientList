import { useState, useEffect } from 'react';
import axios from 'axios';
import { Recipe } from '../components/interface';

export const useGetAllRecipes = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]); // Provide the type for recipes
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null); // Provide the type for error
  
    useEffect(() => {
      const fetchRecipes = async () => {
        try {
          const response = await axios.get<Recipe[]>('http://localhost:9090/api/recipes/getAllRecipes');
          setRecipes(response.data);
        } catch (error:any) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchRecipes();
    }, []); // The empty dependency array ensures that this effect runs once when the component mounts
  
    return { recipes, loading, error };
  };

export const useDeleteRecipe = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const deleteRecipe = async (recipeId: number) => {
        setLoading(true);

        try {
            const response = await axios.delete(`http://localhost:9090/api/recipes/deleteRecipe/${recipeId}`);
            // Optionally, you can handle the response or perform additional actions here
            console.log('Recipe deleted successfully:', response.data);
        } catch (error:any) {
            console.error('Error deleting recipe:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { deleteRecipe, loading, error };
};


const useGetRecipesByIngredient = (ingredientName:string) => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`http://localhost:9090/api/recipes/getRecipesByIngredient/${ingredientName}`);
        setRecipes(response.data);
      } catch (error:any) {
        setError(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [ingredientName]);

  return { recipes, isLoading, error };
};

export default useGetRecipesByIngredient;


