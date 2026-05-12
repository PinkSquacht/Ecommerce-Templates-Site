/*
Standalone commerce Firestore helpers added for the checkout/inventory/shipping refactor.

They are commented out per request so they are easy to find and re-enable later.

import {
  addDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
  type Firestore,
  writeBatch,
} from "firebase/firestore";
import {
  cartItemsCollection,
  inventoryBatchesCollection,
  orderEventsCollection,
  orderItemsCollection,
  ordersCollection,
  packageItemsCollection,
  packagesCollection,
  shipmentEventsCollection,
  shipmentsCollection,
  stockMovementsCollection,
  productsCollection,
  type CartItemRecord,
  type InventoryBatchRecord,
  type OrderRecord,
  type ProductRecord,
} from "../config/firestoreSchema";

export type CheckoutResult = {
  orderId: string;
  subtotal: number;
  total: number;
};

export type CreateOrderInput = {
  userId: string;
  cartItems: CartItemRecord[];
  shippingCost?: number;
  tax?: number;
};

function calculateSubtotal(cartItems: CartItemRecord[]) {
  return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export async function createOrderFromCart(firestore: Firestore, input: CreateOrderInput): Promise<CheckoutResult> {
  if (!input.userId) {
    throw new Error("A user id is required to create an order.");
  }

  if (input.cartItems.length === 0) {
    throw new Error("Cannot create an order from an empty cart.");
  }

  const subtotal = calculateSubtotal(input.cartItems);
  const shippingCost = Number(input.shippingCost ?? 0);
  const tax = Number(input.tax ?? 0);
  const total = subtotal + shippingCost + tax;

  const batch = writeBatch(firestore);
  const orderRef = doc(ordersCollection(firestore));
  const orderPayload: OrderRecord = {
    userId: input.userId,
    status: "pending",
    subtotal,
    shippingCost,
    tax,
    total,
    paymentStatus: "unpaid",
    fulfillmentStatus: "awaiting_reservation",
    placedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  batch.set(orderRef, orderPayload);

  input.cartItems.forEach((item) => {
    const orderItemRef = doc(orderItemsCollection(firestore));
    batch.set(orderItemRef, {
      orderId: orderRef.id,
      productId: item.productId ?? item.id,
      title: item.title,
      unitPrice: item.price,
      quantity: item.quantity,
      lineTotal: item.price * item.quantity,
    });
  });

  const orderEventRef = doc(orderEventsCollection(firestore));
  batch.set(orderEventRef, {
    orderId: orderRef.id,
    status: "created",
    note: "Checkout order created from cart.",
    createdAt: serverTimestamp(),
  });

  const cartSnapshot = await getDocs(cartItemsCollection(firestore, input.userId));
  cartSnapshot.docs.forEach((cartDoc) => {
    batch.delete(cartDoc.ref);
  });

  await batch.commit();

  return {
    orderId: orderRef.id,
    subtotal,
    total,
  };
}

export async function createInventoryBatch(firestore: Firestore, batchData: InventoryBatchRecord) {
  return addDoc(inventoryBatchesCollection(firestore), batchData);
}

export async function adjustInventoryBatch(
  firestore: Firestore,
  batchId: string,
  patch: Partial<InventoryBatchRecord>
) {
  return updateDoc(doc(inventoryBatchesCollection(firestore), batchId), patch);
}

export async function recordStockMovement(
  firestore: Firestore,
  movement: {
    productId: string;
    batchId?: string;
    orderId?: string;
    movementType: string;
    quantity: number;
    reason?: string;
  }
) {
  return addDoc(stockMovementsCollection(firestore), {
    ...movement,
    createdAt: serverTimestamp(),
  });
}

export async function createShipmentRecord(
  firestore: Firestore,
  shipment: {
    orderId: string;
    carrier: string;
    serviceLevel: string;
    trackingNumber?: string;
    labelUrl?: string;
    status: string;
    shippingCost: number;
  }
) {
  return addDoc(shipmentsCollection(firestore), {
    ...shipment,
    shippedAt: shipment.status === "shipped" ? serverTimestamp() : null,
    deliveredAt: null,
  });
}

export async function createPackageRecord(
  firestore: Firestore,
  packageData: {
    shipmentId: string;
    packageType: string;
    weight: number;
    length: number;
    width: number;
    height: number;
    labelUrl?: string;
  }
) {
  return addDoc(packagesCollection(firestore), packageData);
}

export async function addPackageItem(
  firestore: Firestore,
  packageData: {
    packageId: string;
    productId: string;
    orderItemId: string;
    quantity: number;
  }
) {
  return addDoc(packageItemsCollection(firestore), packageData);
}

export async function appendShipmentEvent(
  firestore: Firestore,
  event: {
    shipmentId: string;
    status: string;
    location?: string;
    rawPayload?: string;
  }
) {
  return addDoc(shipmentEventsCollection(firestore), {
    ...event,
    occurredAt: serverTimestamp(),
  });
}

export async function seedCatalogProduct(firestore: Firestore, product: ProductRecord) {
  return addDoc(productsCollection(firestore), {
    ...product,
    active: product.active ?? true,
  });
}
*/