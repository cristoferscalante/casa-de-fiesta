# ⚡ ACCIÓN INMEDIATA: Configurar Vercel

## 🔴 PROBLEMA RESUELTO

El error **404 NOT_FOUND** se debía a que estabas usando el adaptador `@astrojs/node` en lugar de `@astrojs/vercel`.

✅ **Ya está corregido en el código** - Commit: `17b5918`

---

## 📝 PASOS PARA HACER AHORA EN VERCEL

### 1. Re-deploy el Proyecto

Vercel debería hacer **auto-deploy** al detectar el nuevo commit en GitHub. Si no:

1. Ir a: https://vercel.com/dashboard
2. Seleccionar tu proyecto `limpieza-aseo`
3. Click en "Deployments"
4. Click en "Redeploy" (botón con 3 puntos → Redeploy)

---

### 2. Configurar Variables de Entorno

**MUY IMPORTANTE:** Sin estas variables, el sitio NO funcionará.

#### Ve a: Vercel Dashboard → Tu Proyecto → Settings → Environment Variables

#### Agrega estas 5 variables:

| Variable | Valor | Cómo obtenerlo |
|----------|-------|----------------|
| `DATABASE_URL` | `file:./local.db` | Temporal (ver nota abajo) |
| `AUTH_SECRET` | (generar) | Ver comando abajo |
| `CLOUDINARY_CLOUD_NAME` | (tu cloud name) | Dashboard de Cloudinary |
| `CLOUDINARY_API_KEY` | (tu api key) | Dashboard de Cloudinary |
| `CLOUDINARY_API_SECRET` | (tu api secret) | Dashboard de Cloudinary |

#### Generar AUTH_SECRET:

En tu terminal local:
```bash
openssl rand -base64 32
```

Copia el resultado (ej: `EYbq1jm/Zmdm/bFNfjViwOm6h+7o/YkInOB3Wmw+EbU=`)

#### Obtener credenciales de Cloudinary:

1. Ir a: https://cloudinary.com/console
2. Login (o crear cuenta gratuita)
3. En el Dashboard verás:
   - **Cloud Name**: `dxxxxxxxxxxxxx`
   - **API Key**: `123456789012345`
   - **API Secret**: Click en "Show" → copiar

---

### 3. Re-deploy Después de Agregar Variables

Después de agregar las variables:

1. Ir a: Deployments
2. Click en "Redeploy" en el último deployment
3. Esperar 2-3 minutos

---

### 4. Verificar que Funcione

Una vez que termine el deployment:

✅ **Visitar:** `https://tu-proyecto.vercel.app`

Deberías ver:
- ✅ Página de inicio funcional
- ✅ Catálogo funcional
- ✅ Login accesible

#### Probar Login:

1. Ir a: `https://tu-proyecto.vercel.app/login`
2. Usar:
   ```
   Email: admin@misterlya.com
   Password: Admin123!
   ```

**⚠️ IMPORTANTE:** La primera vez el login FALLARÁ porque la base de datos está vacía.

---

### 5. Seed de Base de Datos (CRÍTICO)

El proyecto necesita datos en la base de datos. Tienes 2 opciones:

#### Opción A: Usar Turso (Recomendado para producción)

**Paso 1:** Crear cuenta y base de datos
```bash
# Instalar Turso CLI
curl -sSfL https://get.tur.so/install.sh | bash

# Login
turso auth login

# Crear base de datos
turso db create mister-lya-prod

# Obtener URL
turso db show mister-lya-prod --url
# Resultado: libsql://mister-lya-prod-xxxxx.turso.io

# Crear token
turso db tokens create mister-lya-prod
# Resultado: eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...
```

**Paso 2:** Actualizar variables en Vercel
```
DATABASE_URL = libsql://mister-lya-prod-xxxxx.turso.io
DATABASE_AUTH_TOKEN = eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...
```

