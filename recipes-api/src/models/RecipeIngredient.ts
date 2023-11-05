import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/connection';
class RecipeIngredient extends Model {
    public id!: number;
    public recipeId!: number;
    public ingredientId!: number;
    public quantity!: number;
    public unit!: string;
  
    static associate(models:any) {
        RecipeIngredient.belongsTo(models.Recipe, {
          foreignKey: 'recipeId',
          onDelete: 'CASCADE',
        });
        RecipeIngredient.belongsTo(models.Ingredient, {
          foreignKey: 'ingredientId',
          onDelete: 'CASCADE',
        });
      }
  }
  
  RecipeIngredient.init({
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Recipes',
          schema: 'recipes',
        },
        key: 'id',
      },
    },
    ingredientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Ingredients',
          schema: 'ingredients',
        },
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.FLOAT,
    },
    unit: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'RecipeIngredient',
    schema: 'recipe_ingredients',
  });
  
  export default RecipeIngredient;