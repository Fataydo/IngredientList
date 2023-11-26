import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGetAllCategories } from '../hooks/useCategory';
import './CategoryForm.css';
const CategoryForm = (onCloseForm: any) => {
  const [categoryData, setCategoryData] = useState({
    name: '',
  });

  const { categories } = useGetAllCategories();

  useEffect(() => {
    if (categories.length > 0) {
      setCategoryData({
        ...categoryData,
        name: categories[0].name, // Set default value to the first category name
      });
    }
  }, [categories]);

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
      const response = await axios.post('http://localhost:9090/api/categories/createCategory', categoryData);
      console.log('Category created successfully:', response.data);
      onCloseForm(); // Close the form after successful submission
      // Optionally, you can handle the response or perform additional actions here
    } catch (error) {
      console.error('Error creating category:', error);
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
      <button className="category-button" type="button" onClick={onCloseForm}>Cancel</button>
    </form>
  );
};

export default CategoryForm;
