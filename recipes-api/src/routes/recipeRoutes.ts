import express from 'express';
import recipeController from '../controllers/recipeController';

const router = express.Router();

router.get('/getAllRecipes', recipeController.getAllRecipes);
router.get('/getRecipeByName/:name', recipeController.getRecipeByName);
router.post('/createRecipe', recipeController.createRecipe);
router.put('/updateRecipe/:id', recipeController.updateRecipe);
router.delete('/deleteRecipe/:id', recipeController.deleteRecipe);

router.get('/getRecipesByIngredient/:ingredient', recipeController.getRecipesByIngredient);
router.get('/search', recipeController.searchRecipes);

export default router;
