// Bridge Astro's import.meta.env to Node's process.env for the libSQL client
if (typeof process !== 'undefined' && typeof import.meta !== 'undefined' && import.meta.env) {
  process.env.DATABASE_URL = import.meta.env.DATABASE_URL || process.env.DATABASE_URL;
  process.env.DATABASE_AUTH_TOKEN = import.meta.env.DATABASE_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN;
}

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
