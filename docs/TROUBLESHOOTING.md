# Troubleshooting Guide

## Vercel Deployment Issues

### Error 404: NOT_FOUND

**Posibles causas:**

1. **Adapter incorrecto en build logs**
   - ✅ Debe mostrar: `adapter: @astrojs/vercel`
   - ❌ Si muestra: `adapter: @astrojs/node` → hay un problema

2. **Archivos de configuración conflictivos**
   - `vercel.json` NO debe existir (Astro adapter maneja todo)
   - `.vercelignore` puede causar problemas si ignora `dist/`

3. **Build cache corrupto**
   - Solución: Redeploy sin caché
   - Vercel Dashboard → Deployments → ⋯ → Redeploy → Desmarcar "Use existing Build Cache"

4. **Variables de entorno faltantes**
   - Verifica en Vercel Dashboard → Settings → Environment Variables
   - Asegúrate que están en Production, Preview y Development

### Variables de Entorno Requeridas

```bash
# Database (Turso)
DATABASE_URL=libsql://[your-db].turso.io
DATABASE_AUTH_TOKEN=[your-token]

# Auth
AUTH_SECRET=[your-secret]
AUTH_TRUST_HOST=true

# Cloudinary
CLOUDINARY_CLOUD_NAME=[your-name]
CLOUDINARY_API_KEY=[your-key]
CLOUDINARY_API_SECRET=[your-secret]
```

### Verificar Build Logs

1. Ve a Vercel Dashboard → Deployments
2. Click en el último deployment
3. Ve a "Building" tab
4. Busca estas líneas:

```
✓ Completed in XXms.
Building server entrypoints...
adapter: @astrojs/vercel  ← DEBE decir vercel, NO node
```

## Database Issues

### No se conecta a Turso

**Verificar:**

1. URL correcta:
   ```bash
   turso db show [db-name] --url
   ```

2. Token válido:
   ```bash
   turso db tokens create [db-name]
   ```

3. Variables en `.env` local:
   ```bash
   DATABASE_URL=libsql://...
   DATABASE_AUTH_TOKEN=eyJ...
   ```

### Seed no funciona

```bash
# Verificar conexión
pnpm tsx src/db/seed.ts

# Ver tablas en Turso
turso db shell [db-name]
.tables
SELECT COUNT(*) FROM products;
.exit
```

## Cloudinary Upload Issues

### Error al subir imágenes

1. Verificar credenciales en Vercel
2. Verificar CORS settings en Cloudinary Dashboard
3. Verificar límites de upload (free tier: 25 credits/month)

## Local Development

### Build fails locally

```bash
# Limpiar caché
rm -rf dist/ .astro/ node_modules/.vite

# Reinstalar dependencias
pnpm install

# Rebuild
pnpm build
```

### Database migrations fail

```bash
# Verificar schema
pnpm db:generate

# Aplicar con Turso CLI
turso db shell [db-name] < drizzle/[migration].sql
```

## Comandos Útiles

```bash
# Verificar deployment actual
vercel ls

# Ver logs en tiempo real
vercel logs [deployment-url]

# Limpiar todo y rebuildar
pnpm clean && pnpm install && pnpm build

# Test local con production build
pnpm build && pnpm preview
```

## Contacto y Soporte

- Vercel Status: https://www.vercel-status.com/
- Turso Status: https://status.turso.tech/
- Astro Discord: https://astro.build/chat
- GitHub Issues: [tu-repo]/issues
