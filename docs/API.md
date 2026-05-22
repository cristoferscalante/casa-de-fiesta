# Products API Documentation

This document describes the RESTful API endpoints for managing products and categories.

## Base URL
All endpoints are prefixed with `/api`

## Authentication
Endpoints marked with 🔒 require authentication. Authentication is handled via session cookies using the auth-astro integration.

If authentication fails, the API returns:
```json
{
  "error": "Unauthorized"
}
```
Status: `401 Unauthorized`

---

## Endpoints

### 1. List All Products
**GET** `/api/products`

Retrieve a paginated list of products with optional filtering.

#### Query Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `category` | string | No | - | Filter by category ID |
| `active` | boolean | No | - | Filter by active status (true/false) |
| `search` | string | No | - | Search in name, description, and SKU |
| `limit` | number | No | 50 | Number of items per page |
| `offset` | number | No | 0 | Number of items to skip |

#### Example Request
```bash
GET /api/products?category=cleaning&active=true&limit=10&offset=0
```

#### Example Response
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "sku": "PROD-001",
      "name": "Floor Cleaner",
      "description": "Professional floor cleaning solution",
      "categoryId": "cleaning",
      "price": 2500000,
      "image": "https://cloudinary.com/...",
      "variants": "[{\"size\": \"500ml\", \"price\": 2500000}]",
      "active": true,
      "order": 1,
      "createdAt": "2026-01-15T10:30:00Z",
      "updatedAt": "2026-01-15T10:30:00Z",
      "category": {
        "id": "cleaning",
        "name": "Cleaning Products",
        "description": "Professional cleaning solutions",
        "icon": "🧹"
      }
    }
  ],
  "pagination": {
    "total": 45,
    "limit": 10,
    "offset": 0,
    "hasMore": true
  }
}
```

#### Status Codes
- `200 OK` - Success
- `500 Internal Server Error` - Server error

---

### 2. Get Single Product
**GET** `/api/products/[id]`

Retrieve a single product by its ID with full details.

#### URL Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Product UUID |

#### Example Request
```bash
GET /api/products/550e8400-e29b-41d4-a716-446655440000
```

#### Example Response
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "sku": "PROD-001",
  "name": "Floor Cleaner",
  "description": "Professional floor cleaning solution",
  "categoryId": "cleaning",
  "price": 2500000,
  "image": "https://cloudinary.com/...",
  "variants": "[{\"size\": \"500ml\", \"price\": 2500000}]",
  "active": true,
  "order": 1,
  "createdAt": "2026-01-15T10:30:00Z",
  "updatedAt": "2026-01-15T10:30:00Z",
  "category": {
    "id": "cleaning",
    "name": "Cleaning Products",
    "description": "Professional cleaning solutions",
    "icon": "🧹",
    "order": 1
  }
}
```

#### Status Codes
- `200 OK` - Success
- `400 Bad Request` - Missing product ID
- `404 Not Found` - Product not found
- `500 Internal Server Error` - Server error

---

### 3. Create Product 🔒
**POST** `/api/products`

Create a new product. Requires authentication.

#### Request Body
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `sku` | string | Yes | Unique product SKU |
| `name` | string | Yes | Product name |
| `categoryId` | string | Yes | Category ID (must exist) |
| `price` | number | Yes | Price in COP cents (e.g., 2500000 = $25,000 COP) |
| `description` | string | No | Product description |
| `image` | string | No | Cloudinary URL or image path |
| `variants` | array | No | Product variants (stored as JSON) |
| `active` | boolean | No | Active status (default: true) |
| `order` | number | No | Display order (default: 0) |

#### Example Request
```bash
POST /api/products
Content-Type: application/json

{
  "sku": "PROD-002",
  "name": "Glass Cleaner",
  "description": "Streak-free glass cleaning solution",
  "categoryId": "cleaning",
  "price": 1800000,
  "image": "https://cloudinary.com/...",
  "variants": [
    { "size": "500ml", "price": 1800000 },
    { "size": "1L", "price": 3200000 }
  ],
  "active": true,
  "order": 2
}
```

#### Example Response
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "sku": "PROD-002",
  "name": "Glass Cleaner",
  "description": "Streak-free glass cleaning solution",
  "categoryId": "cleaning",
  "price": 1800000,
  "image": "https://cloudinary.com/...",
  "variants": "[{\"size\":\"500ml\",\"price\":1800000},{\"size\":\"1L\",\"price\":3200000}]",
  "active": true,
  "order": 2,
  "createdAt": "2026-04-06T15:45:00Z",
  "updatedAt": "2026-04-06T15:45:00Z"
}
```

#### Status Codes
- `201 Created` - Product created successfully
- `400 Bad Request` - Missing required fields or invalid data
- `401 Unauthorized` - Not authenticated
- `404 Not Found` - Category not found
- `409 Conflict` - SKU already exists
- `500 Internal Server Error` - Server error

---

### 4. Update Product 🔒
**PUT** `/api/products/[id]`

Update an existing product. Only specified fields will be updated. Requires authentication.

#### URL Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Product UUID |

#### Request Body (all fields optional)
| Field | Type | Description |
|-------|------|-------------|
| `sku` | string | Unique product SKU |
| `name` | string | Product name |
| `categoryId` | string | Category ID |
| `price` | number | Price in COP cents |
| `description` | string | Product description |
| `image` | string | Cloudinary URL or image path |
| `variants` | array | Product variants |
| `active` | boolean | Active status |
| `order` | number | Display order |

#### Example Request
```bash
PUT /api/products/550e8400-e29b-41d4-a716-446655440000
Content-Type: application/json

