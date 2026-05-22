/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module 'auth-astro' {
  interface Session {
    user?: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
  }
}
