PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
			id SERIAL PRIMARY KEY,
			hash text NOT NULL,
			created_at numeric
		);
INSERT INTO __drizzle_migrations VALUES(NULL,'bda62476fd0f5e5b0bf9c3e5fef9cc4237afaac0173de0044cd374b747749c61',1775498786547);
CREATE TABLE `categories` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`icon` text,
	`order` integer DEFAULT 0,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
INSERT INTO categories VALUES('escobas','Escobas','Variedad de escobas según el tipo de cerda y uso','cleaning_services',0,1775498889,1775498889);
INSERT INTO categories VALUES('cepillos','Cepillos y Utensilios','Herramientas para limpieza profunda y remoción de suciedad','brush',0,1775498889,1775498889);
INSERT INTO categories VALUES('traperos','Traperos','Diferentes materiales y capacidades de absorción','mop',0,1775498889,1775498889);
INSERT INTO categories VALUES('jabones','Jabones y Químicos','Productos de limpieza para diversas superficies','water_drop',0,1775498889,1775498889);
INSERT INTO categories VALUES('esponjas','Esponjas y Esponjillas','Para diferentes niveles de abrasión y superficies','soap',0,1775498889,1775498889);
INSERT INTO categories VALUES('varios','Artículos Varios','Productos complementarios de higiene y hogar','shopping_basket',0,1775498889,1775498889);
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`sku` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`category_id` text,
	`price` integer NOT NULL,
	`image` text,
	`variants` text,
	`active` integer DEFAULT true,
	`order` integer DEFAULT 0,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
