import { defineConfig } from 'auth-astro';
import Credentials from '@auth/core/providers/credentials';
import { db } from './src/db';
import { users } from './src/db/schema';
import { eq } from 'drizzle-orm';
import bcryptjs from 'bcryptjs';
import type { User } from './src/db/schema';

export default defineConfig({
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        // Find user by email
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1);

        if (!user) {
          return null;
        }

        // Verify password using bcryptjs
        const isValidPassword = await bcryptjs.compare(password, user.password);

        if (!isValidPassword) {
          return null;
        }

        // Return user object (password excluded)
        return {
          id: user.id,
          email: user.email,
          name: user.name || '',
          role: user.role || 'admin',
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET || 'your-secret-key-change-in-production',
});
