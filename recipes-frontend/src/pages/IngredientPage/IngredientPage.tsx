import React, { useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineEdit } from 'react-icons/ai';
import { useGetAllIngredients, useDeleteIngredient } from '../../hooks/useIngredient';
import { IngredientC as IngredientInterface } from '../../components/interface';
import IngredientForm from '../../components/IngredientForm';
import IngredientListView from '../../components/IngredientListView';
import IngredientUpdateForm from '../../components/IngredientUpdateForm';

const Ingredient = () => {
  const { ingredients, isLoading, error } = useGetAllIngredients();
  const [selectedIngredient, setSelectedIngredient] = useState<IngredientInterface | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const { deleteIngredient } = useDeleteIngredient();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleIngredientClick = (ingredient: IngredientInterface) => {
    if (selectedIngredient && selectedIngredient.id === ingredient.id) {
      // Clicked the same ingredient again, hide the detail view
      console.log("selectedingredient",selectedIngredient);
      setSelectedIngredient(null);
      setIsUpdateFormVisible(false); // Hide the Update Form when hiding the detail view
    } else {
      setSelectedIngredient(ingredient);
      setIsUpdateFormVisible(true); // Show the Update Form when showing the detail view
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
    openUpdateForm(); // Show the Update Form when the "Update" button is clicked
    console.log('Update button clicked for:', ingredient);
  };

  const handleDeleteClick = (ingredient: IngredientInterface) => {
    setSelectedIngredient(ingredient);
    deleteIngredient(ingredient.id);
    console.log('Delete button clicked for:', ingredient);
  };

  return (
    <div>
      <div>
        <button onClick={openForm}>
          <AiOutlinePlus />
          Add
        </button>
        <button onClick={closeForm}>
          Close Form
        </button>
        <button onClick={closeUpdateForm}>
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
