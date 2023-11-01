import { sequelize } from './db/connection';

(async () => {
  await sequelize.authenticate();

  await sequelize.createSchema('recipes', { logging: false });
  await sequelize.createSchema('ingredients', { logging: false });
  await sequelize.createSchema('categories', { logging: false });
  await sequelize.createSchema('recipe_ingredients', { logging: false });
  await sequelize.createSchema('recipe_categories', { logging: false });
})();