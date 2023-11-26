import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGetAllCategories } from '../hooks/useCategory';
import { CategoryC } from './interface';

interface RecipeSearchFormProps {
  onSearch: (searchQuery: string, selectedCategory: string) => void;
}

const RecipeSearchForm: React.FC<RecipeSearchFormProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const { isLoading, error, categories } = useGetAllCategories();

  useEffect(() => {
    // Optionally, you can set a default category here if needed
    // setSelectedCategory(categories.length > 0 ? categories[0].name : '');
  }, [categories]);

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Invoke the onSearch callback with the searchQuery and selectedCategory
    onSearch(searchQuery, selectedCategory);
  };

  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>Error loading categories: {error.message}</p>;
  }

  return (
    <form onSubmit={handleSearch}>
      <label>
        Search Recipes:
        <input type="text" value={searchQuery} onChange={handleSearchQueryChange} />
      </label>
      <label>
        Select Category:
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((category: CategoryC) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Search</button>
    </form>
  );
};

export default RecipeSearchForm;
