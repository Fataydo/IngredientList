import React from 'react';
import { Recipe } from './interface';
import RecipeDetailView from './RecipeDetailView';
interface RecipeListViewProps {
  recipes: Recipe[];
  onRecipeClick: (recipe: Recipe) => void;
  selectedRecipe: Recipe | null;
}

const RecipeListView: React.FC<RecipeListViewProps> = ({ recipes, onRecipeClick, selectedRecipe }) => (
  <div>
    <h1>Recipe List</h1>
    <ul>
      {recipes.map((recipe) => (
        <React.Fragment key={recipe.id}>
          <li
            onClick={() => onRecipeClick(recipe)}
            style={{ cursor: 'pointer', borderBottom: selectedRecipe && selectedRecipe.id === recipe.id ? '2px solid blue' : 'none' }}
          >
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
          </li>
          {selectedRecipe && selectedRecipe.id === recipe.id && (
            <li>
              <RecipeDetailView
                recipe={{
                  ...selectedRecipe,
                }}
              />
            </li>
          )}
        </React.Fragment>
      ))}
    </ul>
  </div>
);

export default RecipeListView;
