import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

// GET /api/categories - List all categories
export const GET: APIRoute = async () => {
  try {
    const { data: allCategories, error } = await supabase
      .from('categories')
      .select('*')
      .order('order', { ascending: true });

    if (error) throw error;

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
