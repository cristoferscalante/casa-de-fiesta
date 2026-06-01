export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  variants?: string[];
  image?: string;
  images?: string[];
  sku: string;
  price: number;
  active: boolean;
  order: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
}

const img = (prompt: string) =>
  `https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=${prompt}&image_size=square`;

export const categories: Category[] = [
  {
    id: 'globos',
    name: 'Globos Sempertex',
    description: 'Metalizados, cromados, tubo, latex y arreglos en todos los tamanos',
    icon: 'celebration',
    image: img(
      'studio%20product%20photo%20of%20premium%20colorful%20latex%20balloons%20bouquet%2C%20party%20boutique%20aesthetic%2C%20clean%20background%2C%20soft%20studio%20lighting%2C%20high%20detail'
    ),
  },
  {
    id: 'pinateria',
    name: 'Piñatería',
    description: 'Piñatas temáticas, decoración y dulceros',
    icon: 'local_activity',
    image: img(
      'flat%20lay%20product%20photo%20of%20themed%20pinata%20with%20confetti%20and%20party%20decorations%2C%20premium%20boutique%20aesthetic%2C%20clean%20background%2C%20soft%20studio%20lighting'
    ),
  },
  {
    id: 'insumos',
    name: 'Insumos para Piñatería',
    description: 'Foami, silicona, escarcha, papel crepé y más',
    icon: 'handyman',
    image: img(
      'flat%20lay%20product%20photo%20of%20craft%20supplies%20for%20party%20decor%3A%20crepe%20paper%2C%20ribbons%2C%20glitter%2C%20hot%20glue%20sticks%2C%20premium%20boutique%20aesthetic%2C%20clean%20background'
    ),
  },
  {
    id: 'accesorios',
    name: 'Accesorios',
    description: 'Aretes, collares, pulseras, rosarios y detalles para regalar',
    icon: 'diamond',
    image: img(
      'studio%20product%20photo%20of%20elegant%20handmade%20accessories%20set%3A%20earrings%20bracelets%2C%20gift%20boutique%20aesthetic%2C%20clean%20background%2C%20soft%20studio%20lighting'
    ),
  },
  {
    id: 'regalos',
    name: 'Regalos Personalizados',
    description: 'Mugs, cuadros, cajas sorpresa y kits románticos',
    icon: 'redeem',
    image: img(
      'studio%20product%20photo%20of%20personalized%20gift%20box%20with%20ribbon%20and%20greeting%20card%2C%20premium%20boutique%20aesthetic%2C%20clean%20background%2C%20soft%20studio%20lighting'
    ),
  },
  {
    id: 'desayunos',
    name: 'Desayunos Sorpresa',
    description: 'Básico, premium, deluxe y empresarial',
    icon: 'breakfast_dining',
    image: img(
      'studio%20product%20photo%20of%20breakfast%20surprise%20tray%20with%20flowers%20and%20gift%2C%20premium%20boutique%20aesthetic%2C%20clean%20background%2C%20soft%20morning%20lighting'
    ),
  },
  {
    id: 'anchetas',
    name: 'Anchetas y Combos',
    description: 'Arreglos para cumpleaños, fiestas, fechas especiales y regalos corporativos',
    icon: 'gift',
    image: img(
      'studio%20product%20photo%20of%20premium%20gift%20hamper%20(ancheta)%20with%20snacks%20and%20ribbon%2C%20boutique%20aesthetic%2C%20clean%20background%2C%20soft%20studio%20lighting'
    ),
  },
];

