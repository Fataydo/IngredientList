import { Request, Response } from 'express';
import Ingredient from '../models/ingredient';

const ingredientController = {
  async getAllIngredients(req: Request, res: Response) {
    try {
      const ingredients = await Ingredient.findAll();
      res.json(ingredients);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async getIngredientById(req: Request, res: Response) {
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
  },

  async createIngredient(req: Request, res: Response) {
    const { name, description, image } = req.body;
    try {
      const newIngredient = await Ingredient.create({ name, description, image });
      res.status(201).json(newIngredient);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateIngredient(req: Request, res: Response) {
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
  },

  async deleteIngredient(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deletedCount = await Ingredient.destroy({ where: { id } });
      if (deletedCount > 0) {
        res.json({ message: 'Ingredient deleted successfully' });
      } else {
        res.status(404).json({ message: 'Ingredient not found' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default ingredientController;
