import { v2 as cloudinary } from 'cloudinary';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import dotenv from 'dotenv';
import * as schema from '../src/db/schema';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Create database client
const client = createClient({
  url: process.env.DATABASE_URL || 'file:local.db',
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

const db = drizzle(client, { schema });

async function uploadToCloudinary(filePath: string, publicId: string): Promise<string> {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'mister-lya/products',
      public_id: publicId,
      resource_type: 'image',
      transformation: [
        {
          quality: 'auto',
          fetch_format: 'auto',
        },
      ],
    });
    return result.secure_url;
  } catch (error) {
    console.error(`Error uploading ${filePath}:`, error);
    throw error;
  }
}

async function main() {
  try {
    console.log('🚀 Iniciando subida de imágenes a Cloudinary...\n');

    // Validate Cloudinary config
    const { cloud_name, api_key, api_secret } = cloudinary.config();
    if (!cloud_name || !api_key || !api_secret) {
      throw new Error('Cloudinary no está configurado correctamente. Verifica las variables de entorno.');
    }
    console.log(`✅ Cloudinary configurado: ${cloud_name}\n`);

    // Get all products from database
    const products = await db.select().from(schema.products).all();
    console.log(`📦 Encontrados ${products.length} productos en la base de datos\n`);

    let uploaded = 0;
    let skipped = 0;
    let errors = 0;

    for (const product of products) {
      const imagePath = product.image;
      
      if (!imagePath) {
        console.log(`⏭️  [${product.sku}] Sin imagen, saltando...`);
        skipped++;
        continue;
      }

      // Skip if already using Cloudinary URL
      if (imagePath.startsWith('http')) {
        console.log(`⏭️  [${product.sku}] Ya usa Cloudinary, saltando...`);
        skipped++;
        continue;
      }

      try {
        // Construct local file path
        const localPath = path.join(process.cwd(), 'public', imagePath);
        
        if (!fs.existsSync(localPath)) {
          console.log(`❌ [${product.sku}] Archivo no encontrado: ${localPath}`);
          errors++;
          continue;
        }

        // Extract filename without extension for public_id
        const fileName = path.basename(imagePath, path.extname(imagePath));
        
        console.log(`📤 [${product.sku}] Subiendo ${fileName}...`);
        
        // Upload to Cloudinary
        const cloudinaryUrl = await uploadToCloudinary(localPath, fileName);
        
        // Update database
        await db
          .update(schema.products)
          .set({ image: cloudinaryUrl })
          .where(eq(schema.products.id, product.id));
        
        console.log(`✅ [${product.sku}] Subido: ${cloudinaryUrl}`);
        uploaded++;
        
      } catch (error: any) {
        console.error(`❌ [${product.sku}] Error:`, error.message);
        errors++;
      }
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 Proceso completado!\n');
    console.log('Resumen:');
    console.log(`  ✅ Subidas exitosamente: ${uploaded}`);
    console.log(`  ⏭️  Saltadas: ${skipped}`);
    console.log(`  ❌ Errores: ${errors}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error durante el proceso:');
    console.error(error);
    process.exit(1);
  }
}

// Run the script
main();
