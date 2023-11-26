import { Request, Response } from 'express';
import Category from '../models/category';
import RecipeCategory from '../models/RecipeCategory';
const getAllCategories = async (req: Request, res: Response) => {
  try {
    // Fetch all categories from the database
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
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
};

const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    // Create a new category in the database
    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateCategory = async (req: Request, res: Response) => {
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
};

const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Check if the category exists
    const existingCategory = await Category.findByPk(id);
    if (!existingCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await existingCategory.destroy();

    // Delete the category from RecipeCategory table first
    const deletedRecipeCategoryCount = await RecipeCategory.destroy({ where: { categoryId: id } });

    // If there were associated records in RecipeCategory
    if (deletedRecipeCategoryCount > 0) {
      // Proceed to delete the category
      await existingCategory.destroy();

      return res.json({ message: 'Category deleted successfully' });
    } else {
      return res.status(500).json({ message: 'Error deleting associated records' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
