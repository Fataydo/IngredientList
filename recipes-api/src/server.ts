import express from 'express';
import testRoute from './routes/testRoute'; // Import the new test route
import recipeRoutes from './routes/recipeRoutes';
import ingredientRoutes from './routes/ingredientRoutes';
import categoryRoutes from './routes/categoryRoutes';
import db from './db/connection';

const app = express();
const PORT = process.env.DB_PORT || 3000;

app.use(express.json());

// Use the test route
app.use('/test', testRoute);

// Use the other routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/categories', categoryRoutes);

app.listen(PORT, async () => {
  try {
    // Test the database connection during server startup
    await db.any('SELECT 1 as result');
    console.log('Server is running, database connection successful');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
  console.log(`Server is running on port ${PORT}`);
});
