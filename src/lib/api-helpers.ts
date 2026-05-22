import type { APIContext } from 'astro';

/**
 * Standard API response helper
 */
export function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

/**
 * Error response helper
 */
export function errorResponse(message: string, status = 400) {
  return jsonResponse({ error: message }, status);
}

/**
 * Check if user is authenticated
 * Returns user session or null if not authenticated
 */
export async function checkAuth(context: APIContext) {
  const session = await context.locals.auth?.();
  
  if (!session?.user) {
    return null;
  }
  
  return session;
}

/**
 * Require authentication middleware
 * Returns error response if not authenticated, otherwise returns session
 */
export async function requireAuth(context: APIContext) {
  const session = await checkAuth(context);
  
  if (!session) {
    throw new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  
  return session;
}

/**
 * Parse query parameters as integers
 */
export function parseIntParam(value: string | null, defaultValue: number): number {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Parse query parameters as boolean
 */
export function parseBoolParam(value: string | null): boolean | undefined {
  if (value === null || value === undefined) return undefined;
  return value === 'true' || value === '1';
}
