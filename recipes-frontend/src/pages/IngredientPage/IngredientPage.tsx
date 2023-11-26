import React from 'react';
import { useGetAllIngredients } from '../../hooks/useIngredient';

function Ingredient() {
  const { isLoading, error, ingredients } = useGetAllIngredients();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            <strong>{ingredient.name}</strong>
            <p>Description: {ingredient.description}</p>
            <p>Image: {ingredient.image}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
  
  export default Ingredient
  