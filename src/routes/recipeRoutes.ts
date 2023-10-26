import express from 'express';
import {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getRecipesWithIngredient,
  searchRecipes
} from '../controllers/recipeController';

const router = express.Router();

router.post('/createRecipe', createRecipe);
router.get('/getAllRecipes', getRecipes);
router.get('/:id', getRecipeById);
router.get('/with-ingredient/:ingredientName', getRecipesWithIngredient);
router.get('/search', searchRecipes);
router.put('/updateRecipe/:id', updateRecipe);
router.delete('/deleteRecipe/:id', deleteRecipe);


export default router;
