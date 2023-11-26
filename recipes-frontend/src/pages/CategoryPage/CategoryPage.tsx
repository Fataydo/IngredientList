import React, { useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineEdit } from 'react-icons/ai';
import { useGetAllCategories, useDeleteCategory } from '../../hooks/useCategory';
import { CategoryC as CategoryInterface } from '../../components/interface';
import CategoryForm from '../../components/CategoryForm';
import CategoryListView from '../../components/CategoryListView';
import CategoryUpdateForm from '../../components/CategoryUpdateForm';
import './CategoryPage.css';
const CategoryPage = () => {
  const { categories, isLoading, error } = useGetAllCategories();
  const [selectedCategory, setSelectedCategory] = useState<CategoryInterface | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const { deleteCategory } = useDeleteCategory();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleCategoryClick = (category: CategoryInterface) => {
    if (selectedCategory && selectedCategory.id === category.id) {
      // Clicked the same category again, hide the detail view
      setSelectedCategory(null);
      setIsUpdateFormVisible(false); // Hide the Update Form when hiding the detail view
    } else {
      setSelectedCategory(category);
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

  const handleUpdateClick = (category: CategoryInterface) => {
    setSelectedCategory(category);
    openUpdateForm(); // Show the Update Form when the "Update" button is clicked
  };

  const handleDeleteClick = (category: CategoryInterface) => {
    setSelectedCategory(category);
    deleteCategory(category.id);
  };

  return (
<div className="category-page-container">
  <div className="buttons-container">
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

  {isFormVisible && <CategoryForm onClose={closeForm} />}
  {isUpdateFormVisible && (
    <CategoryUpdateForm
      categoryId={selectedCategory?.id || 0}
      onCloseUpdateForm={closeUpdateForm}
    />
  )}

  <CategoryListView
    categories={categories}
    onCategoryClick={handleCategoryClick}
    onUpdateClick={handleUpdateClick}
    onDeleteClick={handleDeleteClick}
    selectedCategory={selectedCategory}
  />
</div>

  );
};

export default CategoryPage;
