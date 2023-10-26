import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import { config } from './config/config';
import recipeRoutes from "./routes/recipeRoutes"
import ingredientRoutes from "./routes/ingredientRoutes"
import categoryRoutes from "./routes/categoryRoutes"

const app: Application = express();
//connect to mongo database
mongoose.connect(config.mongo.url)
  .then(() => {
    console.log('Connected to MongoDB');
    
    app.get('/ping', (req: Request, res: Response) => {
      try {
        res.status(200).json({ message: 'Pong' });
      } catch (err) {
        console.error('Error in /ping route:', err);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });
    app.use(express.json());

    app.use('/recipes', recipeRoutes);
    app.use('/ingredients', ingredientRoutes);
    app.use('/categories', categoryRoutes);

    const server = app.listen(config.server.port, () => {
      console.log(`Server is running on port ${config.server.port}`);
    });

    server.on('error', (err) => {
      console.error('Server listen error:', err);
    });

    process.on('SIGINT', () => {
      server.close(() => {
        mongoose.connection.close().then(() => {
          process.exit(0);
        });
      });
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
