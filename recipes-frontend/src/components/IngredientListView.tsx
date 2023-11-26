// Ingredient.tsx
import React from 'react';
import { IngredientC } from './interface';
import { AiOutlineEdit, AiOutlineDelete  } from 'react-icons/ai';

interface IngredientListViewProps {
  ingredients: IngredientC[];
  onIngredientClick: (ingredient: IngredientC) => void;
  onUpdateClick: (ingredient: IngredientC) => void;
  onDeleteClick: (ingredient: IngredientC) => void;
  selectedIngredient: IngredientC | null;
}

const IngredientListView: React.FC<IngredientListViewProps> = ({ ingredients, onIngredientClick, onUpdateClick, onDeleteClick, selectedIngredient }) => (
  <div>
    <h1>Ingredient List</h1>
    <ul>
      {ingredients.map((ingredient) => (
        <React.Fragment key={ingredient.id}>
          <li
            onClick={() => onIngredientClick(ingredient)}
            style={{ cursor: 'pointer', borderBottom: selectedIngredient && selectedIngredient.id === ingredient.id ? '2px solid blue' : 'none' }}
          >
            <p>{ingredient.name}</p>
            <p>{ingredient.description}</p>
            <p>{ingredient.image}</p>
          </li>
          <li>
            <button onClick={() => onUpdateClick(ingredient)}>
              <AiOutlineEdit />
              Update
            </button>
          </li>
          <li>
            <button onClick={() => onDeleteClick(ingredient)}>
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
