import React from 'react';
import { CategoryC } from './interface';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

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
  selectedCategory,
}) => (
  <div>
    <h1>Category List</h1>
    <ul>
      {categories.map((category) => (
        <React.Fragment key={category.id}>
          <li
            onClick={() => onCategoryClick(category)}
            style={{
              cursor: 'pointer',
              borderBottom: selectedCategory && selectedCategory.id === category.id ? '2px solid blue' : 'none',
            }}
          >
            <p>{category.name}</p>
          </li>
          <li>
            <button onClick={() => onUpdateClick(category)}>
              <AiOutlineEdit />
              Update
            </button>
          </li>
          <li>
            <button onClick={() => onDeleteClick(category)}>
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
