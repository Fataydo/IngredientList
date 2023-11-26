import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Recipe from './pages/RecipePage/RecipePage';
import Ingredient from './pages/IngredientPage/IngredientPage';
import Category from './pages/CategoryPage/CategoryPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route>
          <Route path="/recipe" element={<Recipe />} />
          <Route path="/ingredient" element={<Ingredient />} />
          <Route path="/category" element={<Category />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
