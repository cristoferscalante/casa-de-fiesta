import fs from 'fs';
import path from 'path';
import bcryptjs from 'bcryptjs';
import { categories } from '../src/data/catalogCasaDeFiestas';
import { products } from '../src/data/catalogCasaDeFiestas';

const SALT_ROUNDS = 10;
const sqlFilePath = path.join(process.cwd(), 'supabase-setup.sql');

async function main() {
  console.log('Generating seed SQL inserts...');
  
  let sqlContent = '\n\n-- ========================================================\n';
  sqlContent += '-- DATOS INICIALES (SEED DATA) - CASA DE FIESTA\n';
  sqlContent += '-- ========================================================\n\n';

  // 1. Admin User
  const hashedPassword = await bcryptjs.hash('Admin123!', SALT_ROUNDS);
  sqlContent += `-- 1. Insertar usuario administrador por defecto\n`;
  sqlContent += `INSERT INTO users (email, password, name, role) \n`;
  sqlContent += `VALUES ('admin@casadefiestas.com', '${hashedPassword}', 'Admin', 'admin')\n`;
  sqlContent += `ON CONFLICT (email) DO NOTHING;\n\n`;

  // 2. Categories
  sqlContent += `-- 2. Insertar categorías\n`;
  sqlContent += `INSERT INTO categories (id, name, description, icon, image, "order") VALUES\n`;
  
  const categoryValues = categories.map(cat => {
    const desc = cat.description ? `'${cat.description.replace(/'/g, "''")}'` : 'NULL';
    const icon = cat.icon ? `'${cat.icon.replace(/'/g, "''")}'` : 'NULL';
    const img = cat.image ? `'${cat.image.replace(/'/g, "''")}'` : 'NULL';
    return `('${cat.id}', '${cat.name.replace(/'/g, "''")}', ${desc}, ${icon}, ${img}, 0)`;
  });
  
  sqlContent += categoryValues.join(',\n') + '\n';
  sqlContent += `ON CONFLICT (id) DO UPDATE SET \n`;
  sqlContent += `  name = EXCLUDED.name,\n`;
  sqlContent += `  description = EXCLUDED.description,\n`;
  sqlContent += `  icon = EXCLUDED.icon,\n`;
  sqlContent += `  image = EXCLUDED.image;\n\n`;

  // 3. Products
  sqlContent += `-- 3. Insertar productos\n`;
  sqlContent += `INSERT INTO products (id, sku, name, description, category_id, price, image, images, variants, active, "order") VALUES\n`;
  
  const productValues = products.map(prod => {
    const desc = prod.description ? `'${prod.description.replace(/'/g, "''")}'` : 'NULL';
    const img = prod.image ? `'${prod.image.replace(/'/g, "''")}'` : 'NULL';
    const imgs = prod.images ? `'${JSON.stringify(prod.images).replace(/'/g, "''")}'::jsonb` : 'NULL';
    const vars = prod.variants ? `'${JSON.stringify(prod.variants).replace(/'/g, "''")}'` : 'NULL';
    const active = prod.active ? 'TRUE' : 'FALSE';
    return `('${prod.id}', '${prod.sku}', '${prod.name.replace(/'/g, "''")}', ${desc}, '${prod.category}', ${prod.price}, ${img}, ${imgs}, ${vars}, ${active}, ${prod.order})`;
  });

  sqlContent += productValues.join(',\n') + '\n';
  sqlContent += `ON CONFLICT (sku) DO UPDATE SET \n`;
  sqlContent += `  name = EXCLUDED.name,\n`;
  sqlContent += `  description = EXCLUDED.description,\n`;
  sqlContent += `  category_id = EXCLUDED.category_id,\n`;
  sqlContent += `  price = EXCLUDED.price,\n`;
  sqlContent += `  image = EXCLUDED.image,\n`;
  sqlContent += `  images = EXCLUDED.images,\n`;
  sqlContent += `  variants = EXCLUDED.variants,\n`;
  sqlContent += `  active = EXCLUDED.active,\n`;
  sqlContent += `  "order" = EXCLUDED."order";\n`;

  fs.appendFileSync(sqlFilePath, sqlContent);
  console.log('Seed SQL appended successfully to supabase-setup.sql!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
