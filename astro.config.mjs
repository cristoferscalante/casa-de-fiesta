// @ts-check
import dotenv from 'dotenv';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import vercel from '@astrojs/vercel';

dotenv.config();

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: false
    },
    edgeMiddleware: false
  }),
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
