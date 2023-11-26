// RecipeListView.js

import React from 'react';
import { Recipe } from './interface';
import RecipeDetailView from './RecipeDetailView';
import RecipeUpdateForm from './RecipeUpdateForm';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import './RecipeListView.css';

interface RecipeListViewProps {
  recipes: Recipe[];
  onRecipeClick: (recipe: Recipe) => void;
  onUpdateClick: (recipe: Recipe) => void;
  onDeleteClick: (recipe: Recipe) => void;
  selectedRecipe: Recipe | null;
}

const RecipeListView: React.FC<RecipeListViewProps> = ({ recipes, onRecipeClick, onUpdateClick, onDeleteClick, selectedRecipe }) => (
  <div className='recipe-list-view'>
    <h1 className='recipe-list-title'>Recipe List</h1>
    <ul className='recipe-list'>
      {recipes.map((recipe) => (
        <React.Fragment key={recipe.id}>
          <li
            className={`recipe-item ${selectedRecipe && selectedRecipe.id === recipe.id}`}
            onClick={() => onRecipeClick(recipe)}
          >
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
          </li>
          {selectedRecipe && selectedRecipe.id === recipe.id && (
            <li className='recipe-detail'>
              <RecipeDetailView
                recipe={{
                  ...selectedRecipe,
                }}
              />
            </li>
          )}
          <div className='buttons'>
          <li className='recipe-action'>
            <button className='update-button' onClick={() => onUpdateClick(recipe)}>
              <AiOutlineEdit />
              Update
            </button>
          </li>
          <li className='recipe-action'>
            <button className='delete-button' onClick={() => onDeleteClick(recipe)}>
              <AiOutlineDelete />
              Delete
            </button>
          </li>
          </div>
        </React.Fragment>
      ))}
    </ul>
    
  </div>
);

export default RecipeListView;
