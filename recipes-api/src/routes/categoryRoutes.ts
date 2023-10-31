import express from 'express';
import categoryController from '../controllers/categoryController';

const router = express.Router();

router.get('/allcategories', categoryController.getAllCategories);
router.post('/createCategory', categoryController.createCategory);
// Define other routes for CRUD operations on categories

export default router;
