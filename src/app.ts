// src/app.ts
import express from 'express';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { createBeaconRouter } from './routes/beaconRoutes';
import { BeaconService } from './services/beaconService';
import { config } from './config';

const app = express();
app.use(express.json());

// Database connection
const client = postgres(config.databaseUrl);
const db = drizzle(client);

// Services
const beaconService = new BeaconService(db);

// Routes
app.use('/api', createBeaconRouter(beaconService));

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    data: null,
  });
});

export default app;