import express from 'express';
import cors from 'cors';
import recipeRoutes from './routes/recipeRoutes';
import ingredientRoutes from './routes/ingredientRoutes';
import categoryRoutes from './routes/categoryRoutes';
import { sequelize } from './db/connection';

const app = express();
const PORT = 9090;

// Use the cors middleware to enable CORS
app.use(cors());

app.use(express.json());

// Wait for the database connection to be established before calling the /ping route
async function authenticateDatabase() {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

authenticateDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

app.get('/ping', (req, res) => {
  res.send('Pong');
});

// Use the other routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/categories', categoryRoutes);
