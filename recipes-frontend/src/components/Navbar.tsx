import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/recipe">Recipe</Link>
        </li>
        <li>
          <Link to="/ingredient">Ingredient</Link>
        </li>
        <li>
          <Link to="/category">Category</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;