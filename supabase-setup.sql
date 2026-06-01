/* ========================================================
   TABLAS PARA SUPABASE (POSTGRESQL) - CASA DE FIESTA
   ========================================================
   Puedes copiar y pegar este código directamente en el "SQL Editor" de tu panel de Supabase. */

/* Habilitar extensión para UUIDs si es necesario */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

/* 1. Tabla de Usuarios (users) */
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

/* 2. Tabla de Categorías (categories) */
CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    image TEXT,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

/* 3. Tabla de Productos (products) */
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    sku TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    category_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
    price INTEGER NOT NULL,
    image TEXT,
    images JSONB,
    variants TEXT,
    active BOOLEAN DEFAULT TRUE,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

/* Indices para mejorar velocidad de búsqueda */
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(active);

/* Triggers para actualizar automáticamente "updated_at" */
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();


/* ========================================================
   DATOS INICIALES (SEED DATA) - CASA DE FIESTA
   ======================================================== */

/* 1. Insertar usuario administrador por defecto */
INSERT INTO users (email, password, name, role) 
VALUES ('admin@casadefiestas.com', '$2b$10$kUDM/jtlEwxrocIaP4SZCOfMK2CqAnan6LkIsSwYsGC6Lkt5YA4t6', 'Admin', 'admin')
ON CONFLICT (email) DO NOTHING;

