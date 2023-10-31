import express, { Request, Response } from 'express';
import db from './../db/connection';

const router = express.Router();

router.get('/test-db-connection', async (req: Request, res: Response) => {
  try {
    // Attempt a test query to the database
    const data = await db.any('SELECT 1 as result');
    console.log('Database connection successful!');
    res.status(200).json({ message: 'Database connection successful', data });
  } catch (error: any) { // Added type annotation ': any' to explicitly define the error type
    console.error('Error connecting to the database:', error);
    res.status(500).json({ message: 'Failed to connect to the database', error: error.message });
  }
});

export default router;
