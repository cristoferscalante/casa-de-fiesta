import type { APIRoute } from 'astro';
import { db } from '../../../db';
import { categories } from '../../../db/schema';

// GET /api/categories - List all categories
export const GET: APIRoute = async () => {
  try {
    const allCategories = await db.select()
      .from(categories)
      .orderBy(categories.order)
      .all();

    return new Response(JSON.stringify(allCategories), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch categories' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
