import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/connection'; // Assuming Sequelize for database
class Recipe extends Model {
  public id!: number;
  public name!: string;
  public steps!: string;
  public description!: string;
  public rating!: number;
  public image!: string;

  static associate(models:any) {
    Recipe.belongsToMany(models.Ingredient, {
      through: models.RecipeIngredient,
      onDelete: 'CASCADE',
    });
    Recipe.belongsToMany(models.Category, {
      through: models.RecipeCategory,
      onDelete: 'CASCADE',
    });
  }
}
Recipe.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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