// IngredientPage.jsx

import React, { useState } from 'react';
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useGetAllIngredients, useDeleteIngredient } from '../../hooks/useIngredient';
import { IngredientC as IngredientInterface } from '../../components/interface';
import IngredientForm from '../../components/IngredientForm';
import IngredientListView from '../../components/IngredientListView';
import IngredientUpdateForm from '../../components/IngredientUpdateForm';
import './IngredientPage.css';

const Ingredient = () => {
  const { ingredients, isLoading, error } = useGetAllIngredients();
  const [selectedIngredient, setSelectedIngredient] = useState<IngredientInterface | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const { deleteIngredient } = useDeleteIngredient();

  if (isLoading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error">Error: {error.message}</p>;
  }

  const handleIngredientClick = (ingredient: IngredientInterface) => {
    if (selectedIngredient && selectedIngredient.id === ingredient.id) {
      setSelectedIngredient(null);
      setIsUpdateFormVisible(false);
    } else {
      setSelectedIngredient(ingredient);
      setIsUpdateFormVisible(true);
    }
  };

  const openForm = () => {
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };

  const openUpdateForm = () => {
    setIsUpdateFormVisible(true);
  };

  const closeUpdateForm = () => {
    setIsUpdateFormVisible(false);
  };

  const handleUpdateClick = (ingredient: IngredientInterface) => {
    setSelectedIngredient(ingredient);
    openUpdateForm();
  };

  const handleDeleteClick = (ingredient: IngredientInterface) => {
    setSelectedIngredient(ingredient);
    deleteIngredient(ingredient.id);
  };

  return (
    <div className="ingredient-page">
      <div className="button-container">
        <button className="add-button" onClick={openForm}>
          <AiOutlinePlus />
          Add
        </button>
        <button className="close-form-button" onClick={closeForm}>
          Close Form
        </button>
        <button className="close-update-form-button" onClick={closeUpdateForm}>
          Close Update Form
        </button>
      </div>

      {isFormVisible && <IngredientForm onClose={closeForm} />}
      {isUpdateFormVisible && (
        <IngredientUpdateForm
          ingredientId={selectedIngredient?.id || 0}
          onCloseUpdateForm={closeUpdateForm}
        />
      )}

      <IngredientListView
        ingredients={ingredients}
        onIngredientClick={handleIngredientClick}
        onUpdateClick={handleUpdateClick}
        onDeleteClick={handleDeleteClick}
        selectedIngredient={selectedIngredient}
      />
    </div>
  );
};

export default Ingredient;
