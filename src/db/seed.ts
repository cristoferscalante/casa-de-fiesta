import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { eq } from 'drizzle-orm';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import * as schema from './schema';
import { categories as catalogCategories, products as catalogProducts } from '../data/catalog';

// Load environment variables explicitly
dotenv.config();

const SALT_ROUNDS = 10;

// Create client and db instance
const client = createClient({
  url: process.env.DATABASE_URL || 'file:local.db',
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

const db = drizzle(client, { schema });

async function seed() {
  try {
    console.log('🌱 Starting database seed...\n');

    // Step 1: Run migrations
    console.log('📦 Running migrations...');
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('✅ Migrations completed\n');

    // Step 2: Create default admin user
    console.log('👤 Creating default admin user...');
    const existingAdmin = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, 'admin@misterlya.com'))
      .limit(1);

    if (existingAdmin.length === 0) {
      const hashedPassword = await bcryptjs.hash('Admin123!', SALT_ROUNDS);
      await db.insert(schema.users).values({
        email: 'admin@misterlya.com',
        password: hashedPassword,
        name: 'Admin',
        role: 'admin',
      });
      console.log('✅ Admin user created (email: admin@misterlya.com)\n');
    } else {
      console.log('ℹ️  Admin user already exists, skipping...\n');
    }

    // Step 3: Migrate categories
    console.log('🧹 Clearing existing catalog data...');
    await db.delete(schema.products);
    await db.delete(schema.categories);
    console.log('✅ Catalog data cleared\n');

    console.log('📁 Migrating categories...');
    let categoriesAdded = 0;

    for (const category of catalogCategories) {
      await db.insert(schema.categories).values({
        id: category.id,
        name: category.name,
        description: category.description,
        icon: category.icon,
        image: category.image,
        order: 0, // Default order since catalog doesn't have it
      });
      categoriesAdded++;
      console.log(`  ✓ Added category: ${category.name}`);
    }

    console.log(`✅ Categories: ${categoriesAdded} added\n`);

    // Step 4: Migrate products
    console.log('🛍️  Migrating products...');
    let productsAdded = 0;

    for (const product of catalogProducts) {
      await db.insert(schema.products).values({
        id: product.id,
        sku: product.sku,
        name: product.name,
        description: product.description,
        categoryId: product.category,
        price: product.price, // Price is already in COP (not cents)
        image: product.image || null,
        images: product.images ? JSON.stringify(product.images) : null,
        variants: product.variants ? JSON.stringify(product.variants) : null,
        active: product.active,
        order: product.order,
      });
      productsAdded++;
      console.log(`  ✓ Added product: ${product.name} (${product.sku})`);
    }

    console.log(`✅ Products: ${productsAdded} added\n`);

    // Summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 Seed completed successfully!\n');
    console.log('Summary:');
    console.log(`  • Admin user: ${existingAdmin.length === 0 ? 'created' : 'already exists'}`);
    console.log(`  • Categories: ${categoriesAdded} added`);
    console.log(`  • Products: ${productsAdded} added`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error during seeding:');
    console.error(error);
    process.exit(1);
  }
}

// Run the seed function
seed();
