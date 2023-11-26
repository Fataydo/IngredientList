import React, { useState } from 'react';
import RecipeForm from '../../components/RecipeForm';
import RecipeListView from '../../components/RecipeListView';
import { AiOutlinePlus, AiOutlineEdit, AiOutlineMinus } from 'react-icons/ai';
import { useGetAllRecipes } from '../../hooks/useRecipe';
import { Recipe as RecipeInterface } from '../../components/interface';

const Recipe = () => {
  const { recipes, loading, error } = useGetAllRecipes();
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeInterface | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleRecipeClick = (recipe: RecipeInterface) => {
    if (selectedRecipe && selectedRecipe.id === recipe.id) {
      // Clicked the same recipe again, hide the detail view
      setSelectedRecipe(null);
    } else {
      setSelectedRecipe(recipe);
    }
  };

  const openFormModal = () => {
    setIsFormVisible(true);
  };

  const closeFormModal = () => {
    setIsFormVisible(false);
  };

  return (
    <div>
      <div>
        <button onClick={openFormModal}>
          <AiOutlinePlus />
          Add
        </button>

        <button>
          <AiOutlineEdit />
          Update
        </button>

        <button>
          <AiOutlineMinus />
          Delete
        </button>
      </div>

      {isFormVisible && (
        <RecipeForm />
      )}

      <RecipeListView recipes={recipes} onRecipeClick={handleRecipeClick} selectedRecipe={selectedRecipe} />
    </div>
  );
};

export default Recipe;
