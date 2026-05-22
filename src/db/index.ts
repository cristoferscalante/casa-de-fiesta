import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

// Create libSQL client with Turso support
const client = createClient({
  url: process.env.DATABASE_URL || 'file:local.db',
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

// Create Drizzle instance
export const db = drizzle(client, { schema });

// Export the client if needed for raw queries
export { client };
