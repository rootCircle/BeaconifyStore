import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './db/schema';
import { config } from './config';

const client = postgres(config.databaseUrl);
export const db = drizzle(client, { schema });

