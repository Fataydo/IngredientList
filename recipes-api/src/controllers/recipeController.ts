import { Request, Response } from "express";
import Recipe from "../models/recipe";
import RecipeCategory from "../models/RecipeCategory";
import RecipeIngredient from "../models/RecipeIngredient";
import Ingredient from '../models/ingredient';
import Category from '../models/category';
import { Op } from "sequelize";
const createRecipe = async (req:Request, res:Response) => {
  try {
    const { name, steps, description, rating, image, ingredients, categories } = req.body;

    // Create a new entry in the 'Recipes' table
    const newRecipe = await Recipe.create({
      name,
      steps,
      description,
      rating,
      image,
    });

    // Associate ingredients with the recipe in the 'RecipeIngredient' table
    ingredients.forEach(async (ingredient:any) => {
      await RecipeIngredient.create({
        recipeId: newRecipe.id,
        ingredientId: ingredient.ingredientId,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
      });
    });

    // Associate categories with the recipe in the 'RecipeCategory' table
    categories.forEach(async (category:any) => {
      await RecipeCategory.create({
        recipeId: newRecipe.id,
        categoryId: category.categoryId,
      });
    });

    res.status(201).json({ message: 'Recipe created successfully', recipe: newRecipe });
  } catch (error:any) {
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
  try {
    const id: number = parseInt(req.params.id, 10); // Assuming id is a number
    const { name, steps, description, rating, image, ingredients, categories } = req.body;

    // Update the details of the recipe in the 'Recipes' table
    const updatedRecipe = await Recipe.update(
      { name, steps, description, rating, image },
      { where: { id } }
    );

    // Handle Ingredients
    if (ingredients && Array.isArray(ingredients) && ingredients.length > 0) {
      for (const ingredient of ingredients) {
        const existingIngredient = await RecipeIngredient.findOne({
          where: {
            recipeId: id,
            ingredientId: ingredient.ingredientId,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
          },
        });

        if (existingIngredient) {
          await RecipeIngredient.update(
            { quantity: ingredient.quantity, unit: ingredient.unit },
            { where: { id: existingIngredient.id } }
          );
        } else {
          await RecipeIngredient.create({
            recipeId: id,
            ingredientId: ingredient.ingredientId,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
          });
        }
      }

      // Delete ingredients that are no longer associated with the recipe
      await RecipeIngredient.destroy({
        where: {
          recipeId: id,
          ingredientId: {
            [Op.notIn]: ingredients.map(ing => ing.ingredientId)
          }
        }
      });
    }

    // Handle Categories
    if (categories && Array.isArray(categories) && categories.length > 0) {
      for (const category of categories) {
        const existingCategory = await RecipeCategory.findOne({
          where: { recipeId: id, categoryId: category.categoryId },
        });

        if (!existingCategory) {
          await RecipeCategory.create({
            recipeId: id,
            categoryId: category.categoryId,
          });
        }
      }

      // Delete categories that are no longer associated with the recipe
      await RecipeCategory.destroy({
        where: {
          recipeId: id,
          categoryId: {
            [Op.notIn]: categories.map(cat => cat.categoryId)
          }
        }
      });
    }

    res.status(200).json({ message: 'Recipe updated successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


const deleteRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Fetch the recipe by its ID and include associated RecipeIngredients and RecipeCategories
    const recipe = await Recipe.findByPk(id, {
      include: [RecipeIngredient, RecipeCategory],
    });

    if (recipe) {
      // Perform cascade delete by calling destroy() on the recipe
      await recipe.destroy();

      res.json({ message: 'Recipe deleted successfully' });
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { deleteRecipe };
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
