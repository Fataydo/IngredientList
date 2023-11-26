import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGetAllIngredients } from '../hooks/useIngredient';


const IngredientForm = ( onCloseForm:any ) => {
  const [ingredientData, setIngredientData] = useState({
    name: '',
    description: '',
    image: '',
  });

  const { isLoading, error, ingredients } = useGetAllIngredients();

  useEffect(() => {
    if (ingredients.length > 0) {
      setIngredientData({
        ...ingredientData,
        name: ingredients[0].name, // Set default value to the first ingredient name
      });
    }
  }, [ingredients]);

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
      const response = await axios.post('http://localhost:9090/api/ingredients/createIngredient', ingredientData);
      console.log('Ingredient created successfully:', response.data);
      onCloseForm(); // Close the form after successful submission
      // Optionally, you can handle the response or perform additional actions here
    } catch (error) {
      console.error('Error creating ingredient:', error);
      // Handle the error as needed
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={ingredientData.name} onChange={handleInputChange} />
      </label>
      <label>
        Description:
        <textarea name="description" value={ingredientData.description} onChange={handleInputChange} />
      </label>
      <label>
        Image:
        <input type="text" name="image" value={ingredientData.image} onChange={handleInputChange} />
      </label>

      {/* Additional fields can be added based on the IngredientC interface */}

      <button type="submit">Submit</button>
      <button type="button" onClick={onCloseForm}>Cancel</button>
    </form>
  );
};

export default IngredientForm;
