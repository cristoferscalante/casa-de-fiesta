import { defineMiddleware } from 'astro:middleware';
import { getSession } from 'auth-astro/server';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Protect /admin/* routes
  if (pathname.startsWith('/admin')) {
    const session = await getSession(context.request);

    if (!session || !session.user) {
      // Redirect unauthenticated users to login page
      return context.redirect('/login');
    }
  }

  // Allow all other routes
  return next();
});
