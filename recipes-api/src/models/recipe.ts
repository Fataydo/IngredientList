import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/connection'; // Assuming Sequelize for database
class Recipe extends Model {
  public id!: number;
  public name!: string;
  public steps!: string;
  public description!: string;
  public rating!: number;
  public image!: string;

  static associate(models: any) {
    Recipe.hasMany(models.RecipeIngredient, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });

    Recipe.hasMany(models.RecipeCategory, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
  }
}
Recipe.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    steps: {
        type: DataTypes.TEXT,
      },
    description: {
      type: DataTypes.TEXT,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Recipe',
    schema: 'recipes',
  }
);

export default Recipe;