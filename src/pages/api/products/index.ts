import type { APIRoute } from 'astro';
import { db } from '../../../db';
import { products, categories } from '../../../db/schema';
import { eq } from 'drizzle-orm';

// GET /api/products - List all products
export const GET: APIRoute = async () => {
  try {
    const allProducts = await db.select({
      id: products.id,
      sku: products.sku,
      name: products.name,
      description: products.description,
      categoryId: products.categoryId,
      price: products.price,
      image: products.image,
      images: products.images,
      variants: products.variants,
      active: products.active,
      order: products.order,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
    }).from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .all();

    // Parse JSON fields
    const parsedProducts = allProducts.map(p => ({
      ...p,
      variants: p.variants ? JSON.parse(p.variants) : null,
      images: p.images ? (typeof p.images === 'string' ? JSON.parse(p.images) : p.images) : [],
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

    // Prepare JSON fields
    const variantsJson = body.variants ? JSON.stringify(body.variants) : null;
    const imagesJson = body.images ? JSON.stringify(body.images) : null;

    const newProduct = await db.insert(products).values({
      sku: body.sku,
      name: body.name,
      description: body.description || null,
      categoryId: body.categoryId || null,
      price: parseInt(body.price),
      image: body.image || null,
      images: imagesJson,
      variants: variantsJson,
      active: body.active !== undefined ? body.active : true,
      order: body.order || 0,
    }).returning();

    return new Response(JSON.stringify(newProduct[0]), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    console.error('Error creating product:', error);
    
    // Handle unique constraint violations
    if (error.message?.includes('UNIQUE constraint failed')) {
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
    
    return new Response(JSON.stringify({ error: 'Failed to create product' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
