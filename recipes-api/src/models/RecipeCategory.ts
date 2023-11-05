import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/connection';

class RecipeCategory extends Model {
  public id!: number;
  public recipeId!: number;
  public categoryId!: number;

  static associate(models:any) {
    RecipeCategory.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    RecipeCategory.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE',
    });
  }
}

RecipeCategory.init({
  recipeId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: {
        tableName: 'Recipes',
        schema: 'recipes',
      },
      key: 'id',
    },
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: {
        tableName: 'Categories',
        schema: 'categories',
      },
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'RecipeCategory',
  schema: 'recipe_categories',
});

export default RecipeCategory;