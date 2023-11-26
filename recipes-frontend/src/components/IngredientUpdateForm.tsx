import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IngredientC } from './interface';
import { useGetAllIngredients } from '../hooks/useIngredient';
import './IngredientForm.css';
const IngredientUpdateForm = ({ ingredientId, onCloseUpdateForm }: { ingredientId: number, onCloseUpdateForm: any }) => {
  const { isLoading, error, ingredients } = useGetAllIngredients();

  const [ingredientData, setIngredientData] = useState<IngredientC>({
    id: 0,
    name: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    // Search for the ingredient with the given ingredientId
    const selectedIngredient = ingredients.find((ingredient) => ingredient.id === ingredientId);

    if (selectedIngredient) {
      setIngredientData(selectedIngredient);
    }
  }, [ingredientId, ingredients]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setIngredientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:9090/api/ingredients/updateIngredient/${ingredientId}`, ingredientData);
      console.log('Ingredient updated successfully:', response.data);
      onCloseUpdateForm(); // Close the form after successful submission
      // Optionally, you can handle the response or perform additional actions here
    } catch (error) {
      console.error('Error updating ingredient:', error);
      // Handle the error as needed
    }
  };

  return (
    <form className="ingredient-form" onSubmit={handleSubmit}>
    <label className="ingredient-label">
      Name:
      <input
        className="ingredient-input"
        type="text"
        name="name"
        value={ingredientData.name}
        onChange={handleInputChange}
      />
    </label>
    <label className="ingredient-label">
      Description:
      <textarea
        className="ingredient-textarea"
        name="description"
        value={ingredientData.description}
        onChange={handleInputChange}
      />
    </label>
    <label className="ingredient-label">
      Image:
      <input
        className="ingredient-input"
        type="text"
        name="image"
        value={ingredientData.image}
        onChange={handleInputChange}
      />
    </label>

    <button className="ingredient-button" type="submit">
      Submit
    </button>
    </form>
  );
};

export default IngredientUpdateForm;
