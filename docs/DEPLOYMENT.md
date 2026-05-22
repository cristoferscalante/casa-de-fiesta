# 🚀 Guía de Deployment en Vercel

Esta guía explica cómo desplegar el proyecto Mister LyA en Vercel.

---

## 📋 Pre-requisitos

Antes de desplegar, asegúrate de tener:

1. ✅ Cuenta de GitHub (con el repositorio)
2. ✅ Cuenta de Vercel (gratis en https://vercel.com)
3. ✅ Cuenta de Cloudinary (gratis en https://cloudinary.com)
4. ⚠️ (Opcional) Cuenta de Turso para base de datos en producción

---

## 🔧 Configuración de Cloudinary

### 1. Crear cuenta en Cloudinary
1. Ir a https://cloudinary.com
2. Crear cuenta gratuita (Sign Up)
3. Verificar email

### 2. Obtener credenciales
1. Ir al Dashboard después de login
2. En la sección "Account Details" encontrarás:
   - **Cloud Name**: `dxxxxxxxxxxxxx`
   - **API Key**: `123456789012345`
   - **API Secret**: `abcdefghijklmnopqrstuvwxyz` (click "Show")

### 3. Guardar credenciales
Copia estos 3 valores, los necesitarás más adelante.

---

## 🗄️ Configuración de Base de Datos (Turso)

### Opción A: SQLite Local (Solo para testing)
- No recomendado para producción
- Usar solo para pruebas rápidas

### Opción B: Turso (Recomendado para producción)

#### 1. Crear cuenta en Turso
1. Ir a https://turso.tech
2. Crear cuenta gratuita
3. Instalar Turso CLI:
   ```bash
   curl -sSfL https://get.tur.so/install.sh | bash
   ```

#### 2. Login y crear base de datos
```bash
# Login en Turso
turso auth login

# Crear nueva base de datos
turso db create mister-lya-prod

# Obtener URL de conexión
turso db show mister-lya-prod --url

# Crear token de autenticación
turso db tokens create mister-lya-prod
```

#### 3. Guardar credenciales
Copia:
- **DATABASE_URL**: `libsql://[your-db].turso.io`
- **DATABASE_AUTH_TOKEN**: `eyJhbGc...` (el token generado)

---

## 🌐 Deployment en Vercel

### Paso 1: Conectar Repositorio

1. Ir a https://vercel.com
2. Click en "Add New" → "Project"
3. Importar tu repositorio de GitHub: `TakaraDasein/limpieza-aseo`
4. Click en "Import"

### Paso 2: Configurar Proyecto

En la página de configuración:

**Framework Preset:** Astro (debería detectarse automáticamente)

**Build & Development Settings:**
- Build Command: `pnpm build`
- Output Directory: `dist`
- Install Command: `pnpm install`

### Paso 3: Variables de Entorno

Click en "Environment Variables" y agregar:

#### Variables Requeridas:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `DATABASE_URL` | `libsql://[your-db].turso.io` | URL de Turso (ver arriba) |
| `DATABASE_AUTH_TOKEN` | `eyJhbGc...` | Token de Turso |
| `AUTH_SECRET` | (generar nuevo) | Secret para Auth.js |
| `CLOUDINARY_CLOUD_NAME` | `dxxxxxxxxxxxxx` | Tu Cloud Name |
| `CLOUDINARY_API_KEY` | `123456789012345` | Tu API Key |
| `CLOUDINARY_API_SECRET` | `abcdefg...` | Tu API Secret |

#### Generar AUTH_SECRET:

En tu terminal local:
```bash
openssl rand -base64 32
```

Copia el resultado y pégalo como valor de `AUTH_SECRET`.

### Paso 4: Deploy

1. Click en "Deploy"
2. Esperar 2-3 minutos mientras Vercel construye el proyecto
3. Una vez completado, verás "Congratulations!"

---

## 🔍 Verificar Deployment

### 1. Visitar el sitio
Vercel te dará una URL como: `https://limpieza-aseo-xxx.vercel.app`

### 2. Verificar páginas
- ✅ Home: `https://tu-proyecto.vercel.app/`
- ✅ Catálogo: `https://tu-proyecto.vercel.app/catalogo`
- ✅ Login: `https://tu-proyecto.vercel.app/login`
- ✅ Admin: `https://tu-proyecto.vercel.app/admin` (debe redirigir a login)

### 3. Probar funcionalidades

#### Login Admin:
```
Email: admin@misterlya.com
Password: Admin123!
```

**Importante:** Si es la primera vez que despliegas, necesitas hacer seed de la base de datos.

---

## 🗃️ Seed de Base de Datos en Producción

### Opción A: Seed Local → Migrar a Turso

1. **Hacer seed local:**
   ```bash
   # En tu máquina local
   pnpm db:seed
   ```

2. **Subir base de datos a Turso:**
   ```bash
   # Exportar DB local
   sqlite3 local.db .dump > dump.sql
   
   # Importar a Turso
   turso db shell mister-lya-prod < dump.sql
   ```

### Opción B: Ejecutar seed en Vercel

1. **Crear endpoint temporal:**
   Crear archivo `src/pages/api/seed.ts`:
   ```typescript
   import type { APIRoute } from 'astro';
   import { execSync } from 'child_process';

   export const GET: APIRoute = async () => {
     try {
       // Solo permitir en preview/staging
       if (process.env.VERCEL_ENV === 'production') {
         return new Response('Forbidden', { status: 403 });
       }
       
       execSync('tsx src/db/seed.ts');
       return new Response('Seed completed', { status: 200 });
     } catch (error) {
       return new Response(`Error: ${error}`, { status: 500 });
     }
   };
   ```

2. **Hacer deploy**

3. **Llamar al endpoint:**
   ```bash
   curl https://tu-proyecto.vercel.app/api/seed
   ```

4. **Eliminar el endpoint** después de usar (por seguridad)

---

## 🔧 Configuración de Dominio Personalizado

### 1. En Vercel Dashboard
1. Ir a tu proyecto
2. Click en "Settings" → "Domains"
3. Agregar tu dominio (ej: `www.misterlya.com`)

### 2. En tu proveedor de DNS
1. Agregar registro CNAME:
   - Name: `www`
   - Value: `cname.vercel-dns.com`

2. O agregar registro A para dominio raíz:
   - Name: `@`
   - Value: `76.76.21.21`

### 3. Esperar propagación
- Puede tomar 24-48 horas
- Verificar en https://dnschecker.org

---

## 🛠️ Troubleshooting

### Error: 404 NOT_FOUND
**Causa:** Adaptador incorrecto o build fallido
**Solución:** 
- Verificar que `astro.config.mjs` usa `@astrojs/vercel`
- Revisar logs de build en Vercel
- Verificar que todas las dependencias están instaladas

### Error: Database connection failed
**Causa:** Variables de entorno incorrectas
**Solución:**
- Verificar `DATABASE_URL` y `DATABASE_AUTH_TOKEN`
- Asegurarse que la base de datos Turso existe
- Verificar que la base de datos tiene los datos (seed)

### Error: Image upload failed
**Causa:** Cloudinary no configurado
**Solución:**
- Verificar las 3 variables de Cloudinary en Vercel
- Probar credenciales en local primero
- Revisar logs de Vercel

### Error: Authentication failed
**Causa:** AUTH_SECRET no configurado o incorrecto
**Solución:**
- Generar nuevo secret: `openssl rand -base64 32`
- Agregarlo en Vercel Environment Variables
- Hacer redeploy

---

## 📊 Monitoreo

### Logs en Vercel
1. Ir a tu proyecto en Vercel
2. Click en "Deployments"
3. Click en el deployment activo
4. Ver "Functions" para logs en tiempo real

### Analytics
Vercel Analytics está habilitado automáticamente en el `astro.config.mjs`:
```javascript
adapter: vercel({
  webAnalytics: { enabled: true }
})
```

Ver analytics en: Vercel Dashboard → Tu Proyecto → Analytics

---

## ✅ Checklist de Deployment

- [ ] Repositorio en GitHub actualizado
- [ ] Cuenta de Vercel creada
- [ ] Cuenta de Cloudinary creada
- [ ] Cuenta de Turso creada (opcional pero recomendado)
- [ ] Variables de entorno configuradas en Vercel
- [ ] Build exitoso en Vercel
- [ ] Base de datos con seed
- [ ] Login admin funcionando
- [ ] Upload de imágenes funcionando
- [ ] Catálogo público visible
- [ ] Dominio personalizado configurado (opcional)
- [ ] SSL activo (automático en Vercel)

---

## 🆘 Soporte

Si encuentras problemas:

1. **Revisar logs de Vercel:**
   - Ir a Deployments → [tu deployment] → Functions → Ver logs

2. **Verificar variables de entorno:**
   - Settings → Environment Variables → Verificar todas

3. **Build local:**
   ```bash
   pnpm build
   # Si falla local, fallará en Vercel
   ```

4. **Contactar soporte:**
   - Vercel: https://vercel.com/support
   - Turso: https://discord.gg/turso
   - Cloudinary: support@cloudinary.com

---

## 📝 Notas Finales

1. **Seguridad:**
   - Nunca subir archivos `.env` a GitHub
   - Cambiar `AUTH_SECRET` en producción
   - Usar HTTPS siempre (Vercel lo hace automático)

2. **Performance:**
   - Vercel tiene CDN global automático
   - Cloudinary optimiza imágenes automáticamente
   - Considerar usar Turso para mejor latencia global

3. **Costos:**
   - Vercel: Gratis para proyectos personales
   - Turso: Gratis hasta 9GB
   - Cloudinary: Gratis hasta 25 GB almacenamiento

---

**¡Listo! Tu proyecto Mister LyA está en producción! 🎉**