INSERT INTO products VALUES('escoba-tr','ESC-001','Escoba TR','Escoba de alta calidad con sistema de barrido eficiente','escobas',1800000,'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400','["Cerda dura","Cerda suave"]',1,1,1775498889,1775498889);
INSERT INTO products VALUES('escoba-zulia','ESC-002','Escoba Zulia','Diseño tradicional con cerda suave para todo tipo de pisos','escobas',1600000,'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400','["Cerda suave"]',1,2,1775498889,1775498889);
INSERT INTO products VALUES('escoba-dura','ESC-003','Escoba Dura','Ideal para exteriores y superficies rugosas','escobas',1900000,'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400','["Tipo cerda Zulia"]',1,3,1775498889,1775498889);
INSERT INTO products VALUES('escoba-dr','ESC-004','Escoba DR','Escoba de diseño ergonómico con cerda suave','escobas',1700000,'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400','["Cerda suave"]',1,4,1775498889,1775498889);
INSERT INTO products VALUES('escoba-wm','ESC-005','Escoba WM','Modelo profesional para limpieza eficiente','escobas',2000000,'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400','["Cerda suave"]',1,5,1775498889,1775498889);
INSERT INTO products VALUES('escoba-neon','ESC-006','Escoba Neón','Diseño moderno con colores vibrantes','escobas',1750000,'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400','["Cerda suave"]',1,6,1775498889,1775498889);
INSERT INTO products VALUES('cepillo-plancha','CEP-001','Cepillo Plancha','Cepillo de cerda dura para limpieza profunda','cepillos',1200000,'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400','["Cerda dura"]',1,1,1775498889,1775498889);
INSERT INTO products VALUES('cepillo-brillo','CEP-002','Cepillo Brillo','Ideal para dar brillo a superficies delicadas','cepillos',1100000,'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400','["Cerda suave"]',1,2,1775498889,1775498889);
INSERT INTO products VALUES('multiusos-telaranero','CEP-003','Multiusos y Telarañero','Herramienta versátil para limpieza general y techos','cepillos',1500000,'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400',NULL,1,3,1775498889,1775498889);
INSERT INTO products VALUES('cepillo-bano','CEP-004','Cepillo para Baño','Especializado para limpieza de sanitarios','cepillos',1400000,'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400',NULL,1,4,1775498889,1775498889);
INSERT INTO products VALUES('limpia-vidrios','CEP-005','Limpia Vidrios','Para dejar tus vidrios impecables sin rayas','cepillos',1300000,'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400',NULL,1,5,1775498889,1775498889);
INSERT INTO products VALUES('recogedor-plus','CEP-006','Recogedor Plus Banda','Recogedor con banda de goma para mejor sellado','cepillos',1000000,'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400',NULL,1,6,1775498889,1775498889);
INSERT INTO products VALUES('recogedor-smart','CEP-007','Recogedor Smart','Diseño inteligente y ergonómico','cepillos',1200000,'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400',NULL,1,7,1775498889,1775498889);
INSERT INTO products VALUES('rastrillo','CEP-008','Rastrillo','Para recolección de residuos en exteriores','cepillos',1600000,'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400',NULL,1,8,1775498889,1775498889);
INSERT INTO products VALUES('trapero-microfibra','TRP-001','Trapero de Microfibra','Máxima absorción y durabilidad con tecnología de microfibra','traperos',2500000,'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400',NULL,1,1,1775498889,1775498889);
INSERT INTO products VALUES('trapero-copa-500','TRP-002','Trapero Tipo Copa 500','Trapero tipo copa referencia 500','traperos',1200000,'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400',NULL,1,2,1775498889,1775498889);
INSERT INTO products VALUES('trapero-copa-800','TRP-003','Trapero Tipo Copa 800','Trapero tipo copa referencia 800','traperos',1500000,'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400',NULL,1,3,1775498889,1775498889);
INSERT INTO products VALUES('trapero-copa-1000','TRP-004','Trapero Tipo Copa 1000','Trapero tipo copa referencia 1000','traperos',1800000,'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400',NULL,1,4,1775498889,1775498889);
INSERT INTO products VALUES('trapero-copa-1200','TRP-005','Trapero Tipo Copa 1200','Trapero tipo copa referencia 1200, máxima capacidad','traperos',2200000,'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400',NULL,1,5,1775498889,1775498889);
INSERT INTO products VALUES('detergente-1000ml','JAB-001','Detergente Líquido Deter Max Biorey 1000ml','Detergente líquido de alta concentración para ropa, 1000ml','jabones',850000,'https://lh3.googleusercontent.com/aida-public/AB6AXuAfp3RatSEVLgb4oYhlmfiXztweqVNwJbX6HSi-9-C8hjC-5r0GSWgNeszvhDq6PgCnLYqZjpp_m2nyfRSN5wQbHmwICdFHo-jP_ZzO6FpeGIQlQl1KkBPHa4zZlLi036MOMDxd8qzb3sqPk4_DXC9HfvGuCFlYcs_cJffqGjRgd-zRV4ylRpqNmYP8zVeGsR-x7RFOqnaTFpuwk3ErpcSgzDTbVGidKSPCnBOxryjGBS8C6wEKz7wfUPzXiGoHNMQVpNIA3xF_QiQ',NULL,1,1,1775498889,1775498889);
INSERT INTO products VALUES('detergente-2000ml','JAB-002','Detergente Líquido Deter Max Biorey 2000ml','Detergente líquido de alta concentración para ropa, 2000ml','jabones',1500000,'https://lh3.googleusercontent.com/aida-public/AB6AXuAfp3RatSEVLgb4oYhlmfiXztweqVNwJbX6HSi-9-C8hjC-5r0GSWgNeszvhDq6PgCnLYqZjpp_m2nyfRSN5wQbHmwICdFHo-jP_ZzO6FpeGIQlQl1KkBPHa4zZlLi036MOMDxd8qzb3sqPk4_DXC9HfvGuCFlYcs_cJffqGjRgd-zRV4ylRpqNmYP8zVeGsR-x7RFOqnaTFpuwk3ErpcSgzDTbVGidKSPCnBOxryjGBS8C6wEKz7wfUPzXiGoHNMQVpNIA3xF_QiQ',NULL,1,2,1775498889,1775498889);
INSERT INTO products VALUES('detergente-4000ml','JAB-003','Detergente Líquido Deter Max Biorey 4000ml','Detergente líquido de alta concentración para ropa, 4000ml','jabones',2800000,'https://lh3.googleusercontent.com/aida-public/AB6AXuAfp3RatSEVLgb4oYhlmfiXztweqVNwJbX6HSi-9-C8hjC-5r0GSWgNeszvhDq6PgCnLYqZjpp_m2nyfRSN5wQbHmwICdFHo-jP_ZzO6FpeGIQlQl1KkBPHa4zZlLi036MOMDxd8qzb3sqPk4_DXC9HfvGuCFlYcs_cJffqGjRgd-zRV4ylRpqNmYP8zVeGsR-x7RFOqnaTFpuwk3ErpcSgzDTbVGidKSPCnBOxryjGBS8C6wEKz7wfUPzXiGoHNMQVpNIA3xF_QiQ',NULL,1,3,1775498889,1775498889);
INSERT INTO products VALUES('jabon-liquido-manos','JAB-004','Jabón Líquido para Manos Antibacterial','Jabón líquido antibacterial para manos, suave y efectivo','jabones',1200000,'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400',NULL,1,4,1775498889,1775498889);
INSERT INTO products VALUES('jabon-dado','JAB-005','Jabón Dado','Jabón en barra tradicional para múltiples usos','jabones',350000,'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400',NULL,1,5,1775498889,1775498889);
INSERT INTO products VALUES('jabon-dado-poker','JAB-006','Jabón Dado Poker 250g','Jabón en barra presentación taza de 250 gramos','jabones',450000,'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400',NULL,1,6,1775498890,1775498890);
INSERT INTO products VALUES('crema-lavaloza','JAB-007','Crema Lavaloza Yzuax 1000g','Crema lavaloza aroma limón, presentación de 1000g','jabones',950000,'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400',NULL,1,7,1775498890,1775498890);
INSERT INTO products VALUES('limpia-vidrios-quimico','JAB-008','Limpia Vidrios Profesional','Limpiador de vidrios sin rayas ni manchas','jabones',750000,'https://lh3.googleusercontent.com/aida-public/AB6AXuBWZ1ojFpcgKguS13-QrwkZ6s3uxg33yrZ_qxTGOKzlJYc79D04JpPPYNfqSnvrjPvKP2P2waR5fthLeceGttjaL4JP4dPqS15nED5UeFXAQjaODsfsUZGLnlF189E8n6s65XiI0uyLXZB1coaRWe1qyTjHQBZ0tbexNz6ujPVVIdYKs-SEOTgPAw03TsAPw6O51lLMN2CYW3pdlrXn2y482wYQYx232c8A2oFKl-vLkS5m5FlDVZSMfHtpg1pOPVKN0KGoMu1LyXU',NULL,1,8,1775498890,1775498890);
INSERT INTO products VALUES('silicona-madera','JAB-009','Silicona para Madera','Silicona especializada para limpieza y cuidado de madera','jabones',1100000,'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400',NULL,1,9,1775498890,1775498890);
INSERT INTO products VALUES('esponja-power-multiuso','ESP-001','Esponja Power Multiuso x2','Esponjas multiuso marca Power, paquete de 2 unidades','esponjas',400000,'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=400',NULL,1,1,1775498890,1775498890);
INSERT INTO products VALUES('esponjilla-power-brillo','ESP-002','Esponjilla Power de Brillo x12','Esponjillas de brillo marca Power, paquete de 12 unidades','esponjas',1500000,'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=400',NULL,1,2,1775498890,1775498890);
INSERT INTO products VALUES('esponjilla-earth','ESP-003','Esponjilla Earth x12','Esponjillas marca Earth, paquete de 12 unidades','esponjas',1400000,'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=400',NULL,1,3,1775498890,1775498890);
INSERT INTO products VALUES('esponjilla-james','ESP-004','Esponjilla James x12','Esponjillas marca James, paquete de 12 unidades','esponjas',1350000,'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=400',NULL,1,4,1775498890,1775498890);
INSERT INTO products VALUES('sabra-super-7x10','ESP-005','Sabra Super Abrasiva 7x10cm','Ideal para trabajo pesado, ollas quemadas y parrillas','esponjas',250000,'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=400',NULL,1,5,1775498890,1775498890);
INSERT INTO products VALUES('sabra-super-10x14','ESP-006','Sabra Super Abrasiva 10x14cm','Ideal para trabajo pesado, ollas quemadas y parrillas - tamaño grande','esponjas',350000,'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=400',NULL,1,6,1775498890,1775498890);
INSERT INTO products VALUES('esponja-malla','ESP-007','Esponja de Malla Sencilla x12 pares','Esponjas de malla, presentación de 12 pares','esponjas',1200000,'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=400',NULL,1,7,1775498890,1775498890);
INSERT INTO products VALUES('esponja-doble-uso','ESP-008','Esponja Doble Uso x24','Esponjas de doble uso, paquete de 24 unidades','esponjas',1800000,'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=400',NULL,1,8,1775498890,1775498890);
INSERT INTO products VALUES('esponja-brilla-ollas','ESP-009','Esponja Brilla Ollas','Especial para dar brillo a ollas y utensilios de cocina','esponjas',300000,'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=400',NULL,1,9,1775498890,1775498890);
INSERT INTO products VALUES('guantes-domesticos-7','VAR-001','Guantes Domésticos Talla 7','Guantes de látex para limpieza del hogar','varios',600000,'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400',NULL,1,1,1775498890,1775498890);
INSERT INTO products VALUES('guantes-domesticos-7.5','VAR-002','Guantes Domésticos Talla 7½','Guantes de látex para limpieza del hogar','varios',600000,'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400',NULL,1,2,1775498890,1775498890);
INSERT INTO products VALUES('guantes-industriales','VAR-003','Guantes Industriales','Guantes resistentes para trabajo pesado','varios',850000,'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400',NULL,1,3,1775498890,1775498890);
INSERT INTO products VALUES('guantes-desechables','VAR-004','Guantes Desechables x100','Guantes desechables especiales para restaurantes, caja de 100 unidades','varios',2500000,'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400',NULL,1,4,1775498890,1775498890);
INSERT INTO products VALUES('cinta-enmascarar','VAR-005','Cinta de Enmascarar Rioto 20mt','Cinta de enmascarar marca Rioto, rollo de 20 metros','varios',500000,'https://images.unsplash.com/photo-1625683496726-e6df5763c0e0?w=400',NULL,1,5,1775498890,1775498890);
INSERT INTO products VALUES('cinta-transparente','VAR-006','Cinta Transparente Delgada 12mm','Rollo de cinta transparente delgada de 12mm','varios',350000,'https://images.unsplash.com/photo-1625683496726-e6df5763c0e0?w=400',NULL,1,6,1775498890,1775498890);
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`name` text,
	`role` text DEFAULT 'admin',
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
INSERT INTO users VALUES('3b62d9e9-f3fc-4394-b803-380bfa8d7e64','admin@misterlya.com','$2b$10$46hmcyHteCsZ1oOcDmHujepQzV7AUUN/zVeCRAX0Iso/MfTHGiWTy','Admin','admin',1775498889,1775498889);
CREATE UNIQUE INDEX `products_sku_unique` ON `products` (`sku`);
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
COMMIT;
