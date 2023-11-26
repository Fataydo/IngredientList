import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetAllRecipes = () => {
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
  
  export default useGetAllRecipes;
