import React, { useState, useEffect } from 'react';
import RecipeForm from '../../components/RecipeForm';
import RecipeListView from '../../components/RecipeListView';
import RecipeSearchForm from '../../components/RecipeSearchForm';
import RecipeUpdateForm from '../../components/RecipeUpdateForm';
import { AiOutlinePlus } from 'react-icons/ai';
import { useGetAllRecipes, useDeleteRecipe } from '../../hooks/useRecipe';
import { Recipe as RecipeInterface } from '../../components/interface';
import './RecipePage.css'; // Import the CSS file

const RecipePage = () => {
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
    <div className="recipe-page">
      <div className="button-container">
        <button onClick={closeForm} className="action-button">
          Close Form
        </button>
        <button onClick={closeUpdateForm} className="action-button">
          Close Update Form
        </button>
      </div>

      <RecipeSearchForm onSearch={handleSearch} />

        <button className="add-recipe-button "onClick={openForm}>
          <AiOutlinePlus />
          Add Recipe
        </button>

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

export default RecipePage;
