// RecipeDetailView.js
import React from 'react';
import { Recipe as RecipeType } from './interface';

interface RecipeDetailViewProps {
  recipe: RecipeType;
}

const RecipeDetailView: React.FC<RecipeDetailViewProps> = ({ recipe }) => (
  <div>
    <p>{recipe.image}</p>
    <p>{recipe.steps}</p>
    <p>{recipe.rating}</p>
    <p>
      Ingredients: {recipe.ingredients.map(ingredient => `${ingredient.name}, ${ingredient.quantity} ${ingredient.unit}`).join(', ')}
    </p>
    <p>
      Categories: {recipe.categories.map(category => category.name).join(', ')}
    </p>
  </div>
);

export default RecipeDetailView;
