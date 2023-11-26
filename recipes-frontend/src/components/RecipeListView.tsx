import React from 'react';
import { Recipe } from './interface';
import RecipeDetailView from './RecipeDetailView';
import RecipeUpdateForm from './RecipeUpdateForm';
import { AiOutlineEdit, AiOutlineDelete  } from 'react-icons/ai';

interface RecipeListViewProps {
  recipes: Recipe[];
  onRecipeClick: (recipe: Recipe) => void;
  onUpdateClick: (recipe: Recipe) => void;
  onDeleteClick: (recipe: Recipe) => void;
  selectedRecipe: Recipe | null;
}

const RecipeListView: React.FC<RecipeListViewProps> = ({ recipes, onRecipeClick, onUpdateClick,onDeleteClick, selectedRecipe }) => (
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
          <li>
            <button onClick={() => onUpdateClick(recipe)}>
              <AiOutlineEdit />
              Update
            </button>
          </li>
          <li>
          <button onClick={() => onDeleteClick(recipe)}>
          <AiOutlineDelete  />
          Delete
        </button>
          </li>
        </React.Fragment>
      ))}
    </ul>
  </div>
);

export default RecipeListView;
