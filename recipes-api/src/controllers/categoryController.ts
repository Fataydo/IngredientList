import { Request, Response } from 'express';
import Category from '../models/category';

const categoryController = {
  async getAllCategories(req: Request, res: Response) {
    try {
      // Fetch all categories from the database
      const categories = await Category.findAll();
      res.json(categories);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async getCategoryById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      // Fetch a category by its ID from the database
      const category = await Category.findByPk(id);
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ error: 'Category not found' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async createCategory(req: Request, res: Response) {
    const { name } = req.body;
    try {
      // Create a new category in the database
      const newCategory = await Category.create({ name });
      res.status(201).json(newCategory);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateCategory(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      // Find the existing category by ID
      const category = await Category.findByPk(id);

      if (category) {
        // Update the category
        await category.update({ name });
        res.json(category);
      } else {
        res.status(404).json({ error: 'Category not found' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteCategory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      // Delete a category by its ID from the database
      const category = await Category.findByPk(id);

      if (category) {
        await category.destroy();
        res.json({ message: 'Category deleted successfully' });
      } else {
        res.status(404).json({ error: 'Category not found' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default categoryController;
