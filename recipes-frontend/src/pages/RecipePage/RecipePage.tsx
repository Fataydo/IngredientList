import React, { useState } from 'react';
import RecipeForm from '../../components/RecipeForm';
import RecipeListView from '../../components/RecipeListView';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineEdit } from 'react-icons/ai';
import { useGetAllRecipes, useDeleteRecipe } from '../../hooks/useRecipe';
import { Recipe as RecipeInterface } from '../../components/interface';
import RecipeUpdateForm from '../../components/RecipeUpdateForm';

const Recipe = () => {
  const { recipes, loading, error } = useGetAllRecipes();
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeInterface | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false); // Separate state for Update Form
  const { deleteRecipe } = useDeleteRecipe();

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
      setIsUpdateFormVisible(false); // Hide the Update Form when hiding the detail view
    } else {
      setSelectedRecipe(recipe);
      setIsUpdateFormVisible(true); // Show the Update Form when showing the detail view
    }
  };

  const openForm = () => {
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };

  const openUpdateForm = () => {
    setIsUpdateFormVisible(true);
  };

  const closeUpdateForm = () => {
    setIsUpdateFormVisible(false);
  };

  const handleUpdateClick = (recipe: RecipeInterface) => {
    setSelectedRecipe(recipe);
    openUpdateForm(); // Show the Update Form when the "Update" button is clicked
    console.log('Update button clicked for:', recipe);
  };

  const handleDeleteClick = (recipe: RecipeInterface) => {
    setSelectedRecipe(recipe);
    deleteRecipe(recipe.id);
    console.log('Delete button clicked for:', recipe);
  };

  return (
    <div>
      <div>
        <button onClick={openForm}>
          <AiOutlinePlus />
          Add
        </button>
        <button onClick={closeForm}>
          closeform
        </button>
        <button onClick={closeUpdateForm}>
          closeUpdateForm
        </button>
      </div>

      {isFormVisible && <RecipeForm onClose={closeForm} />}
      {isUpdateFormVisible && (
        <RecipeUpdateForm
          recipeId={selectedRecipe?.id || 0}
          onCloseUpdateForm={closeUpdateForm}
        />
      )}


      <RecipeListView
        recipes={recipes}
        onRecipeClick={handleRecipeClick}
        onUpdateClick={handleUpdateClick}
        onDeleteClick={handleDeleteClick}
        selectedRecipe={selectedRecipe}
      />
    </div>
  );
};

export default Recipe;
