import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs, increment, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import type { CatalogProduct } from "./ProductContext";

type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
};

type CartContextValue = {
  cartItems: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshCart: () => Promise<void>;
  addToCart: (product: CatalogProduct) => Promise<void>;
  increaseQuantity: (itemId: string) => Promise<void>;
  decreaseQuantity: (itemId: string) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
};

// Shared cart context keeps the cart state in one place for the navbar, product cards, and cart page.
export const CartContext = createContext<CartContextValue | undefined>(undefined);

export function normalizeCartItem(itemId: string, data: Partial<CartItem>): CartItem {
  // Normalize Firestore data so the UI always gets the same safe cart item shape.
  return {
    id: String(data.id ?? itemId),
    title: data.title ?? "Untitled product",
    price: Number(data.price ?? 0),
    image: data.image ?? "",
    description: data.description ?? "",
    quantity: Number(data.quantity ?? 0),
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Local state mirrors the signed-in user's Firestore cart collection.
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshCart = useCallback(async () => {
    // If nobody is signed in, the cart should stay empty and stop loading.
    if (!currentUserId) {
      setCartItems([]);
      setIsLoading(false);
      return;
    }

    // Pull the latest cart snapshot from Firestore.
    setIsLoading(true);

    try {
      const cartItemsCollection = collection(db, "users", currentUserId, "cartItems");
      const cartItemsSnapshot = await getDocs(cartItemsCollection);
      const items = cartItemsSnapshot.docs.map((snapshot) =>
        normalizeCartItem(snapshot.id, snapshot.data() as Partial<CartItem>)
      );
      setCartItems(items);
    } catch (error) {
      console.error("Unable to load cart items:", error);
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  }, [currentUserId]);

  useEffect(() => {
    // Keep the provider in sync with Firebase auth state.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUserId(user?.uid ?? null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Refresh whenever the signed-in user changes; otherwise clear the cart view.
    if (currentUserId) {
      refreshCart();
      return;
    }

    setCartItems([]);
    setIsLoading(false);
  }, [currentUserId, refreshCart]);

  const addToCart = useCallback(
    async (product: CatalogProduct) => {
      // Cart operations require an authenticated user because the data is stored under their Firestore path.
      if (!currentUserId) {
        throw new Error("User must be signed in to add items to cart.");
      }

      // Merge into the existing item document so quantity updates stay atomic.
      const cartItemRef = doc(db, "users", currentUserId, "cartItems", String(product.id));
      const existingItem = cartItems.find((item) => item.id === String(product.id));
      const nextQuantity = (existingItem?.quantity ?? 0) + 1;

      await setDoc(
        cartItemRef,
        {
          id: String(product.id),
          title: product.title,
          price: product.price,
          image: product.image,
          description: product.description,
          quantity: nextQuantity,
        },
        { merge: true }
      );

      await refreshCart();
    },
    [cartItems, currentUserId, refreshCart]
  );

  const removeFromCart = useCallback(
    async (itemId: string) => {
      // Deleting the document fully removes the product from the user's cart.
      if (!currentUserId) {
        return;
      }

      const cartItemRef = doc(db, "users", currentUserId, "cartItems", itemId);
      await deleteDoc(cartItemRef);
      await refreshCart();
    },
    [currentUserId, refreshCart]
  );

  const increaseQuantity = useCallback(
    async (itemId: string) => {
      // Increasing quantity is just an increment on the Firestore document.
      if (!currentUserId) {
        return;
      }

      const cartItemRef = doc(db, "users", currentUserId, "cartItems", itemId);
      await updateDoc(cartItemRef, {
        quantity: increment(1),
      });
      await refreshCart();
    },
    [currentUserId, refreshCart]
  );

  const decreaseQuantity = useCallback(
    async (itemId: string) => {
      // If the item hits one, removing it is cleaner than storing a zero quantity.
      if (!currentUserId) {
        return;
      }

      const existingItem = cartItems.find((item) => item.id === itemId);

      if (!existingItem || existingItem.quantity <= 1) {
        await removeFromCart(itemId);
        return;
      }

      const cartItemRef = doc(db, "users", currentUserId, "cartItems", itemId);
      await updateDoc(cartItemRef, {
        quantity: increment(-1),
      });
      await refreshCart();
    },
    [cartItems, currentUserId, refreshCart, removeFromCart]
  );

  // Derived values keep the UI simple and avoid duplicate math in the components.
  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);
  const cartSubtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      cartItems,
      cartCount,
      cartSubtotal,
      isAuthenticated: Boolean(currentUserId),
      isLoading,
      refreshCart,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
    }),
    [addToCart, cartCount, cartItems, cartSubtotal, currentUserId, decreaseQuantity, increaseQuantity, isLoading, refreshCart, removeFromCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
