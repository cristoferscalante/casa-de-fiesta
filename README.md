# Mister LyA - Catálogo Web

Frontend profesional para Mister LyA, empresa de productos de limpieza y aseo. Desarrollado con Astro y Tailwind CSS.

## Características

- **Diseño Responsive**: Optimizado para móvil, tablet y desktop
- **Catálogo Completo**: 6 categorías con más de 50 productos
- **Diseño Moderno**: Basado en Material Design 3 con colores personalizados
- **Performance**: Carga rápida y optimizada con Astro
- **WhatsApp Integration**: Botón flotante para contacto directo
- **SEO Optimizado**: Meta tags y estructura semántica

## Secciones

1. **Home (Hero)**: Presentación principal con llamado a la acción
2. **Misión y Visión**: Propósito y valores de la empresa
3. **Catálogo**: 6 categorías de productos:
   - Escobas
   - Cepillos y Utensilios
   - Traperos
   - Jabones y Químicos
   - Esponjas y Esponjillas
   - Artículos Varios
4. **CTA**: Sección de llamado a la acción final
5. **Footer**: Información de contacto y enlaces

## Tecnologías

- **Astro 6.0.8**: Framework web moderno
- **Tailwind CSS**: Estilos utility-first via CDN
- **TypeScript**: Tipado estático para datos
- **Material Symbols**: Iconografía de Google

## Instalación

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## Estructura del Proyecto

```
src/
├── components/
│   ├── Navbar.astro          # Navegación principal
│   ├── Hero.astro             # Sección hero/home
│   ├── Mission.astro          # Misión y visión
│   ├── Catalog.astro          # Catálogo de productos
│   ├── CTA.astro              # Call to action
│   ├── Footer.astro           # Pie de página
│   └── WhatsAppButton.astro   # Botón flotante WhatsApp
├── data/
│   └── catalog.ts             # Datos de productos y categorías
├── layouts/
│   └── Layout.astro           # Layout base con estilos
└── pages/
    └── index.astro            # Página principal
```

## Configuración de Colores

El sitio utiliza un esquema de colores personalizado basado en Material Design 3:

- **Primary**: #00377e (Azul profundo)
- **Secondary**: #336b00 (Verde)
- **Surface**: #f7f9fb (Gris claro)

## Contacto

- **WhatsApp**: 311-541-2230
- **Teléfono**: 321-300-3840
- **Email**: misterlyalimpiezayaseo@gmail.com
- **Horario**: 8 AM - 6 PM (Lunes a Sábado)

## Desarrollo

El proyecto está configurado para usar:
- Node.js >= 22.12.0
- Astro 6.0.8
- Tailwind CSS via CDN

## Deploy

Para desplegar en producción:

```bash
npm run build
```

Los archivos estáticos se generarán en la carpeta `dist/` listos para desplegar en cualquier hosting estático (Vercel, Netlify, Cloudflare Pages, etc.).

## Licencia

© 2024 Mister LyA. Todos los derechos reservados.
