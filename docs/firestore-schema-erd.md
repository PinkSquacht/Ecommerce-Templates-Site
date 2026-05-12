# Firestore Schema ERD

This is a proposed Firestore data model for the current app plus the inventory, packaging, and shipping flow you asked about. The codebase already uses `users/{uid}/cartItems`, so the ERD keeps cart data under each user and separates operational data into its own collections.

```mermaid
erDiagram
  USERS ||--o{ CART_ITEMS : owns
  USERS ||--o{ ORDERS : places
  USERS ||--o{ ADDRESSES : saves
  USERS ||--o{ USER_NOTES : receives

  PRODUCTS ||--o{ INVENTORY_BATCHES : stocked_as
  PRODUCTS ||--o{ STOCK_MOVEMENTS : changes
  PRODUCTS ||--o{ CART_ITEMS : added_to
  PRODUCTS ||--o{ ORDER_ITEMS : purchased_as
  PRODUCTS ||--o{ PACKAGE_ITEMS : packed_as

  ORDERS ||--|{ ORDER_ITEMS : contains
  ORDERS ||--o{ SHIPMENTS : fulfills
  ORDERS ||--o{ ORDER_EVENTS : tracks

  SHIPMENTS ||--|{ PACKAGES : includes
  SHIPMENTS ||--o{ SHIPMENT_EVENTS : updates
  PACKAGES ||--|{ PACKAGE_ITEMS : contains

  INVENTORY_BATCHES ||--o{ STOCK_MOVEMENTS : source_of

  USERS {
    string uid PK
    string firstName
    string lastName
    string email
    string address
    string state
    string country
    string zip
    string role
    timestamp createdAt
    timestamp updatedAt
  }

  CART_ITEMS {
    string id PK
    string userId FK
    string productId FK
    string title
    number price
    string image
    string description
    number quantity
    timestamp addedAt
  }

  PRODUCTS {
    string id PK
    string sku
    string title
    string description
    string category
    number price
    string image
    boolean active
    number reorderPoint
    timestamp createdAt
    timestamp updatedAt
  }

  INVENTORY_BATCHES {
    string id PK
    string productId FK
    string batchCode
    number quantityOnHand
    number quantityReserved
    date receivedAt
    date expiresAt
    string supplier
    string location
  }

  STOCK_MOVEMENTS {
    string id PK
    string productId FK
    string batchId FK
    string orderId FK
    string movementType
    number quantity
    string reason
    timestamp createdAt
  }

  ORDERS {
    string id PK
    string userId FK
    string status
    number subtotal
    number shippingCost
    number tax
    number total
    string paymentStatus
    string fulfillmentStatus
    timestamp placedAt
    timestamp updatedAt
  }

  ORDER_ITEMS {
    string id PK
    string orderId FK
    string productId FK
    string title
    number unitPrice
    number quantity
    number lineTotal
  }

  SHIPMENTS {
    string id PK
    string orderId FK
    string carrier
    string serviceLevel
    string trackingNumber
    string labelUrl
    string status
    number shippingCost
    timestamp shippedAt
    timestamp deliveredAt
  }

  PACKAGES {
    string id PK
    string shipmentId FK
    string packageType
    number weight
    number length
    number width
    number height
    string labelUrl
  }

  PACKAGE_ITEMS {
    string id PK
    string packageId FK
    string productId FK
    string orderItemId FK
    number quantity
  }

  SHIPMENT_EVENTS {
    string id PK
    string shipmentId FK
    string status
    string location
    timestamp occurredAt
    string rawPayload
  }

  ORDER_EVENTS {
    string id PK
    string orderId FK
    string status
    string note
    timestamp createdAt
  }

  ADDRESSES {
    string id PK
    string userId FK
    string line1
    string line2
    string city
    string state
    string country
    string zip
    boolean isDefault
  }

  USER_NOTES {
    string id PK
    string userId FK
    string note
    string createdBy
    timestamp createdAt
  }
```

## How The Flow Works

1. A customer adds a product to `users/{uid}/cartItems`.
2. Checkout creates an `orders` document and nested `order_items` records.
3. Inventory is reserved with `stock_movements` and `inventory_batches.quantityReserved`.
4. Packing creates `packages` and `package_items`.
5. Shipping creates a `shipments` document and then appends `shipment_events` from the carrier.
6. When the order ships, stock is committed against the source batch and the order status advances.

## Notes

- Keep `products` separate from `inventory_batches` so catalog data and stock data do not fight each other.
- Use `stock_movements` as the audit trail instead of editing quantities directly.
- If you want partial shipments, the `orders` to `shipments` relationship stays one-to-many.
- The existing app-level template and tier config in `src/config/` stay outside Firestore unless you intentionally want them editable in the admin UI.