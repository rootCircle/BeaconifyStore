import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as schema from './schema';
import { config } from '../config';

const runMigrations = async () => {
  if (!config.databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  // For migrations, we need a new connection instance with force-new true
  const migrationClient = postgres(config.databaseUrl, { max: 1 });
  const db = drizzle(migrationClient, { schema });

  try {
    console.log('Running migrations...');
    await migrate(db, { migrationsFolder: 'drizzle' });
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    await migrationClient.end();
  }
};

runMigrations().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
