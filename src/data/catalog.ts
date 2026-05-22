export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  variants?: string[];
  image?: string;
  images?: string[]; // Additional images for gallery
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

export const categories: Category[] = [
  {
    id: 'escobas',
    name: 'Escobas',
    description: 'Variedad de escobas según el tipo de cerda y uso',
    icon: 'cleaning_services',
    image: '/imagenes-productos/escobas.png'
  },
  {
    id: 'cepillos',
    name: 'Cepillos y Utensilios',
    description: 'Herramientas para limpieza profunda y remoción de suciedad',
    icon: 'brush',
    image: '/imagenes-productos/cepillo-plancha-tipo-cerda-dura.png'
  },
  {
    id: 'traperos',
    name: 'Traperos',
    description: 'Diferentes materiales y capacidades de absorción',
    icon: 'mop',
    image: '/imagenes-productos/traperos.png'
  },
  {
    id: 'jabones',
    name: 'Jabones y Químicos',
    description: 'Productos de limpieza para diversas superficies',
    icon: 'water_drop',
    image: '/imagenes-productos/jabones-1.png'
  },
  {
    id: 'esponjas',
    name: 'Esponjas y Esponjillas',
    description: 'Para diferentes niveles de abrasión y superficies',
    icon: 'soap',
    image: '/imagenes-productos/esponjilla-brilla-ollas.png'
  },
  {
    id: 'varios',
    name: 'Artículos Varios',
    description: 'Productos complementarios de higiene y hogar',
    icon: 'shopping_basket',
    image: '/imagenes-productos/guantes-domesticos.png'
  }
];

