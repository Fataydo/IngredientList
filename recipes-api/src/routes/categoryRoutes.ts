import express from 'express';
import categoryController from '../controllers/categoryController';

const router = express.Router();

router.get('/getAllCategories', categoryController.getAllCategories);
router.get('/getCategoryById/:id', categoryController.getCategoryById);
router.post('/createCategory', categoryController.createCategory);
router.put('/updateCategory/:id', categoryController.updateCategory);
router.delete('/deleteCategory/:id', categoryController.deleteCategory);

export default router;
