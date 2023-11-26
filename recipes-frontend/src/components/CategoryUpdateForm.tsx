import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CategoryC } from './interface';
import { useGetAllCategories } from '../hooks/useCategory';
import "./CategoryUpdateForm.css";
const CategoryUpdateForm = ({ categoryId, onCloseUpdateForm }: { categoryId: number, onCloseUpdateForm: any }) => {
  const { categories } = useGetAllCategories();

  const [categoryData, setCategoryData] = useState<CategoryC>({
    id: 0,
    name: '',
  });

  useEffect(() => {
    // Search for the category with the given categoryId
    const selectedCategory = categories.find((category) => category.id === categoryId);

    if (selectedCategory) {
      setCategoryData(selectedCategory);
    }
  }, [categoryId, categories]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCategoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:9090/api/categories/updateCategory/${categoryId}`, categoryData);
      console.log('Category updated successfully:', response.data);
      onCloseUpdateForm(); // Close the form after successful submission
      // Optionally, you can handle the response or perform additional actions here
    } catch (error) {
      console.error('Error updating category:', error);
      // Handle the error as needed
    }
  };

  return (
<form className="category-form" onSubmit={handleSubmit}>
  <label className="category-label">
    Name:
    <input
      className="category-input"
      type="text"
      name="name"
      value={categoryData.name}
      onChange={handleInputChange}
    />
  </label>

  <button className="category-button" type="submit">
    Submit
  </button>
  <button className="category-button" type="button" onClick={onCloseUpdateForm}>
    Cancel
  </button>
</form>

  );
};

export default CategoryUpdateForm;
