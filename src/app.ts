import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

const app: Application = express();
app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/', routes);

// Testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Working successfully!!');
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;
