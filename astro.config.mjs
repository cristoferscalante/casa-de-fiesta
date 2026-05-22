// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import vercel from '@astrojs/vercel';
import auth from 'auth-astro';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: false
    },
    edgeMiddleware: false
  }),
  integrations: [auth()],
  vite: {
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
    ssr: {
      external: ['bcryptjs']
    }
  },
});
