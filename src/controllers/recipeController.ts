import { Request, Response } from "express";
import Recipe from "../models/Recipe";

export const createRecipe = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      steps,
      rating,
      images,
      ingredients,
      categories,
    } = req.body;

    const newRecipe = new Recipe({
      name,
      description,
      steps,
      rating,
      images,
      ingredients,
      categories,
    });

    const savedRecipe = await newRecipe.save();

    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getRecipes = async (req: Request, res: Response) => {
  try {
    // Use the find method of the Recipe model to retrieve all recipes
    const recipes = await Recipe.find();

    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getRecipeById = (req: Request, res: Response) => {
  // Implement the get recipe by ID logic here
};

export const updateRecipe = async (req: Request, res: Response) => {
  try {
    console.log("Request Body:", req.body);
    const recipeId = req.params.id; // Use req.params.id to get the recipe ID
    const updatedData = {
      name: req.body.name, // Extract only the fields you want to update
      description: req.body.description,
      steps: req.body.steps,
      rating: req.body.rating,
      images: req.body.images,
      ingredients: req.body.ingredients,
      categories: req.body.categories,
    };
    console.log(updatedData);

console.log(`Recipe ID: ${recipeId}`);
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      updatedData,
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getRecipesWithIngredient = async (req: Request, res: Response) => {
  try {
    const ingredientName = req.params.ingredientName;

    // Use a query to find all recipes that contain the specified ingredient
    const recipesWithIngredient = await Recipe.find({
      "ingredients.name": ingredientName,
    });

    if (recipesWithIngredient.length === 0) {
      return res
        .status(404)
        .json({ message: "No recipes with this ingredient found" });
    }

    res.status(200).json(recipesWithIngredient);
  } catch (error) {
    console.error("Error fetching recipes with ingredient:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const searchRecipes = async (req: Request, res: Response) => {
  try {
    console.log("Query Params:", req.query);
    console.log("Name:", req.query.name);
    const { name, categories } = req.query as {
      name?: string;
      categories?: string;
    };

    // Create a query object to filter recipes by name and categories
    const query: { name?: any; categories?: any } = {};

    if (name) {
      // Use a case-insensitive regex to search by recipe name
      query.name = { $regex: new RegExp(name, "i") };
    }

    if (categories) {
      // If categories are specified as a comma-separated string, split them into an array
      const categoriesArray = categories.split(",");
      query.categories = { $in: categoriesArray };
    }

    // Use the find method with the query object to retrieve matching recipes
    const matchingRecipes = await Recipe.find(query);

    if (matchingRecipes.length === 0) {
      return res.status(404).json({ message: "No matching recipes found" });
    }

    res.status(200).json(matchingRecipes);
  } catch (error) {
    console.error("Error searching recipes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    const recipeId = req.params.id; // Extract the recipe ID from the request params

    // Use the findByIdAndDelete method to remove the recipe by ID
    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(204).end(); // Respond with a 204 status (No Content) to indicate successful deletion
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
