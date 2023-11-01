import { sequelize } from './src/db/connection';
import Recipe from './src/models/recipe';
import Ingredient from './src/models/ingredient';
import Category from './src/models/category';
import RecipeIngredient from './src/models/RecipeIngredient';
import RecipeCategory from './src/models/RecipeCategory';

(async () => {
  await sequelize.authenticate();

  // Create the schemas
  await require('./src/schema');
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  // Sync the Sequelize models
  await Recipe.sync({ force: true });
  await Ingredient.sync({ force: true });
  await Category.sync({ force: true });
  await RecipeIngredient.sync({ force: true });
  await RecipeCategory.sync({ force: true });
  
  console.log('Tables created successfully!');
})();