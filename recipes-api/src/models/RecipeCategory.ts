import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/connection';

class RecipeCategory extends Model {
  public id!: number;
  public recipeId!: number;
  public categoryId!: number;

  static associate(models:any) {
    RecipeCategory.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
    });
    RecipeCategory.belongsTo(models.Category, {
      foreignKey: 'categoryId',
    });
  }
}

RecipeCategory.init({
  recipeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Recipe',
      key: 'id',
    },
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Category',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'RecipeCategory',
  schema: 'recipe_categories',
});

export default RecipeCategory;