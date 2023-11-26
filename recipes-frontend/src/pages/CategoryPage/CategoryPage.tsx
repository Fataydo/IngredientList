import React from 'react';
import { useGetAllCategories } from '../../hooks/useCategory';
import { Category as CategoryInterface } from '../../components/interface';
function Category() {
  const { isLoading, error, categories } = useGetAllCategories();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};
  
  export default Category
  