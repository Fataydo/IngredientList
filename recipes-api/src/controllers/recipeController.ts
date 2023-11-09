import { Request, Response } from "express";
import Recipe from "../models/recipe";
import RecipeCategory from "../models/RecipeCategory";
import RecipeIngredient from "../models/RecipeIngredient";
import Ingredient from '../models/ingredient';
import Category from '../models/category';
import { Op, WhereOptions } from "sequelize";

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
    const recipes = await Recipe.findAll({
      attributes: ['id', 'name', 'steps', 'description', 'rating', 'image'],
      raw: true,
    });

    const recipesWithAssociatedData = await Promise.all(
      recipes.map(async (recipe: any) => {
        const recipeId = recipe.id;

        // Fetch RecipeIngredient records including quantity and unit
        const recipeIngredients = await RecipeIngredient.findAll({
          where: { recipeId },
          attributes: ['ingredientId', 'quantity', 'unit'],
          raw: true,
        });

        const ingredients = await Promise.all(
          recipeIngredients.map(async (record: any) => {
            const { ingredientId, quantity, unit } = record;

            // Fetch Ingredient names using the fetched IDs
            const ingredient = await Ingredient.findByPk(ingredientId, {
              attributes: ['name'],
              raw: true,
            });

            return { ...ingredient, quantity, unit };
          })
        );

        // Fetch RecipeCategory records
        const categoryIds = await RecipeCategory.findAll({
          where: { recipeId },
          attributes: ['categoryId'],
          raw: true,
        });

        // Fetch Category names using the fetched IDs
        const categories = await Promise.all(
          categoryIds.map(async (record: any) => {
            const category = await Category.findByPk(record.categoryId, {
              attributes: ['name'],
              raw: true,
            });
            return category;
          })
        );

        return {
          ...recipe,
          ingredients,
          categories,
        };
      })
    );
    recipesWithAssociatedData.sort((a, b) => a.id - b.id);

    res.json(recipesWithAssociatedData);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};