/* 2. Insertar categorías */
INSERT INTO categories (id, name, description, icon, image, "order") VALUES
('globos', 'Globos Sempertex', 'Metalizados, cromados, tubo, latex y arreglos en todos los tamanos', 'celebration', 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=studio%20product%20photo%20of%20premium%20colorful%20latex%20balloons%20bouquet%2C%20party%20boutique%20aesthetic%2C%20clean%20background%2C%20soft%20studio%20lighting%2C%20high%20detail&image_size=square', 0),
('pinateria', 'Piñatería', 'Piñatas temáticas, decoración y dulceros', 'local_activity', 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=flat%20lay%20product%20photo%20of%20themed%20pinata%20with%20confetti%20and%20party%20decorations%2C%20premium%20boutique%20aesthetic%2C%20clean%20background%2C%20soft%20studio%20lighting&image_size=square', 0),
('insumos', 'Insumos para Piñatería', 'Foami, silicona, escarcha, papel crepé y más', 'handyman', 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=flat%20lay%20product%20photo%20of%20craft%20supplies%20for%20party%20decor%3A%20crepe%20paper%2C%20ribbons%2C%20glitter%2C%20hot%20glue%20sticks%2C%20premium%20boutique%20aesthetic%2C%20clean%20background&image_size=square', 0),
('accesorios', 'Accesorios', 'Aretes, collares, pulseras, rosarios y detalles para regalar', 'diamond', 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=studio%20product%20photo%20of%20elegant%20handmade%20accessories%20set%3A%20earrings%20bracelets%2C%20gift%20boutique%20aesthetic%2C%20clean%20background%2C%20soft%20studio%20lighting&image_size=square', 0),
('regalos', 'Regalos Personalizados', 'Mugs, cuadros, cajas sorpresa y kits románticos', 'redeem', 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=studio%20product%20photo%20of%20personalized%20gift%20box%20with%20ribbon%20and%20greeting%20card%2C%20premium%20boutique%20aesthetic%2C%20clean%20background%2C%20soft%20studio%20lighting&image_size=square', 0),
('desayunos', 'Desayunos Sorpresa', 'Básico, premium, deluxe y empresarial', 'breakfast_dining', 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=studio%20product%20photo%20of%20breakfast%20surprise%20tray%20with%20flowers%20and%20gift%2C%20premium%20boutique%20aesthetic%2C%20clean%20background%2C%20soft%20morning%20lighting&image_size=square', 0),
('anchetas', 'Anchetas y Combos', 'Arreglos para cumpleaños, fiestas, fechas especiales y regalos corporativos', 'gift', 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=studio%20product%20photo%20of%20premium%20gift%20hamper%20(ancheta)%20with%20snacks%20and%20ribbon%2C%20boutique%20aesthetic%2C%20clean%20background%2C%20soft%20studio%20lighting&image_size=square', 0)
ON CONFLICT (id) DO UPDATE SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  image = EXCLUDED.image;

/* 3. Insertar productos */
INSERT INTO products (id, sku, name, description, category_id, price, image, images, variants, active, "order") VALUES
('globos-pastel-pack', 'CDF-GLO-001', 'Pack Globos Pastel Sempertex', 'Globos Sempertex en tonos suaves para arcos, bouquets y decoraciones elegantes.', 'globos', 0, '/imagenes-productos/globos-pastel-pack.webp', NULL, '["R-12","R-18","Surtidos"]', TRUE, 1),
('globos-cromados-bouquet', 'CDF-GLO-002', 'Bouquet Globos Cromados', 'Acabado metalizado y brillante para montajes llamativos en fiestas y fechas especiales.', 'globos', 0, '/imagenes-productos/globos-cromados-bouquet.webp', NULL, '["Oro","Plata","Rose Gold"]', TRUE, 2),
('pinata-tematica', 'CDF-PIN-001', 'Piñata Temática', 'Diseños temáticos para cumpleaños y fechas especiales.', 'pinateria', 0, '/imagenes-productos/pinata-tematica.webp', NULL, '["Pequeña","Mediana","Grande"]', TRUE, 1),
('kit-decoracion', 'CDF-PIN-002', 'Kit de Decoración', 'Banderines, guirnaldas y detalles para ambientar en minutos.', 'pinateria', 0, '/imagenes-productos/kit-decoracion.webp', NULL, '["Cumpleaños","Amor y Amistad","Baby Shower"]', TRUE, 2),
('foami-escarcha', 'CDF-INS-001', 'Set Foami + Escarcha', 'Materiales esenciales para personalizar dulceros y decoraciones.', 'insumos', 0, 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=craft%20foam%20sheets%20and%20glitter%20set%20for%20party%20decor%2C%20studio%20product%20photo%2C%20clean%20background&image_size=square', NULL, '["Colores surtidos"]', TRUE, 1),
('silicona-ribbons', 'CDF-INS-002', 'Silicona + Cintas Decorativas', 'Para acabados limpios y armados resistentes en tus proyectos.', 'insumos', 0, 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=hot%20glue%20gun%20with%20glue%20sticks%20and%20colorful%20ribbons%2C%20studio%20product%20photo%2C%20clean%20background&image_size=square', NULL, '["Barras estándar","Barras largas"]', TRUE, 2),
('set-accesorios', 'CDF-ACC-001', 'Set de Accesorios', 'Piezas elegantes para complementar tu ocasión especial.', 'accesorios', 0, 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=elegant%20handmade%20accessories%20set%2C%20earrings%20and%20bracelet%2C%20studio%20product%20photo%2C%20clean%20background&image_size=square', NULL, '["Dorado","Plata"]', TRUE, 1),
('rosario-set', 'CDF-ACC-002', 'Rosario + Pulsera', 'Detalle delicado para regalar o lucir con intención.', 'accesorios', 0, 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=rosary%20bracelet%20gift%20set%2C%20premium%20boutique%2C%20studio%20product%20photo%2C%20clean%20background&image_size=square', NULL, '["Blanco","Negro","Rosé"]', TRUE, 2),
('mug-personalizado', 'CDF-REG-001', 'Mug Personalizado', 'Un detalle clásico con el toque personal que marca la diferencia.', 'regalos', 0, 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=personalized%20mug%20gift%20box%20with%20ribbon%2C%20studio%20product%20photo%2C%20clean%20background&image_size=square', NULL, '["Con foto","Con frase"]', TRUE, 1),
('caja-sorpresa', 'CDF-REG-002', 'Caja Sorpresa', 'Cajas premium con fotos, mensajes y detalles que emocionan.', 'regalos', 0, 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=surprise%20gift%20box%20with%20photos%20and%20chocolates%2C%20studio%20product%20photo%2C%20clean%20background&image_size=square', NULL, '["Romántica","Cumpleaños","Corporativa"]', TRUE, 2),
('desayuno-box', 'CDF-DES-001', 'Desayuno Sorpresa (Box)', 'Caja sorpresa con desayuno y detalles, perfecta para sorprender.', 'desayunos', 0, 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=breakfast%20surprise%20box%20with%20croissant%20coffee%20and%20flowers%2C%20studio%20product%20photo%2C%20clean%20background&image_size=square', NULL, '["Básico","Premium","Deluxe"]', TRUE, 1),
('desayuno-tray', 'CDF-DES-002', 'Desayuno Sorpresa (Bandeja)', 'Presentación en bandeja, ideal para un impacto premium al entregar.', 'desayunos', 0, 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=premium%20breakfast%20tray%20with%20balloon%20and%20greeting%20card%2C%20studio%20product%20photo%2C%20clean%20background&image_size=square', NULL, '["Premium","Empresarial"]', TRUE, 2),
('ancheta-premium', 'CDF-ANC-001', 'Ancheta Premium', 'Anchetas con estética boutique: selección cuidada y empaque premium.', 'anchetas', 0, 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=premium%20gift%20hamper%20with%20wine%20chocolates%20and%20ribbon%2C%20studio%20product%20photo%2C%20clean%20background&image_size=square', NULL, '["Cumpleaños","Navidad","Corporativa"]', TRUE, 1),
('ancheta-cumple', 'CDF-ANC-002', 'Ancheta de Cumpleaños', 'Combo listo para regalar con selección personalizada y empaque especial.', 'anchetas', 0, 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=birthday%20gift%20basket%20with%20snacks%20and%20teddy%20bear%2C%20studio%20product%20photo%2C%20clean%20background&image_size=square', NULL, '["Clásica","Premium"]', TRUE, 2)
ON CONFLICT (sku) DO UPDATE SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  price = EXCLUDED.price,
  image = EXCLUDED.image,
  images = EXCLUDED.images,
  variants = EXCLUDED.variants,
  active = EXCLUDED.active,
  "order" = EXCLUDED."order";
