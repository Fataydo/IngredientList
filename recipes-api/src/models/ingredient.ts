import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/connection'; // Assuming Sequelize for database

class Ingredient extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public image!: string;

  static associate(models:any) {
    Ingredient.belongsToMany(models.Recipe, {
      through: models.RecipeIngredient,
      onDelete: 'CASCADE',
    });
  }
}

Ingredient.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Ingredient',
    schema: 'ingredients',
  }
);

export default Ingredient;