{
  "price": 2700000,
  "active": true,
  "description": "Updated professional floor cleaning solution"
}
```

#### Example Response
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "sku": "PROD-001",
  "name": "Floor Cleaner",
  "description": "Updated professional floor cleaning solution",
  "categoryId": "cleaning",
  "price": 2700000,
  "image": "https://cloudinary.com/...",
  "variants": "[{\"size\": \"500ml\", \"price\": 2700000}]",
  "active": true,
  "order": 1,
  "createdAt": "2026-01-15T10:30:00Z",
  "updatedAt": "2026-04-06T16:00:00Z"
}
```

#### Status Codes
- `200 OK` - Product updated successfully
- `400 Bad Request` - Invalid data
- `401 Unauthorized` - Not authenticated
- `404 Not Found` - Product or category not found
- `409 Conflict` - SKU conflicts with another product
- `500 Internal Server Error` - Server error

---

### 5. Delete Product 🔒
**DELETE** `/api/products/[id]`

Delete a product. By default, performs a soft delete (sets `active=false`). Use `?hard=true` for permanent deletion. Requires authentication.

#### URL Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Product UUID |

#### Query Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `hard` | boolean | No | false | If true, permanently deletes the product |

#### Example Request (Soft Delete)
```bash
DELETE /api/products/550e8400-e29b-41d4-a716-446655440000
```

#### Example Response (Soft Delete)
```json
{
  "message": "Product deactivated",
  "id": "550e8400-e29b-41d4-a716-446655440000"
}
```

#### Example Request (Hard Delete)
```bash
DELETE /api/products/550e8400-e29b-41d4-a716-446655440000?hard=true
```

#### Example Response (Hard Delete)
```json
{
  "message": "Product permanently deleted",
  "id": "550e8400-e29b-41d4-a716-446655440000"
}
```

#### Status Codes
- `200 OK` - Product deleted successfully
- `400 Bad Request` - Missing product ID
- `401 Unauthorized` - Not authenticated
- `404 Not Found` - Product not found
- `500 Internal Server Error` - Server error

---

### 6. List All Categories
**GET** `/api/categories`

Retrieve all categories ordered by the `order` field. This is a public endpoint.

#### Example Request
```bash
GET /api/categories
```

#### Example Response
```json
{
  "data": [
    {
      "id": "cleaning",
      "name": "Cleaning Products",
      "description": "Professional cleaning solutions",
      "icon": "🧹",
      "order": 1,
      "createdAt": "2026-01-10T08:00:00Z",
      "updatedAt": "2026-01-10T08:00:00Z"
    },
    {
      "id": "sanitizing",
      "name": "Sanitizing Products",
      "description": "Sanitizers and disinfectants",
      "icon": "🧴",
      "order": 2,
      "createdAt": "2026-01-10T08:00:00Z",
      "updatedAt": "2026-01-10T08:00:00Z"
    }
  ],
  "total": 2
}
```

#### Status Codes
- `200 OK` - Success
- `500 Internal Server Error` - Server error

---

## Error Handling

All endpoints return consistent error responses in the following format:

```json
{
  "error": "Error message describing what went wrong"
}
```

Common HTTP status codes used:
- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource conflict (e.g., duplicate SKU)
- `500 Internal Server Error` - Server error

---

## Notes

### Price Format
Prices are stored and transmitted as integers representing COP cents:
- `2500000` = $25,000 COP
- `1800000` = $18,000 COP

### Variants Format
Product variants are stored as JSON strings in the database but should be sent as arrays in requests:
```json
{
  "variants": [
    { "size": "500ml", "price": 1800000 },
    { "size": "1L", "price": 3200000 }
  ]
}
```

### Timestamps
All timestamps are stored as Unix epoch seconds and returned as ISO 8601 strings.

### Soft Delete vs Hard Delete
- **Soft delete** (default): Sets `active=false`, data remains in database
- **Hard delete** (`?hard=true`): Permanently removes the record from database

### Authentication
The API uses session-based authentication via auth-astro. Ensure you have a valid session cookie when making authenticated requests.

To set up authentication in your application, configure auth-astro in your Astro project and ensure `context.locals.auth()` returns a valid session.
