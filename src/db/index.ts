import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from "postgres";
import { config } from '../config';

async function main() {
    const client = postgres(config.databaseUrl);
    const db = drizzle(client);
}

main();