export const products: Product[] = [
  {
    id: 'globos-pastel-pack',
    name: 'Pack Globos Pastel Sempertex',
    category: 'globos',
    description: 'Globos Sempertex en tonos suaves para arcos, bouquets y decoraciones elegantes.',
    variants: ['R-12', 'R-18', 'Surtidos'],
    image: '/imagenes-productos/globos-pastel-pack.webp',
    sku: 'CDF-GLO-001',
    price: 0,
    active: true,
    order: 1,
  },
  {
    id: 'globos-cromados-bouquet',
    name: 'Bouquet Globos Cromados',
    category: 'globos',
    description: 'Acabado metalizado y brillante para montajes llamativos en fiestas y fechas especiales.',
    variants: ['Oro', 'Plata', 'Rose Gold'],
    image: '/imagenes-productos/globos-cromados-bouquet.webp',
    sku: 'CDF-GLO-002',
    price: 0,
    active: true,
    order: 2,
  },
  {
    id: 'pinata-tematica',
    name: 'Piñata Temática',
    category: 'pinateria',
    description: 'Diseños temáticos para cumpleaños y fechas especiales.',
    variants: ['Pequeña', 'Mediana', 'Grande'],
    image: '/imagenes-productos/pinata-tematica.webp',
    sku: 'CDF-PIN-001',
    price: 0,
    active: true,
    order: 1,
  },
  {
    id: 'kit-decoracion',
    name: 'Kit de Decoración',
    category: 'pinateria',
    description: 'Banderines, guirnaldas y detalles para ambientar en minutos.',
    variants: ['Cumpleaños', 'Amor y Amistad', 'Baby Shower'],
    image: '/imagenes-productos/kit-decoracion.webp',
    sku: 'CDF-PIN-002',
    price: 0,
    active: true,
    order: 2,
  },
  {
    id: 'foami-escarcha',
    name: 'Set Foami + Escarcha',
    category: 'insumos',
    description: 'Materiales esenciales para personalizar dulceros y decoraciones.',
    variants: ['Colores surtidos'],
    image: img(
      'craft%20foam%20sheets%20and%20glitter%20set%20for%20party%20decor%2C%20studio%20product%20photo%2C%20clean%20background'
    ),
    sku: 'CDF-INS-001',
    price: 0,
    active: true,
    order: 1,
  },
  {
    id: 'silicona-ribbons',
    name: 'Silicona + Cintas Decorativas',
    category: 'insumos',
    description: 'Para acabados limpios y armados resistentes en tus proyectos.',
    variants: ['Barras estándar', 'Barras largas'],
    image: img(
      'hot%20glue%20gun%20with%20glue%20sticks%20and%20colorful%20ribbons%2C%20studio%20product%20photo%2C%20clean%20background'
    ),
    sku: 'CDF-INS-002',
    price: 0,
    active: true,
    order: 2,
  },
  {
    id: 'set-accesorios',
    name: 'Set de Accesorios',
    category: 'accesorios',
    description: 'Piezas elegantes para complementar tu ocasión especial.',
    variants: ['Dorado', 'Plata'],
    image: img(
      'elegant%20handmade%20accessories%20set%2C%20earrings%20and%20bracelet%2C%20studio%20product%20photo%2C%20clean%20background'
    ),
    sku: 'CDF-ACC-001',
    price: 0,
    active: true,
    order: 1,
  },
  {
    id: 'rosario-set',
    name: 'Rosario + Pulsera',
    category: 'accesorios',
    description: 'Detalle delicado para regalar o lucir con intención.',
    variants: ['Blanco', 'Negro', 'Rosé'],
    image: img(
      'rosary%20bracelet%20gift%20set%2C%20premium%20boutique%2C%20studio%20product%20photo%2C%20clean%20background'
    ),
    sku: 'CDF-ACC-002',
    price: 0,
    active: true,
    order: 2,
  },
  {
    id: 'mug-personalizado',
    name: 'Mug Personalizado',
    category: 'regalos',
    description: 'Un detalle clásico con el toque personal que marca la diferencia.',
    variants: ['Con foto', 'Con frase'],
    image: img(
      'personalized%20mug%20gift%20box%20with%20ribbon%2C%20studio%20product%20photo%2C%20clean%20background'
    ),
    sku: 'CDF-REG-001',
    price: 0,
    active: true,
    order: 1,
  },
  {
    id: 'caja-sorpresa',
    name: 'Caja Sorpresa',
    category: 'regalos',
    description: 'Cajas premium con fotos, mensajes y detalles que emocionan.',
    variants: ['Romántica', 'Cumpleaños', 'Corporativa'],
    image: img(
      'surprise%20gift%20box%20with%20photos%20and%20chocolates%2C%20studio%20product%20photo%2C%20clean%20background'
    ),
    sku: 'CDF-REG-002',
    price: 0,
    active: true,
    order: 2,
  },
  {
    id: 'desayuno-box',
    name: 'Desayuno Sorpresa (Box)',
    category: 'desayunos',
    description: 'Caja sorpresa con desayuno y detalles, perfecta para sorprender.',
    variants: ['Básico', 'Premium', 'Deluxe'],
    image: img(
      'breakfast%20surprise%20box%20with%20croissant%20coffee%20and%20flowers%2C%20studio%20product%20photo%2C%20clean%20background'
    ),
    sku: 'CDF-DES-001',
    price: 0,
    active: true,
    order: 1,
  },
  {
    id: 'desayuno-tray',
    name: 'Desayuno Sorpresa (Bandeja)',
    category: 'desayunos',
    description: 'Presentación en bandeja, ideal para un impacto premium al entregar.',
    variants: ['Premium', 'Empresarial'],
    image: img(
      'premium%20breakfast%20tray%20with%20balloon%20and%20greeting%20card%2C%20studio%20product%20photo%2C%20clean%20background'
    ),
    sku: 'CDF-DES-002',
    price: 0,
    active: true,
    order: 2,
  },
  {
    id: 'ancheta-premium',
    name: 'Ancheta Premium',
    category: 'anchetas',
    description: 'Anchetas con estética boutique: selección cuidada y empaque premium.',
    variants: ['Cumpleaños', 'Navidad', 'Corporativa'],
    image: img(
      'premium%20gift%20hamper%20with%20wine%20chocolates%20and%20ribbon%2C%20studio%20product%20photo%2C%20clean%20background'
    ),
    sku: 'CDF-ANC-001',
    price: 0,
    active: true,
    order: 1,
  },
  {
    id: 'ancheta-cumple',
    name: 'Ancheta de Cumpleaños',
    category: 'anchetas',
    description: 'Combo listo para regalar con selección personalizada y empaque especial.',
    variants: ['Clásica', 'Premium'],
    image: img(
      'birthday%20gift%20basket%20with%20snacks%20and%20teddy%20bear%2C%20studio%20product%20photo%2C%20clean%20background'
    ),
    sku: 'CDF-ANC-002',
    price: 0,
    active: true,
    order: 2,
  },
];
