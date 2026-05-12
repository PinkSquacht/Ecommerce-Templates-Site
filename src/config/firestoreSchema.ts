/*
Firestore schema helpers added for the order/inventory/shipping refactor.

They are commented out per request so they are easy to find and re-enable later.
*/
import { collection, doc, type Firestore } from "firebase/firestore";

export const FIRESTORE_COLLECTIONS = {
  users: "users",
  products: "products",
  inventoryBatches: "inventoryBatches",
  stockMovements: "stockMovements",
  orders: "orders",
  orderItems: "orderItems",
  orderEvents: "orderEvents",
  shipments: "shipments",
  packages: "packages",
  packageItems: "packageItems",
  shipmentEvents: "shipmentEvents",
} as const;

export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  state: string;
  country: string;
  zip: string;
  role?: "customer" | "admin" | "staff";
  createdAt?: unknown;
  updatedAt?: unknown;
};

export type CartItemRecord = {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
  productId?: string;
  addedAt?: unknown;
};

export type ProductRecord = {
  sku?: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  active?: boolean;
  reorderPoint?: number;
};

export type InventoryBatchRecord = {
  productId: string;
  batchCode: string;
  quantityOnHand: number;
  quantityReserved: number;
  receivedAt?: unknown;
  expiresAt?: unknown;
  supplier?: string;
  location?: string;
};

export type OrderRecord = {
  userId: string;
  status: string;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  paymentStatus: string;
  fulfillmentStatus: string;
  placedAt?: unknown;
  updatedAt?: unknown;
};

export function userDocRef(firestore: Firestore, userId: string) {
  return doc(firestore, FIRESTORE_COLLECTIONS.users, userId);
}

export function cartItemsCollection(firestore: Firestore, userId: string) {
  return collection(firestore, FIRESTORE_COLLECTIONS.users, userId, "cartItems");
}

export function cartItemDocRef(firestore: Firestore, userId: string, itemId: string) {
  return doc(firestore, FIRESTORE_COLLECTIONS.users, userId, "cartItems", itemId);
}

export function productsCollection(firestore: Firestore) {
  return collection(firestore, FIRESTORE_COLLECTIONS.products);
}

export function inventoryBatchesCollection(firestore: Firestore) {
  return collection(firestore, FIRESTORE_COLLECTIONS.inventoryBatches);
}

export function stockMovementsCollection(firestore: Firestore) {
  return collection(firestore, FIRESTORE_COLLECTIONS.stockMovements);
}

export function ordersCollection(firestore: Firestore) {
  return collection(firestore, FIRESTORE_COLLECTIONS.orders);
}

export function orderItemsCollection(firestore: Firestore) {
  return collection(firestore, FIRESTORE_COLLECTIONS.orderItems);
}

export function orderEventsCollection(firestore: Firestore) {
  return collection(firestore, FIRESTORE_COLLECTIONS.orderEvents);
}

export function shipmentsCollection(firestore: Firestore) {
  return collection(firestore, FIRESTORE_COLLECTIONS.shipments);
}

export function packagesCollection(firestore: Firestore) {
  return collection(firestore, FIRESTORE_COLLECTIONS.packages);
}

export function packageItemsCollection(firestore: Firestore) {
  return collection(firestore, FIRESTORE_COLLECTIONS.packageItems);
}

export function shipmentEventsCollection(firestore: Firestore) {
  return collection(firestore, FIRESTORE_COLLECTIONS.shipmentEvents);
}

