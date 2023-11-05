import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/connection'; // Assuming Sequelize for database

class Category extends Model {
  public id!: number;
  public name!: string;

  static associate(models: any) {
    Category.belongsToMany(models.Recipe, {
      through: models.RecipeCategory,
      onDelete: 'CASCADE',
    });
  }
}

Category.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Category',
    schema: 'categories',
  }
);

export default Category;
