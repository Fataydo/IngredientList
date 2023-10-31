import { Request, Response } from "express";
import Recipe from "../models/Recipe";
import RecipeIngredientCategory from '../models/recipeIngredientCategory';
import Ingredient from '../models/ingredient';
import Category from '../models/category';

const createRecipe = async (req: Request, res: Response) => {
  const { name, steps, description, rating, image } = req.body;
  console.log(req.body);
  try {
    const newRecipe = await Recipe.create({
      name,
      steps,
      description,
      rating,
      image,
    });

    await newRecipe.save();

    res.status(201).json(newRecipe); // Respond with the newly created recipe and 201 status code
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getAllRecipes = async (req: Request, res: Response) => {
  try {
    // Get all recipes from the database
    const recipes = await Recipe.findAll();

    // Send the recipes to the client
    res.json(recipes);
  } catch (error: any) {
    // Handle the error
    res.status(500).json({ error: error.message });
  }
};

const getRecipeById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Get the recipe by its ID from the database
    const recipe = await Recipe.findByPk(id);

    // If the recipe was found, send it to the client
    if (recipe) {
      res.json(recipe);
    } else {
      // If the recipe was not found, send a 404 error
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error: any) {
    // Handle the error
    res.status(500).json({ error: error.message });
  }
};

const updateRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, steps, rating, images, ingredients, categoryIds } = req.body;

  try {
    // Get the recipe by its ID from the database
    const recipe = await Recipe.findByPk(id);

    // If the recipe was not found, send a 404 error
    if (!recipe) {
      res.status(404).json({ error: 'Recipe not found' });
      return;
    }

    // Update the recipe
    await recipe.update({ name, description, steps, rating, images });

    // Update the recipe's ingredients
    await RecipeIngredientCategory.destroy({ where: { recipeId: id } });
    for (const ingredient of ingredients) {
      await RecipeIngredientCategory.create({
        recipeId: id,
        ingredientId: ingredient.id,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
      });
    }

    // Update the recipe's categories
    await RecipeCategory.destroy({ where: { recipeId: id } });
    for (const categoryId of categoryIds) {
      await RecipeCategory.create({
        recipeId: id,
        categoryId,
      });
    }

    // Save the recipe
    await recipe.save();

    // Send the updated recipe to the client
    res.json(recipe);
  } catch (error: any) {
    // Handle the error
    res.status(500).json({ error: error.message });
  }
};

const deleteRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Logic to delete a recipe by its ID from the database
    // Example:
    // await Recipe.destroy({ where: { id } });
    // res.json({ message: 'Recipe deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
const getRecipesByIngredient = async (req: Request, res: Response) => {
  const { ingredient } = req.params;
  try {
    // Logic to fetch recipes by a specific ingredient from the database
    // Example:
    // const recipes = await Recipe.findAll({
    //   include: [{ model: Ingredient, where: { name: ingredient } }],
    // });
    // res.json(recipes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
const searchRecipes = async (req: Request, res: Response) => {
  const { name, categories } = req.query;
  try {
    // Logic to search recipes by name and optional categories from the database
    // Example:
    // let query = { where: {} };
    // if (name) query.where.name = name;
    // if (categories) query.include = [{ model: Category, where: { name: categories } }];
    // const recipes = await Recipe.findAll(query);
    // res.json(recipes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
// Implement other CRUD operations for recipes (update, delete, etc.)

export default {
  getAllRecipes,
  createRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getRecipesByIngredient,
  searchRecipes,
};
