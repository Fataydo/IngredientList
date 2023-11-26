import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RecipeC, IngredientC, Category } from './interface';
import { useGetAllIngredients } from '../hooks/useIngredient';
import { useGetAllCategories } from '../hooks/useCategory';
import { useGetAllRecipes } from '../hooks/useRecipe';
import "./RecipeUpdateForm.css"
const RecipeUpdateForm = ({ recipeId }: { recipeId: number, onCloseUpdateForm:any }) => {
    const { recipes } = useGetAllRecipes();
    const { isLoading: ingredientLoading, error: ingredientError, ingredients } = useGetAllIngredients();
    const { isLoading: categoryLoading, error: categoryError, categories } = useGetAllCategories();

    const [recipeData, setRecipeData] = useState<RecipeC>({
        name: '',
        steps: '',
        description: '',
        rating: 0,
        image: '',
        ingredients: [],
        categories: [],
      });
    const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

    useEffect(() => {
        // Search for the recipe with the given recipeId
        const selectedRecipe = recipes.find((recipe) => recipe.id === recipeId);

        if (selectedRecipe) {
            const mappedIngredients = selectedRecipe.ingredients.map((ingredient) => {
                const foundIngredient = ingredients.find((item) => item.name === ingredient.name);
                return {
                    ingredientId: foundIngredient ? foundIngredient.id : 0, // Use a default value if not found
                    quantity: ingredient.quantity,
                    unit: ingredient.unit,
                };
            });

            const mappedCategories = selectedRecipe.categories.map((category) => {
                const foundCategory = categories.find((item) => item.name === category.name);
                return {
                    categoryId: foundCategory ? foundCategory.id : 0, // Use a default value if not found
                };
            });

            setRecipeData({
                name: selectedRecipe.name,
                steps: selectedRecipe.steps,
                description: selectedRecipe.description,
                rating: selectedRecipe.rating,
                image: selectedRecipe.image,
                ingredients: mappedIngredients,
                categories: mappedCategories,
            });

            setSelectedIngredients(mappedIngredients.map((ingredient) => ingredient.ingredientId));
            setSelectedCategories(mappedCategories.map((category) => category.categoryId));
        }
    }, [recipeId, recipes, ingredients, categories]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setRecipeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleIngredientChange = (field: string, value: string | number, index: number) => {
        setRecipeData((prevData) => {
            const updatedIngredients = [...prevData.ingredients];
            updatedIngredients[index] = {
                ...updatedIngredients[index],
                [field]: value,
            };

            return {
                ...prevData,
                ingredients: updatedIngredients,
            };
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
            console.log("recipedata", recipeData)
            const response = await axios.put(`http://localhost:9090/api/recipes/updateRecipe/${recipeId}`, recipeData);
            console.log('Recipe updated successfully:', response.data);
            // Optionally, you can handle the response or perform additional actions here
        } catch (error) {
            console.error('Error updating recipe:', error);
            // Handle the error as needed
        }
    };

    return (
        <form className="recipe-update-form" onSubmit={handleSubmit}>
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
                                    <option
                                        key={ingredientOption.id}
                                        value={ingredientOption.id}
                                        disabled={selectedIngredients.includes(ingredientOption.id)}
                                    >
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
                    <button
                        type="button"
                        onClick={() => handleRemoveIngredient(index)}
                        disabled={recipeData.ingredients.length === 1}
                    >
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
                                    <option
                                        key={categoryOption.id}
                                        value={categoryOption.id}
                                        disabled={selectedCategories.includes(categoryOption.id)}
                                    >
                                        {categoryOption.name}
                                    </option>
                                ))
                            )}
                        </select>
                    </label>
                    <button
                        type="button"
                        onClick={() => handleRemoveCategory(index)}
                        disabled={recipeData.categories.length === 1}
                    >
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

export default RecipeUpdateForm;
