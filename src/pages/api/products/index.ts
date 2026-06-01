import type { APIRoute } from 'astro';
import { supabase, supabaseAdmin } from '../../../lib/supabase';

// Helper to safely parse JSON field
const parseJsonField = (value: unknown, fallback: any) => {
  if (value == null) return fallback;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }
  return value;
};

// GET /api/products - List all products
export const GET: APIRoute = async () => {
  try {
    const { data: allProducts, error } = await supabase
      .from('products')
      .select('*, categories(name)')
      .order('order', { ascending: true });

    if (error) throw error;

    // Parse JSON fields and format
    const parsedProducts = (allProducts || []).map(p => ({
      ...p,
      categoryId: p.category_id,
      categoryName: p.categories?.name || 'Sin categoría',
      variants: parseJsonField(p.variants, null),
      images: parseJsonField(p.images, []),
    }));

    return new Response(JSON.stringify(parsedProducts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

// POST /api/products - Create a new product
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.sku || !body.name || !body.price) {
      return new Response(
        JSON.stringify({ error: 'SKU, name, and price are required' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const insertData = {
      sku: body.sku,
      name: body.name,
      description: body.description || null,
      category_id: body.categoryId || null,
      price: parseInt(body.price),
      image: body.image || null,
      images: body.images || null,
      variants: body.variants ? JSON.stringify(body.variants) : null,
      active: body.active !== undefined ? body.active : true,
      order: body.order || 0,
    };

    const { data: newProduct, error: insertError } = await supabaseAdmin
      .from('products')
      .insert(insertData)
      .select()
      .single();

    if (insertError) {
      // Check unique constraint violation
      if (insertError.code === '23505') {
        return new Response(
          JSON.stringify({ error: 'A product with this SKU already exists' }),
          {
            status: 409,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }
      throw insertError;
    }

    return new Response(JSON.stringify(newProduct), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to create product' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
