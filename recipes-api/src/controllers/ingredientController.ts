import { Request, Response } from 'express';
import Ingredient from '../models/ingredient';
import RecipeIngredient from '../models/RecipeIngredient';
const getAllIngredients = async (req: Request, res: Response) => {
  try {
    const ingredients = await Ingredient.findAll();
    res.json(ingredients);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getIngredientById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ingredient = await Ingredient.findByPk(id);
    if (ingredient) {
      res.json(ingredient);
    } else {
      res.status(404).json({ message: 'Ingredient not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const createIngredient = async (req: Request, res: Response) => {
  const { name, description, image } = req.body;
  try {
    const newIngredient = await Ingredient.create({ name, description, image });
    res.status(201).json(newIngredient);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateIngredient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, image } = req.body;
  try {
    const ingredient = await Ingredient.findByPk(id);
    if (ingredient) {
      await ingredient.update({ name, description, image });
      res.json(ingredient);
    } else {
      res.status(404).json({ message: 'Ingredient not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const deleteIngredient = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Check if the ingredient exists
    const existingIngredient = await Ingredient.findByPk(id);
    if (!existingIngredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }

    // Delete the ingredient from RecipeIngredients table first
    const deletedRecipeIngredient = await RecipeIngredient.destroy({ where: { ingredientId: id } });

    // If there were associated records in RecipeIngredients
    if (deletedRecipeIngredient > 0) {
      // Proceed to delete the ingredient
      const deletedIngredient = await Ingredient.destroy({ where: { id } });

      if (deletedIngredient > 0) {
        return res.json({ message: 'Ingredient deleted successfully' });
      } else {
        return res.status(500).json({ message: 'Error deleting ingredient' });
      }
    } else {
      return res.status(500).json({ message: 'Error deleting associated records' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

  export default {
    getAllIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredient,
  };
