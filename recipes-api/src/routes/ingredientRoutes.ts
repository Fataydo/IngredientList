import express from 'express';
import ingredientController from '../controllers/ingredientController';

const router = express.Router();

router.get('/allingredients', ingredientController.getAllIngredients);
router.post('/createIngredient', ingredientController.createIngredient);
// Define other routes for CRUD operations on ingredients

export default router;
