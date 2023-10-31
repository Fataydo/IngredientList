import express from 'express';
import recipeController from '../controllers/recipeController';

const router = express.Router();

router.get('/getAllRecipes', recipeController.getAllRecipes);
router.get('/getRecipeById/:id', recipeController.getRecipeById);
router.post('/createRecipe', recipeController.createRecipe);
router.put('/updateRecipe/:id', recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);

router.get('/:ingredient/recipes', recipeController.getRecipesByIngredient);
router.get('/search', recipeController.searchRecipes);

export default router;
