import express from 'express';
import ingredientController from '../controllers/ingredientController';

const router = express.Router();

router.get('/getAllIngredients', ingredientController.getAllIngredients);
router.get('/getIngredientById/:id', ingredientController.getIngredientById);
router.post('/createIngredient', ingredientController.createIngredient);
router.put('/updateIngredient/:id', ingredientController.updateIngredient);
router.delete('/deleteIngredient/:id', ingredientController.deleteIngredient);

export default router;