const getRecipeByName = async (req: Request, res: Response) => {
  const { name } = req.params;

  try {
    const recipe = await Recipe.findOne({
      where: { name },
      attributes: ['id', 'name', 'steps', 'description', 'rating', 'image'],
      raw: true,
    });

    if (!recipe) {
      res.status(404).json({ error: 'Recipe not found' });
      return;
    }

    const recipeId = recipe.id;

    // Fetch RecipeIngredient records including quantity and unit
    const recipeIngredients = await RecipeIngredient.findAll({
      where: { recipeId },
      attributes: ['ingredientId', 'quantity', 'unit'],
      raw: true,
    });

    const ingredients = await Promise.all(
      recipeIngredients.map(async (record: any) => {
        const { ingredientId, quantity, unit } = record;

        // Fetch Ingredient names using the fetched IDs
        const ingredient = await Ingredient.findByPk(ingredientId, {
          attributes: ['name'],
          raw: true,
        });

        return { ...ingredient, quantity, unit };
      })
    );

    // Fetch RecipeCategory records
    const categoryIds = await RecipeCategory.findAll({
      where: { recipeId },
      attributes: ['categoryId'],
      raw: true,
    });

    // Fetch Category names using the fetched IDs
    const categories = await Promise.all(
      categoryIds.map(async (record: any) => {
        const category = await Category.findByPk(record.categoryId, {
          attributes: ['name'],
          raw: true,
        });
        return category;
      })
    );

    const result = {
      ...recipe,
      ingredients,
      categories,
    };

    res.json(result);
  } catch (error: any) {
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
    const recipe = await Recipe.findByPk(id);

    if (recipe) {
      // Find and delete associated RecipeIngredients
      const recipeIngredients = await RecipeIngredient.findAll({ where: { recipeId: id } });

      if (recipeIngredients.length > 0) {
        // If associated RecipeIngredients exist, delete them first
        await RecipeIngredient.destroy({ where: { recipeId: id } });
      }
      // Find and delete associated RecipeCategories
      const recipeCategories = await RecipeCategory.findAll({ where: { recipeId: id } });

      if (recipeCategories.length > 0) {
        // If associated RecipeCategories exist, delete them
        await RecipeCategory.destroy({ where: { recipeId: id } });
      }
      // Once associated RecipeIngredients are deleted (if any), delete the Recipe
      await recipe.destroy();

      res.json({ message: 'Recipe and associated RecipeIngredients deleted successfully' });
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


const getRecipesByIngredient = async (req: Request, res: Response) => {
  const { ingredient } = req.params;

  try {
    // Find the ingredient ID or get the ingredient directly if it's an object
    const foundIngredient = await Ingredient.findOne({
      where: { name: ingredient } // Assuming the name is used to query the ingredient
    });

    if (!foundIngredient) {
      return res.status(404).json({ error: 'Ingredient not found' });
    }

    const ingredientId = foundIngredient.id;

    // Find all Recipe IDs associated with the given ingredient from RecipeIngredient
    const recipeIds = await RecipeIngredient.findAll({
      attributes: ['recipeId'],
      where: { ingredientId }
    });

    if (recipeIds.length === 0) {
      return res.json({ message: 'No recipes found with this ingredient' });
    }

    // Extract the IDs into an array
    const ids = recipeIds.map((recipe) => recipe.recipeId);

    // Find all recipes with the extracted IDs
    const recipes = await Recipe.findAll({
      where: { id: ids },
      raw: true
    });

    const recipesWithAssociatedData = await Promise.all(
      recipes.map(async (recipe: any) => {
        const recipeId = recipe.id;

        // Fetch RecipeIngredient records including quantity and unit
        const recipeIngredients = await RecipeIngredient.findAll({
          where: { recipeId },
          attributes: ['ingredientId', 'quantity', 'unit'],
          raw: true
        });

        const ingredients = await Promise.all(
          recipeIngredients.map(async (record: any) => {
            const { ingredientId, quantity, unit } = record;

            // Fetch Ingredient names using the fetched IDs
            const ingredient = await Ingredient.findByPk(ingredientId, {
              attributes: ['name'],
              raw: true
            });

            return { ...ingredient, quantity, unit };
          })
        );

        // Fetch RecipeCategory records
        const categoryIds = await RecipeCategory.findAll({
          where: { recipeId },
          attributes: ['categoryId'],
          raw: true
        });

        // Fetch Category names using the fetched IDs
        const categories = await Promise.all(
          categoryIds.map(async (record: any) => {
            const category = await Category.findByPk(record.categoryId, {
              attributes: ['name'],
              raw: true
            });
            return category;
          })
        );

        return {
          ...recipe,
          ingredients,
          categories
        };
      })
    );
    recipesWithAssociatedData.sort((a, b) => a.id - b.id);

    res.json({ recipes: recipesWithAssociatedData });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


const searchRecipes = async (req: Request, res: Response) => {
  const { name, categories } = req.query;


  try {
    let whereCondition: WhereOptions = {};

    if (name) {
      whereCondition['name'] = { [Op.iLike]: `%${name}%` };
    }

    if (categories) {
      const categoriesArray = Array.isArray(categories) ? categories : [categories];

      const categoryData = await Category.findAll({
        where: { name: categoriesArray },
        attributes: ['id'],
      });

      const categoryIds = categoryData.map((category) => category.id);

      const recipeData = await RecipeCategory.findAll({
        where: { categoryId: categoryIds },
        attributes: ['recipeId'],
      });

      const recipeIds = recipeData.map((recipe) => recipe.recipeId);

      whereCondition['id'] = { [Op.in]: recipeIds };
    }

    const recipes = await Recipe.findAll({
      where: whereCondition,
    });

    const recipesWithIngredientsAndCategories = await Promise.all(
      recipes.map(async (recipe) => {
        const recipeId = recipe.id;

        const recipeIngredients = await RecipeIngredient.findAll({
          where: { recipeId },
          attributes: ['ingredientId', 'quantity', 'unit'],
          raw: true,
        });

        const ingredients = await Promise.all(
          recipeIngredients.map(async (record) => {
            const { ingredientId, quantity, unit } = record;
            const ingredient = await Ingredient.findByPk(ingredientId, {
              attributes: ['name'],
              raw: true,
            });
            return { ...ingredient, quantity, unit };
          })
        );

        const categoryIds = await RecipeCategory.findAll({
          where: { recipeId },
          attributes: ['categoryId'],
          raw: true,
        });

        const categories = await Promise.all(
          categoryIds.map(async (record) => {
            const category = await Category.findByPk(record.categoryId, {
              attributes: ['name'],
              raw: true,
            });
            return category;
          })
        );

        return {
          ...recipe.dataValues,
          ingredients,
          categories,
        };
      })
    );

    res.json({ recipes: recipesWithIngredientsAndCategories });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};


// Implement other CRUD operations for recipes (update, delete, etc.)

export default {
  getAllRecipes,
  createRecipe,
  getRecipeByName,
  updateRecipe,
  deleteRecipe,
  getRecipesByIngredient,
  searchRecipes,
};
