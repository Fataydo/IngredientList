import React, { useState, useEffect } from 'react';
import RecipeForm from '../../components/RecipeForm';
import RecipeListView from '../../components/RecipeListView';
import RecipeSearchForm from '../../components/RecipeSearchForm';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useGetAllRecipes, useDeleteRecipe } from '../../hooks/useRecipe';
import { Recipe as RecipeInterface } from '../../components/interface';
import RecipeUpdateForm from '../../components/RecipeUpdateForm';

const Recipe = () => {
  const { recipes: allRecipes, loading, error } = useGetAllRecipes();
  const [recipes, setRecipes] = useState<RecipeInterface[]>(allRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeInterface | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const { deleteRecipe } = useDeleteRecipe();

  useEffect(() => {
    setRecipes(allRecipes);
  }, [allRecipes]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleRecipeClick = (recipe: RecipeInterface) => {
    if (selectedRecipe && selectedRecipe.id === recipe.id) {
      setSelectedRecipe(null);
      setIsUpdateFormVisible(false);
    } else {
      setSelectedRecipe(recipe);
      setIsUpdateFormVisible(true);
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
    openUpdateForm();
    console.log('Update button clicked for:', recipe);
  };

  const handleDeleteClick = (recipe: RecipeInterface) => {
    setSelectedRecipe(recipe);
    deleteRecipe(recipe.id);
    console.log('Delete button clicked for:', recipe);
  };

  const handleSearch = (query: string, category: string) => {
    const filteredRecipes = allRecipes.filter((recipe) => {
      const nameMatch = recipe.name.toLowerCase().includes(query.toLowerCase());
      const categoryMatch = !category || recipe.categories.some(cat => cat.name === category);
      return nameMatch && categoryMatch;
    });

    setRecipes(filteredRecipes);
  };

  return (
    <div>
      <RecipeSearchForm onSearch={handleSearch} />

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