export const products: Product[] = [
  // Escobas
  {
    id: 'escoba-dr-suave',
    name: 'Escoba DR Cerda Suave',
    category: 'escobas',
    description: 'Escoba de diseño ergonómico con cerda suave ideal para interiores',
    image: '/imagenes-productos/esc-001.webp',
    images: ['/imagenes-productos/escoba-dr-cerda-suave.png'],
    sku: 'ESC-001',
    price: 17000,
    active: true,
    order: 1
  },
  {
    id: 'escoba-zulia-suave',
    name: 'Escoba Zulia Cerda Suave',
    category: 'escobas',
    description: 'Diseño tradicional con cerda suave para todo tipo de pisos',
    image: '/imagenes-productos/esc-002.webp',
    images: ['/imagenes-productos/escoba-zulia-cerda-suabe.png'],
    sku: 'ESC-002',
    price: 16000,
    active: true,
    order: 2
  },
  {
    id: 'escoba-dura-zulia',
    name: 'Escoba Dura Cerda Zulia',
    category: 'escobas',
    description: 'Escoba de cerda dura ideal para exteriores y superficies rugosas',
    image: '/imagenes-productos/esc-003.webp',
    images: ['/imagenes-productos/escoba-dura-cerda-zulia.png'],
    sku: 'ESC-003',
    price: 19000,
    active: true,
    order: 3
  },
  {
    id: 'escoba-neon-suave',
    name: 'Escoba Neón Cerda Suave',
    category: 'escobas',
    description: 'Escoba de diseño moderno con colores vibrantes y cerda suave',
    image: '/imagenes-productos/esc-004.webp',
    images: ['/imagenes-productos/escoba-neon-cerda-suave.png'],
    sku: 'ESC-004',
    price: 17500,
    active: true,
    order: 4
  },
  {
    id: 'escoba-tr-dura',
    name: 'Escoba TR Tipo Cerda Dura',
    category: 'escobas',
    description: 'Escoba de alta resistencia con cerdas duras para exteriores',
    image: '/imagenes-productos/esc-005.webp',
    images: ['/imagenes-productos/escoba-tr-tipo-cerda-dura.png'],
    sku: 'ESC-005',
    price: 18000,
    active: true,
    order: 5
  },
  {
    id: 'escoba-tr-suave',
    name: 'Escoba TR Tipo Cerda Suave',
    category: 'escobas',
    description: 'Escoba con sistema de barrido eficiente para interiores',
    image: '/imagenes-productos/esc-006.webp',
    images: ['/imagenes-productos/escoba-tr-tipo-cerda-suave.png'],
    sku: 'ESC-006',
    price: 18000,
    active: true,
    order: 6
  },
  {
    id: 'escoba-wm-suave',
    name: 'Escoba WM Cerda Suave',
    category: 'escobas',
    description: 'Modelo profesional para limpieza eficiente en el hogar',
    image: '/imagenes-productos/esc-007.webp',
    images: ['/imagenes-productos/escoba-wm-cerda-suave.png'],
    sku: 'ESC-007',
    price: 20000,
    active: true,
    order: 7
  },

  // Cepillos
  {
    id: 'cepillo-brillo',
    name: 'Cepillo Brillo Tipo Cerda Suave',
    category: 'cepillos',
    description: 'Cepillo multiusos de cerda suave ideal para dar brillo a superficies',
    image: '/imagenes-productos/cep-001.webp',
    images: ['/imagenes-productos/cepillo-brillo-tipo-cerda-suave-multiusos.png'],
    sku: 'CEP-001',
    price: 11000,
    active: true,
    order: 1
  },
  {
    id: 'cepillo-plancha',
    name: 'Cepillo Plancha Tipo Cerda Dura',
    category: 'cepillos',
    description: 'Cepillo de cerda dura estilo plancha para limpieza profunda',
    image: '/imagenes-productos/cep-002.webp',
    images: ['/imagenes-productos/cepillo-plancha-tipo-cerda-dura.png'],
    sku: 'CEP-002',
    price: 12000,
    active: true,
    order: 2
  },
  {
    id: 'cepillo-telaranero',
    name: 'Cepillo Telarañero',
    category: 'cepillos',
    description: 'Herramienta diseñada para remover telarañas en techos y rincones altos',
    image: '/imagenes-productos/cep-003.webp',
    images: ['/imagenes-productos/cepillo-telarañero.png'],
    sku: 'CEP-003',
    price: 15000,
    active: true,
    order: 3
  },
  {
    id: 'churrasco-bano',
    name: 'Churrasco para Baño',
    category: 'cepillos',
    description: 'Cepillo especializado para limpieza de sanitarios y baños',
    image: '/imagenes-productos/cep-004.webp',
    images: ['/imagenes-productos/churrasco-para-baño.png'],
    sku: 'CEP-004',
    price: 14000,
    active: true,
    order: 4
  },
  {
    id: 'rastrillo',
    name: 'Rastrillo',
    category: 'cepillos',
    description: 'Para recolección de residuos en jardines y exteriores',
    image: '/imagenes-productos/cep-005.webp',
    images: ['/imagenes-productos/rastrillo.png'],
    sku: 'CEP-005',
    price: 16000,
    active: true,
    order: 5
  },
  {
    id: 'recogedor-plus',
    name: 'Recogedor Plus con Banda',
    category: 'cepillos',
    description: 'Recogedor plástico con banda de goma para un mejor sellado',
    image: '/imagenes-productos/cep-006.webp',
    images: ['/imagenes-productos/recogedor-plus-banda.png'],
    sku: 'CEP-006',
    price: 10000,
    active: true,
    order: 6
  },
  {
    id: 'recogedor-smart',
    name: 'Recogedor Smart',
    category: 'cepillos',
    description: 'Recogedor plástico de diseño inteligente y ergonómico',
    image: '/imagenes-productos/cep-007.webp',
    images: ['/imagenes-productos/recogedor-smart.png'],
    sku: 'CEP-007',
    price: 12000,
    active: true,
    order: 7
  },

  // Traperos
  {
    id: 'trapero-microfibra',
    name: 'Trapero de Microfibra',
    category: 'traperos',
    description: 'Máxima absorción y durabilidad con tecnología de microfibra',
    image: '/imagenes-productos/trp-001.webp',
    images: ['/imagenes-productos/trapero-micro-fibra.png'],
    sku: 'TRP-001',
    price: 25000,
    active: true,
    order: 1
  },
  {
    id: 'trapero-copa',
    name: 'Trapero Tipo Copa',
    category: 'traperos',
    description: 'Trapero clásico tipo copa de alta resistencia y limpieza eficiente',
    image: '/imagenes-productos/trp-002.webp',
    images: ['/imagenes-productos/trapero-tipo-copa.png'],
    sku: 'TRP-002',
    price: 15000,
    active: true,
    order: 2
  },

  // Jabones y Químicos
  {
    id: 'detergente-liquido',
    name: 'Detergente Líquido',
    category: 'jabones',
    description: 'Detergente líquido disponible en presentaciones de 4000ml, 2000ml y 1000ml',
    variants: ['1000ml', '2000ml', '4000ml'],
    image: '/imagenes-productos/jab-001.webp',
    images: ['/imagenes-productos/detergente-liquido-4000ml-2000ml-1000ml.png'],
    sku: 'JAB-001',
    price: 8500,
    active: true,
    order: 1
  },
  {
    id: 'crema-lavaloza-1000g',
    name: 'Jabón Crema Lavaloza 1000g',
    category: 'jabones',
    description: 'Jabón lavaloza en crema, presentación económica de 1000g',
    image: '/imagenes-productos/jab-002.webp',
    images: ['/imagenes-productos/jabon-crema-lavaloza-1000g.png'],
    sku: 'JAB-002',
    price: 9500,
    active: true,
    order: 2
  },
  {
    id: 'jabon-dado-taza',
    name: 'Jabón Dado Taza 250g',
    category: 'jabones',
    description: 'Jabón en barra presentación taza de 250 gramos para múltiples usos',
    image: '/imagenes-productos/jab-003.webp',
    images: ['/imagenes-productos/jabon-dado-taza-250grs.png'],
    sku: 'JAB-003',
    price: 4500,
    active: true,
    order: 3
  },
  {
    id: 'jabon-liquido-manos',
    name: 'Jabón Líquido para Manos',
    category: 'jabones',
    description: 'Jabón antibacterial suave y efectivo para el cuidado de las manos',
    image: '/imagenes-productos/jab-004.webp',
    images: ['/imagenes-productos/jabon-liquido-poara-manos.png'],
    sku: 'JAB-004',
    price: 12000,
    active: true,
    order: 4
  },
  {
    id: 'limpiador-cocina',
    name: 'Limpiador de Cocina',
    category: 'jabones',
    description: 'Limpiador desengrasante especializado para cocinas',
    image: '/imagenes-productos/jab-005.webp',
    images: ['/imagenes-productos/limpiadores-cocina.png'],
    sku: 'JAB-005',
    price: 10000,
    active: true,
    order: 5
  },
  {
    id: 'limpiador-multiusos',
    name: 'Limpiador Multiusos',
    category: 'jabones',
    description: 'Limpiador versátil para todo tipo de superficies en el hogar',
    image: '/imagenes-productos/jab-006.webp',
    images: ['/imagenes-productos/limpiadores-multiusos.png'],
    sku: 'JAB-006',
    price: 8000,
    active: true,
    order: 6
  },
  {
    id: 'limpia-vidrios',
    name: 'Limpia Vidrios',
    category: 'jabones',
    description: 'Producto especializado para limpiar vidrios y espejos sin dejar marcas',
    image: '/imagenes-productos/jab-007.webp',
    images: ['/imagenes-productos/limpia-vidrios.png'],
    sku: 'JAB-007',
    price: 7500,
    active: true,
    order: 7
  },
  {
    id: 'silicona-madera',
    name: 'Silicona Limpieza de Madera',
    category: 'jabones',
    description: 'Silicona protectora y limpiadora para muebles de madera',
    image: '/imagenes-productos/silicona-limpieza-de-madera.png',
    sku: 'JAB-008',
    price: 11000,
    active: true,
    order: 8
  },

  // Esponjas
  {
    id: 'esponja-doble-x24',
    name: 'Esponja Doble Uso x24 Unidades',
    category: 'esponjas',
    description: 'Paquete de 24 esponjas de doble uso para la cocina',
    image: '/imagenes-productos/esp-001.webp',
    images: ['/imagenes-productos/esponja-doble-uso-x24-unidades.png'],
    sku: 'ESP-001',
    price: 18000,
    active: true,
    order: 1
  },
  {
    id: 'esponja-multiusos-x12',
    name: 'Esponja Multiusos (12 paquetes x3)',
    category: 'esponjas',
    description: 'Presentación al por mayor: 12 paquetes de 3 unidades cada uno',
    image: '/imagenes-productos/esp-002.webp',
    images: ['/imagenes-productos/esponja-multiusos-x12-paquetes-detres-unidades.png'],
    sku: 'ESP-002',
    price: 25000,
    active: true,
    order: 2
  },
  {
    id: 'esponja-sabra-x36',
    name: 'Esponja Sabra x36 Unidades',
    category: 'esponjas',
    description: 'Paquete institucional de 36 unidades de esponja Sabra',
    image: '/imagenes-productos/esponja-sabra-x36unidades.png',
    sku: 'ESP-003',
    price: 28000,
    active: true,
    order: 3
  },
  {
    id: 'esponjas-power-x2',
    name: 'Esponjas Power x2 Unid',
    category: 'esponjas',
    description: 'Paquete económico de 2 esponjas marca Power',
    image: '/imagenes-productos/esp-004.webp',
    images: ['/imagenes-productos/esponjas-power-x2unid.png'],
    sku: 'ESP-004',
    price: 4000,
    active: true,
    order: 4
  },
  {
    id: 'esponjilla-brilla-ollas',
    name: 'Esponjilla Brilla Ollas',
    category: 'esponjas',
    description: 'Esponjilla metálica ideal para dar brillo a ollas y superficies duras',
    image: '/imagenes-productos/esp-005.webp',
    images: ['/imagenes-productos/esponjilla-brilla-ollas.png'],
    sku: 'ESP-005',
    price: 3000,
    active: true,
    order: 5
  },
  {
    id: 'esponjilla-brillo-x12',
    name: 'Esponjilla de Brillo x12 Unidades',
    category: 'esponjas',
    description: 'Paquete de 12 esponjillas metálicas para trabajo pesado',
    image: '/imagenes-productos/esp-006.webp',
    images: ['/imagenes-productos/esponjilla-de-brillo-x12unidades.png'],
    sku: 'ESP-006',
    price: 15000,
    active: true,
    order: 6
  },
  {
    id: 'esponjilla-earth-x12',
    name: 'Esponjilla Earth x12 Unidades',
    category: 'esponjas',
    description: 'Paquete de 12 esponjillas marca Earth de alta durabilidad',
    image: '/imagenes-productos/esp-007.webp',
    images: ['/imagenes-productos/esponjilla-earth-x12unidades.png'],
    sku: 'ESP-007',
    price: 14000,
    active: true,
    order: 7
  },
  {
    id: 'esponjilla-malla-x12',
    name: 'Esponjilla Malla Sencilla x12 Pares',
    category: 'esponjas',
    description: 'Paquete institucional de 12 pares de esponjillas tipo malla',
    image: '/imagenes-productos/esp-008.webp',
    images: ['/imagenes-productos/esponjilla-malla-sencilla-x12pares.png'],
    sku: 'ESP-008',
    price: 12000,
    active: true,
    order: 8
  },
  {
    id: 'esponjilla-james-x12',
    name: 'Esponjilla Marca James x12 Unidades',
    category: 'esponjas',
    description: 'Paquete de 12 esponjillas calidad premium marca James',
    image: '/imagenes-productos/esp-009.webp',
    images: ['/imagenes-productos/esponjilla-marca-james-x12unidades.png'],
    sku: 'ESP-009',
    price: 13500,
    active: true,
    order: 9
  },
  {
    id: 'esponjilla-multiusos-x12',
    name: 'Esponjilla Multiusos x12 Unidades',
    category: 'esponjas',
    description: 'Paquete de 12 unidades de esponjillas para limpieza general',
    image: '/imagenes-productos/esp-010.webp',
    images: ['/imagenes-productos/esponjilla-multiusos-x12unidades.png'],
    sku: 'ESP-010',
    price: 13000,
    active: true,
    order: 10
  },
  {
    id: 'esponjilla-powerd',
    name: 'Esponjilla PowerD',
    category: 'esponjas',
    description: 'Esponjilla abrasiva de marca PowerD para uso rudo',
    image: '/imagenes-productos/esp-011.webp',
    images: ['/imagenes-productos/esponjilla-powerd.png'],
    sku: 'ESP-011',
    price: 2500,
    active: true,
    order: 11
  },
  {
    id: 'sabra-super-abrasiva',
    name: 'Sabra Super Abrasiva',
    category: 'esponjas',
    description: 'Almohadilla super abrasiva ideal para parrillas y trabajo pesado',
    variants: ['7x10cm', '10x14cm'],
    image: '/imagenes-productos/esp-012.webp',
    images: ['/imagenes-productos/sabra-super-abrasiva-7x10cm-10x14cm-ideales-parrillas-pesado.png'],
    sku: 'ESP-012',
    price: 3500,
    active: true,
    order: 12
  },

  // Varios
  {
    id: 'chupa-sanitario',
    name: 'Chupa Sanitario Plástico Económica',
    category: 'varios',
    description: 'Destapador de sanitarios en material plástico, versión económica',
    image: '/imagenes-productos/var-001.webp',
    images: ['/imagenes-productos/chupa-sanitario-plastico-economica.png'],
    sku: 'VAR-001',
    price: 8000,
    active: true,
    order: 1
  },
  {
    id: 'guantes-desechables-x100',
    name: 'Guantes Desechables x100 Unidades',
    category: 'varios',
    description: 'Caja de 100 guantes desechables especiales para restaurantes',
    image: '/imagenes-productos/var-002.webp',
    images: ['/imagenes-productos/guantes-desechables-x100unidades-restaurantes.png'],
    sku: 'VAR-002',
    price: 25000,
    active: true,
    order: 2
  },
  {
    id: 'guantes-domesticos',
    name: 'Guantes Domésticos',
    category: 'varios',
    description: 'Guantes de látex reforzados para labores de limpieza en el hogar',
    variants: ['Talla 7', 'Talla 7.5', 'Talla 8'],
    image: '/imagenes-productos/var-003.webp',
    images: ['/imagenes-productos/guantes-domesticos.png'],
    sku: 'VAR-003',
    price: 6000,
    active: true,
    order: 3
  },
  {
    id: 'rollo-cinta-12mm',
    name: 'Cinta Transparente Delgada 12mm',
    category: 'varios',
    description: 'Rollo de cinta transparente delgada de 12mm marca Eterna',
    image: '/imagenes-productos/var-004.webp',
    images: ['/imagenes-productos/rollo-cinta-trasnparente-delgada-12mmX12eterna.png'],
    sku: 'VAR-004',
    price: 3500,
    active: true,
    order: 4
  },
  {
    id: 'rollo-cinta-x12',
    name: 'Rollo de Cinta x12 Unidades',
    category: 'varios',
    description: 'Paquete institucional de 12 rollos de cinta adhesiva',
    image: '/imagenes-productos/var-005.webp',
    images: ['/imagenes-productos/rollo-cinta-x12unidades.png'],
    sku: 'VAR-005',
    price: 35000,
    active: true,
    order: 5
  },
  {
    id: 'condones-20sets',
    name: 'Condones 20 Sets x3 Pcs',
    category: 'varios',
    description: 'Caja dispensadora de condones, 20 sets de 3 unidades',
    image: '/imagenes-productos/var-006.webp',
    images: ['/imagenes-productos/condones-20sets-x3pcs.png'],
    sku: 'VAR-006',
    price: 45000,
    active: true,
    order: 6
  }
];