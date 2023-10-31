import { sequelize } from './src/db/connection';
import Recipe from './src/models/Recipe';
import Ingredient from './src/models/ingredient';
import Category from './src/models/category';
import RecipeIngredientCategory from './src/models/recipeIngredientCategory';

(async () => {
  await sequelize.authenticate();

  // Create the tables
  await Recipe.sync();
  await Ingredient.sync();
  await Category.sync();

  console.log('Tables created successfully!');
})();