**Paso 3:** Hacer seed local y subir a Turso
```bash
# En tu máquina local
cd /home/zit/limpieza-aseo

# Hacer seed local
pnpm db:seed

# Exportar a SQL
sqlite3 local.db .dump > dump.sql

# Subir a Turso
turso db shell mister-lya-prod < dump.sql
```

**Paso 4:** Redeploy en Vercel

#### Opción B: SQLite temporal (Solo para pruebas)

Esta opción NO es recomendada para producción, pero funciona para testing:

**Problema:** Vercel es serverless, los archivos se borran entre deployments.

**Solución temporal:** Crear endpoint de seed:

Agregar este código en `src/pages/api/init-db.ts`:
```typescript
import type { APIRoute } from 'astro';
import { execSync } from 'child_process';

export const GET: APIRoute = async ({ request }) => {
  try {
    // Proteger con secret
    const url = new URL(request.url);
    const secret = url.searchParams.get('secret');
    
    if (secret !== process.env.AUTH_SECRET) {
      return new Response('Unauthorized', { status: 401 });
    }
    
    execSync('tsx src/db/seed.ts');
    return new Response('Database seeded!', { status: 200 });
  } catch (error) {
    return new Response(`Error: ${error}`, { status: 500 });
  }
};
```

Luego llamar:
```bash
curl "https://tu-proyecto.vercel.app/api/init-db?secret=TU_AUTH_SECRET"
```

**⚠️ ELIMINAR** este archivo después de usar.

---

### 6. Verificación Final

Una vez configurado todo:

✅ Visitar: `https://tu-proyecto.vercel.app`  
✅ Login funcional: `https://tu-proyecto.vercel.app/login`  
✅ Admin accesible: `https://tu-proyecto.vercel.app/admin`  
✅ Crear producto funcional  
✅ Upload de imagen funcional (con Cloudinary)  

---

## 🎯 RESUMEN DE ACCIONES

```
┌─────────────────────────────────────────┐
│ 1. ✅ Código corregido (ya hecho)       │
│ 2. 🔄 Esperar auto-deploy en Vercel     │
│ 3. ⚙️  Agregar 5 variables de entorno   │
│ 4. 🔄 Redeploy después de variables     │
│ 5. 🗄️  Configurar base de datos         │
│ 6. ✅ Verificar que todo funcione        │
└─────────────────────────────────────────┘
```

---

## 📋 CHECKLIST

- [ ] Vercel detectó nuevo commit y está haciendo deploy
- [ ] Agregada variable: `DATABASE_URL`
- [ ] Agregada variable: `AUTH_SECRET` (generado con openssl)
- [ ] Agregada variable: `CLOUDINARY_CLOUD_NAME`
- [ ] Agregada variable: `CLOUDINARY_API_KEY`
- [ ] Agregada variable: `CLOUDINARY_API_SECRET`
- [ ] Re-deploy hecho después de agregar variables
- [ ] Base de datos con seed (Turso o temporal)
- [ ] Login admin funciona
- [ ] CRUD de productos funciona
- [ ] Upload de imágenes funciona

---

## 🆘 SI ALGO FALLA

### Error: "Database connection failed"
**Causa:** Variables de DB incorrectas  
**Solución:** Verificar `DATABASE_URL` y `DATABASE_AUTH_TOKEN` (si usas Turso)

### Error: "Authentication failed"
**Causa:** `AUTH_SECRET` no configurado  
**Solución:** Generar con `openssl rand -base64 32` y agregarlo

### Error: "Image upload failed"
**Causa:** Cloudinary no configurado  
**Solución:** Verificar las 3 variables de Cloudinary

### Error: "User not found" al hacer login
**Causa:** Base de datos vacía  
**Solución:** Hacer seed de la base de datos (ver paso 5)

---

## 📞 URL DEL PROYECTO

Tu proyecto debería estar en:
```
https://limpieza-aseo-[random].vercel.app
```

O si configuraste dominio personalizado:
```
https://www.misterlya.com
```

---

**🎉 Después de seguir estos pasos, tu sitio estará 100% funcional en producción!**

Ver documentación completa: `/docs/DEPLOYMENT.md`
