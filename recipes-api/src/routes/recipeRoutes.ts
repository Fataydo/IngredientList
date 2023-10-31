import express from 'express';
import recipeController from '../controllers/recipeController';

const router = express.Router();

router.get('/allrecipes', recipeController.getAllRecipes);
router.post('/createRecipe', recipeController.createRecipe);
// Define other routes for CRUD operations on recipes

export default router;
