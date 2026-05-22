import type { APIRoute } from 'astro';
import { db } from '../../../db';
import { products } from '../../../db/schema';
import { eq } from 'drizzle-orm';

// GET /api/products/[id] - Get a single product
export const GET: APIRoute = async ({ params }) => {
  try {
    const { id } = params;
    
    if (!id) {
      return new Response(JSON.stringify({ error: 'Product ID is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const product = await db.select()
      .from(products)
      .where(eq(products.id, id))
      .get();

    if (!product) {
      return new Response(JSON.stringify({ error: 'Product not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Parse variants from JSON string
    const parsedProduct = {
      ...product,
      variants: product.variants ? JSON.parse(product.variants) : null,
      images: product.images ? (typeof product.images === 'string' ? JSON.parse(product.images) : product.images) : [],
    };

    return new Response(JSON.stringify(parsedProduct), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch product' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

// PUT /api/products/[id] - Update a product
export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const { id } = params;
    
    if (!id) {
      return new Response(JSON.stringify({ error: 'Product ID is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const body = await request.json();

    // Build update object dynamically to support partial updates
    const updateData: any = {
      updatedAt: new Date(),
    };

    if (body.sku !== undefined) updateData.sku = body.sku;
    if (body.name !== undefined) updateData.name = body.name;
    if (body.description !== undefined) updateData.description = body.description || null;
    if (body.categoryId !== undefined) updateData.categoryId = body.categoryId || null;
    if (body.price !== undefined) updateData.price = parseInt(body.price);
    if (body.image !== undefined) updateData.image = body.image || null;
    if (body.images !== undefined) updateData.images = body.images ? JSON.stringify(body.images) : null;
    if (body.variants !== undefined) updateData.variants = body.variants ? JSON.stringify(body.variants) : null;
    if (body.active !== undefined) updateData.active = body.active;
    if (body.order !== undefined) updateData.order = body.order || 0;

    const updated = await db.update(products)
      .set(updateData)
      .where(eq(products.id, id))
      .returning();

    if (!updated || updated.length === 0) {
      return new Response(JSON.stringify({ error: 'Product not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify(updated[0]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    console.error('Error updating product:', error);
    
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
    
    return new Response(JSON.stringify({ error: 'Failed to update product' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

// DELETE /api/products/[id] - Delete a product
export const DELETE: APIRoute = async ({ params }) => {
  try {
    const { id } = params;
    
    if (!id) {
      return new Response(JSON.stringify({ error: 'Product ID is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const deleted = await db.delete(products)
      .where(eq(products.id, id))
      .returning();

    if (!deleted || deleted.length === 0) {
      return new Response(JSON.stringify({ error: 'Product not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete product' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
