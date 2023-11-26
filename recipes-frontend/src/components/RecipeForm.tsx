import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RecipeC, IngredientC, Category } from './interface';
import { useGetAllIngredients } from '../hooks/useIngredient';
import { useGetAllCategories } from '../hooks/useCategory';

const RecipeForm = () => {
  const [recipeData, setRecipeData] = useState<RecipeC>({
    name: '',
    steps: '',
    description: '',
    rating: 0,
    image: '',
    ingredients: [{ ingredientId: 0, quantity: 0, unit: '' }],
    categories: [{ categoryId: 0 }],
  });

  const { isLoading: ingredientLoading, error: ingredientError, ingredients } = useGetAllIngredients();
  const { isLoading: categoryLoading, error: categoryError, categories } = useGetAllCategories();

  useEffect(() => {
    if (ingredients.length > 0) {
      setRecipeData((prevData) => ({
        ...prevData,
        ingredients: [{ ingredientId: ingredients[0].id, quantity: 0, unit: '' }],
      }));
    }
    if (categories.length > 0) {
      setRecipeData((prevData) => ({
        ...prevData,
        categories: [{ categoryId: categories[0].id }],
      }));
    }
  }, [ingredients, categories]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRecipeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleIngredientChange = (index: number, field: string, value: number | string) => {
    setRecipeData((prevData) => ({
      ...prevData,
      ingredients: prevData.ingredients.map((ingredient, i) =>
        i === index ? { ...ingredient, [field]: value } : ingredient
      ),
    }));
  };

  const handleCategoryChange = (index: number, value: number) => {
    setRecipeData((prevData) => ({
      ...prevData,
      categories: prevData.categories.map((category, i) =>
        i === index ? { ...category, categoryId: value } : category
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:9090/api/recipes/createRecipe', recipeData);
      console.log('Recipe created successfully:', response.data);
      // Optionally, you can handle the response or perform additional actions here
    } catch (error) {
      console.error('Error creating recipe:', error);
      // Handle the error as needed
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={recipeData.name} onChange={handleInputChange} />
      </label>
      <label>
        Steps:
        <textarea name="steps" value={recipeData.steps} onChange={handleInputChange} />
      </label>
      <label>
        Description:
        <textarea name="description" value={recipeData.description} onChange={handleInputChange} />
      </label>
      <label>
        Rating:
        <input type="number" name="rating" value={recipeData.rating} onChange={handleInputChange} />
      </label>
      <label>
        Image:
        <input type="text" name="image" value={recipeData.image} onChange={handleInputChange} />
      </label>

      {/* Ingredients Dropdown */}
      <label>
        Ingredient:
        <select
          value={recipeData.ingredients[0].ingredientId}
          onChange={(e) => handleIngredientChange(0, 'ingredientId', Number(e.target.value))}
        >
          {ingredientLoading ? (
            <option value={0}>Loading...</option>
          ) : ingredientError ? (
            <option value={0}>Error loading ingredients</option>
          ) : (
            ingredients.map((ingredient) => (
              <option key={ingredient.id} value={ingredient.id}>
                {ingredient.name}
              </option>
            ))
          )}
        </select>
      </label>
      {/* Quantity and Unit fields for the selected ingredient */}
      <label>
        Quantity:
        <input
          type="number"
          value={recipeData.ingredients[0].quantity}
          onChange={(e) => handleIngredientChange(0, 'quantity', e.target.value)}
        />
      </label>
      <label>
        Unit:
        <input
          type="text"
          value={recipeData.ingredients[0].unit}
          onChange={(e) => handleIngredientChange(0, 'unit', e.target.value)}
        />
      </label>

      {/* Categories Dropdown */}
      <label>
        Category:
        <select
          value={recipeData.categories[0].categoryId}
          onChange={(e) => handleCategoryChange(0, Number(e.target.value))}
        >
          {categoryLoading ? (
            <option value={0}>Loading...</option>
          ) : categoryError ? (
            <option value={0}>Error loading categories</option>
          ) : (
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
          )}
        </select>
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default RecipeForm;
