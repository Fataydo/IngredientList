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

  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const { isLoading: ingredientLoading, error: ingredientError, ingredients } = useGetAllIngredients();
  const { isLoading: categoryLoading, error: categoryError, categories } = useGetAllCategories();

  useEffect(() => {
    if (ingredients.length > 0) {
      setRecipeData((prevData) => ({
        ...prevData,
        ingredients: [{ ingredientId: ingredients[0].id, quantity: 0, unit: '' }],
      }));
      setSelectedIngredients([ingredients[0].id]);
    }
    if (categories.length > 0) {
      setRecipeData((prevData) => ({
        ...prevData,
        categories: [{ categoryId: categories[0].id }],
      }));
      setSelectedCategories([categories[0].id]);
    }
  }, [ingredients, categories]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRecipeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleIngredientChange = (field: string, value: number, index: number) => {
    setRecipeData((prevData) => ({
      ...prevData,
      ingredients: prevData.ingredients.map((ingredient, i) =>
        i === index ? { ...ingredient, [field]: value } : ingredient
      ),
    }));
    setSelectedIngredients((prevSelected) => {
      const updatedSelected = [...prevSelected];
      updatedSelected[index] = value;
      return updatedSelected;
    });
  };

  const handleCategoryChange = (value: number, index: number) => {
    setRecipeData((prevData) => ({
      ...prevData,
      categories: prevData.categories.map((category, i) =>
        i === index ? { ...category, categoryId: value } : category
      ),
    }));
    setSelectedCategories((prevSelected) => {
      const updatedSelected = [...prevSelected];
      updatedSelected[index] = value;
      return updatedSelected;
    });
  };

  const handleAddIngredient = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, { ingredientId: 0, quantity: 0, unit: '' }],
    }));
    setSelectedIngredients((prevSelected) => [...prevSelected, 0]);
  };

  const handleRemoveIngredient = (index: number) => {
    setRecipeData((prevData) => ({
      ...prevData,
      ingredients: prevData.ingredients.filter((_, i) => i !== index),
    }));
    setSelectedIngredients((prevSelected) => prevSelected.filter((_, i) => i !== index));
  };

  const handleAddCategory = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      categories: [...prevData.categories, { categoryId: 0 }],
    }));
    setSelectedCategories((prevSelected) => [...prevSelected, 0]);
  };

  const handleRemoveCategory = (index: number) => {
    setRecipeData((prevData) => ({
      ...prevData,
      categories: prevData.categories.filter((_, i) => i !== index),
    }));
    setSelectedCategories((prevSelected) => prevSelected.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check for duplicate ingredients or categories
    const hasDuplicateIngredients = selectedIngredients.length !== new Set(selectedIngredients).size;
    const hasDuplicateCategories = selectedCategories.length !== new Set(selectedCategories).size;

    if (hasDuplicateIngredients || hasDuplicateCategories) {
      console.error('Cannot use the same ingredient or category more than once.');
      return;
    }

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

      {/* Ingredient Dropdowns */}
      {recipeData.ingredients.map((ingredient, index) => (
        <div key={index}>
          <label>
            Ingredient:
            <select
              value={ingredient.ingredientId}
              onChange={(e) => handleIngredientChange('ingredientId', Number(e.target.value), index)}
            >
              {ingredientLoading ? (
                <option value={0}>Loading...</option>
              ) : ingredientError ? (
                <option value={0}>Error loading ingredients</option>
              ) : (
                ingredients.map((ingredientOption) => (
                  <option key={ingredientOption.id} value={ingredientOption.id} disabled={selectedIngredients.includes(ingredientOption.id)}>
                    {ingredientOption.name}
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
              value={ingredient.quantity}
              onChange={(e) => handleIngredientChange('quantity', e.target.value, index)}
            />
          </label>
          <label>
            Unit:
            <input
              type="text"
              value={ingredient.unit}
              onChange={(e) => handleIngredientChange('unit', e.target.value, index)}
            />
          </label>
          <button type="button" onClick={() => handleRemoveIngredient(index)} disabled={recipeData.ingredients.length === 1}>
            Remove Ingredient
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddIngredient} disabled={ingredients.length === selectedIngredients.length}>
        Add Ingredient
      </button>

      {/* Category Dropdowns */}
      {recipeData.categories.map((category, index) => (
        <div key={index}>
          <label>
            Category:
            <select
              value={category.categoryId}
              onChange={(e) => handleCategoryChange(Number(e.target.value), index)}
            >
              {categoryLoading ? (
                <option value={0}>Loading...</option>
              ) : categoryError ? (
                <option value={0}>Error loading categories</option>
              ) : (
                categories.map((categoryOption) => (
                  <option key={categoryOption.id} value={categoryOption.id} disabled={selectedCategories.includes(categoryOption.id)}>
                    {categoryOption.name}
                  </option>
                ))
              )}
            </select>
          </label>
          <button type="button" onClick={() => handleRemoveCategory(index)} disabled={recipeData.categories.length === 1}>
            Remove Category
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddCategory} disabled={categories.length === selectedCategories.length}>
        Add Category
      </button>

      <button type="submit">Submit</button>
    </form>
  );
};

export default RecipeForm;
