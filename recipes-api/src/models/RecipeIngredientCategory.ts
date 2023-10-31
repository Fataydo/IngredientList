import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/connection'; // Assuming Sequelize for database

class RecipeIngredientCategory extends Model {
  public id!: number;
  public recipeId!: number;
  public ingredientId!: number;
  public categoryId!: number;

  static associate(models: any) {
    RecipeIngredientCategory.belongsTo(models.Recipe, { foreignKey: 'recipeId' });
    RecipeIngredientCategory.belongsTo(models.Ingredient, { foreignKey: 'ingredientId' });
    RecipeIngredientCategory.belongsTo(models.Category, { foreignKey: 'categoryId' });
  }
}

RecipeIngredientCategory.init(
  {
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Recipes',
        key: 'id',
      },
    },
    ingredientId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Ingredients',
        key: 'id',
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Categories',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'RecipeIngredientCategory',
    schema: 'recipeingredientcategory',
  }
);

export default RecipeIngredientCategory;