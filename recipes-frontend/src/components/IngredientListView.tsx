import React from 'react';
import { IngredientC } from './interface';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import "./IngredientListView.css"

interface IngredientListViewProps {
  ingredients: IngredientC[];
  onIngredientClick: (ingredient: IngredientC) => void;
  onUpdateClick: (ingredient: IngredientC) => void;
  onDeleteClick: (ingredient: IngredientC) => void;
  selectedIngredient: IngredientC | null;
}

const IngredientListView: React.FC<IngredientListViewProps> = ({ ingredients, onIngredientClick, onUpdateClick, onDeleteClick, selectedIngredient }) => (
  <div className="ingredient-list-view">
    <h1>Ingredient List</h1>
    <ul className="ingredient-list">
      {ingredients.map((ingredient) => (
        <React.Fragment key={ingredient.id}>
          <li
            className="ingredient-item"
            onClick={() => onIngredientClick(ingredient)}
          >
            <p className="ingredient-name">{ingredient.name}</p>
            <p className="ingredient-description">{ingredient.description}</p>
            <p className="ingredient-image">{ingredient.image}</p>
          </li>
          <li className="ingredient-action">
            <button className="update-button" onClick={() => onUpdateClick(ingredient)}>
              <AiOutlineEdit />
              Update
            </button>
          </li>
          <li className="ingredient-action">
            <button className="delete-button" onClick={() => onDeleteClick(ingredient)}>
              <AiOutlineDelete />
              Delete
            </button>
          </li>
        </React.Fragment>
      ))}
    </ul>
  </div>
);

export default IngredientListView;
