import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/recipe" className="nav-link">Recipe</Link>
        </li>
        <li className="nav-item">
          <Link to="/ingredient" className="nav-link">Ingredient</Link>
        </li>
        <li className="nav-item">
          <Link to="/category" className="nav-link">Category</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
