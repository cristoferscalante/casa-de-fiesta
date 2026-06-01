import { defineMiddleware } from 'astro:middleware';
import { supabase } from './lib/supabase';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Protect /admin/* routes
  if (pathname.startsWith('/admin')) {
    const accessToken = context.cookies.get('sb-access-token')?.value;

    let isAuthenticated = false;

    if (accessToken) {
      const { data, error } = await supabase.auth.getUser(accessToken);
      if (!error && data?.user) {
        isAuthenticated = true;
      }
    }

    if (!isAuthenticated) {
      // Redirect unauthenticated users to login page
      return context.redirect('/login');
    }
  }

  // Allow all other routes
  return next();
});
