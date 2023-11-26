import React from 'react';
import { CategoryC } from './interface';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import './CategoryListView.css';
interface CategoryListViewProps {
  categories: CategoryC[];
  onCategoryClick: (category: CategoryC) => void;
  onUpdateClick: (category: CategoryC) => void;
  onDeleteClick: (category: CategoryC) => void;
  selectedCategory: CategoryC | null;
}

const CategoryListView: React.FC<CategoryListViewProps> = ({
  categories,
  onCategoryClick,
  onUpdateClick,
  onDeleteClick,
}) => (
  <div className="category-list-view">
  <h1 className="category-list-title">Category List</h1>
  <ul className="category-list">
    {categories.map((category) => (
      <React.Fragment key={category.id}>
        <li
          className="category-item"
          onClick={() => onCategoryClick(category)}
        >
          <p className="category-name">{category.name}</p>
        </li>
        <li className="update-button-container">
          <button
            className="update-button"
            onClick={() => onUpdateClick(category)}
          >
            <AiOutlineEdit />
            Update
          </button>
        </li>
        <li className="delete-button-container">
          <button
            className="delete-button"
            onClick={() => onDeleteClick(category)}
          >
            <AiOutlineDelete />
            Delete
          </button>
        </li>
      </React.Fragment>
    ))}
  </ul>
</div>

);

export default CategoryListView;
