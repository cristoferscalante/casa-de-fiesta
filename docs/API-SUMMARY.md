# API Endpoints Summary

## Created Files

### API Endpoints
1. **`/src/pages/api/products/index.ts`** - Products list and create
   - GET: List all products with filtering and pagination
   - POST: Create new product (requires auth)

2. **`/src/pages/api/products/[id].ts`** - Single product operations
   - GET: Get product by ID
   - PUT: Update product (requires auth)
   - DELETE: Delete product (requires auth)

3. **`/src/pages/api/categories/index.ts`** - Categories list
   - GET: List all categories (public)

### Helper Utilities
4. **`/src/lib/api-helpers.ts`** - Shared API utilities
   - Response helpers (jsonResponse, errorResponse)
   - Authentication helpers (checkAuth, requireAuth)
   - Parameter parsing utilities

### Documentation
5. **`/docs/API.md`** - Complete API documentation with examples

---

## Endpoints Overview

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | No | List products with filters |
| POST | `/api/products` | 🔒 Yes | Create new product |
| GET | `/api/products/[id]` | No | Get single product |
| PUT | `/api/products/[id]` | 🔒 Yes | Update product |
| DELETE | `/api/products/[id]` | 🔒 Yes | Delete product |
| GET | `/api/categories` | No | List all categories |

---

## Authentication Requirements

**Authenticated Endpoints:**
- POST `/api/products` - Create product
- PUT `/api/products/[id]` - Update product  
- DELETE `/api/products/[id]` - Delete product

**Public Endpoints:**
- GET `/api/products` - List products
- GET `/api/products/[id]` - Get single product
- GET `/api/categories` - List categories

Authentication uses session-based auth via `context.locals.auth()` (auth-astro integration).

---

## Key Features

### Filtering & Pagination
```bash
GET /api/products?category=cleaning&active=true&search=floor&limit=10&offset=0
```

### Product Creation
```bash
POST /api/products
{
  "sku": "PROD-001",
  "name": "Floor Cleaner",
  "categoryId": "cleaning",
  "price": 2500000,
  "description": "Professional cleaning solution",
  "active": true
}
```

### Soft Delete (Default)
```bash
DELETE /api/products/[id]
# Sets active=false, preserves data
```

### Hard Delete
```bash
DELETE /api/products/[id]?hard=true
# Permanently removes from database
```

---

## Response Format

**Success Response:**
```json
{
  "data": [...],
  "pagination": {
    "total": 100,
    "limit": 50,
    "offset": 0,
    "hasMore": true
  }
}
```

**Error Response:**
```json
{
  "error": "Error message"
}
```

---

## Status Codes

- `200 OK` - Success
- `201 Created` - Resource created
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Auth required
- `404 Not Found` - Resource not found
- `409 Conflict` - Duplicate SKU
- `500 Internal Server Error` - Server error

---

## Testing the API

### Test GET Products
```bash
curl http://localhost:4321/api/products
```

### Test GET Categories
```bash
curl http://localhost:4321/api/categories
```

### Test GET Single Product
```bash
curl http://localhost:4321/api/products/[product-id]
```

### Test Create Product (requires auth session)
```bash
curl -X POST http://localhost:4321/api/products \
  -H "Content-Type: application/json" \
  -H "Cookie: your-session-cookie" \
  -d '{
    "sku": "PROD-NEW",
    "name": "New Product",
    "categoryId": "cleaning",
    "price": 5000000
  }'
```

### Test Update Product (requires auth session)
```bash
curl -X PUT http://localhost:4321/api/products/[product-id] \
  -H "Content-Type: application/json" \
  -H "Cookie: your-session-cookie" \
  -d '{
    "price": 5500000,
    "active": true
  }'
```

### Test Delete Product (requires auth session)
```bash
# Soft delete
curl -X DELETE http://localhost:4321/api/products/[product-id] \
  -H "Cookie: your-session-cookie"

# Hard delete
curl -X DELETE http://localhost:4321/api/products/[product-id]?hard=true \
  -H "Cookie: your-session-cookie"
```

---

## Next Steps

1. **Set up authentication** - Configure auth-astro if not already done
2. **Test endpoints** - Use curl, Postman, or similar tools
3. **Add validation** - Consider adding Zod or similar for request validation
4. **Add rate limiting** - Protect endpoints from abuse
5. **Add API documentation UI** - Consider Swagger/OpenAPI

See `/docs/API.md` for complete documentation with detailed examples.
