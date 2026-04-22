import React, { createContext, useEffect, useState } from "react";
import { useStorefront } from "./StorefrontContext";
import type { StoreTemplateId } from "../config/storeTemplates";

export type CatalogProduct = {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  category: "electronics" | "jewelery" | "men's clothing" | "women's clothing" | string;
  categoryLabel?: string;
  source?: string;
};

// Primary data source used by both API fallback and direct client fallback.
const FAKESTORE_BASE_URL = "https://fakestoreapi.com";

type CatalogInput = {
  id?: string | number;
  title?: string;
  price?: number;
  image?: string;
  description?: string;
  category?: string;
  source?: string;
};

function buildProductsEndpoint(templateId: StoreTemplateId, categories: string[]) {
  // Keep endpoint generation in one place so query params stay consistent.
  const params = new URLSearchParams();
  params.set("template", templateId);
  params.set("categories", categories.join(","));
  return `/api/products?${params.toString()}`;
}

function normalizeCatalogProduct(product: CatalogInput): CatalogProduct {
  // Normalize every product into one frontend-safe shape.
  return {
    id: String(product.id ?? "unknown"),
    title: product.title ?? "Untitled product",
    price: Number(product.price ?? 0),
    image: product.image ?? "",
    description: product.description ?? "",
    category: product.category ?? "uncategorized",
    categoryLabel: product.category ?? "uncategorized",
    source: product.source || "fakestoreapi",
  };
}

async function fetchProductsFromFakeStore(categories: string[], signal: AbortSignal): Promise<CatalogProduct[]> {
  // Direct fallback path used when local API route is unavailable during development.
  const requests = categories.map(async (category) => {
    const response = await fetch(
      `${FAKESTORE_BASE_URL}/products/category/${encodeURIComponent(category)}`,
      { signal }
    );

    if (!response.ok) {
      throw new Error(`Fake Store request failed with status ${response.status}`);
    }

    const payload = await response.json();
    return Array.isArray(payload) ? payload.map(normalizeCatalogProduct) : [];
  });

  const result = await Promise.all(requests);
  return result.flat();
}

const FALLBACK_PRODUCTS: CatalogProduct[] = [
  {
    id: "fallback-electronics",
    title: "Wireless Headphones",
    price: 59.99,
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    description: "Core fallback product while API data is loading.",
    category: "electronics",
    categoryLabel: "electronics",
    source: "fallback",
  },
];

export const ProductContext = createContext<CatalogProduct[]>(FALLBACK_PRODUCTS);

const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Start with a valid array to prevent empty-state flashes on first render.
  const [products, setProducts] = useState<CatalogProduct[]>(FALLBACK_PRODUCTS);
  const { activeTemplateId, activeTemplate } = useStorefront();

  useEffect(() => {
    // Re-fetch products whenever the active storefront template changes.
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          buildProductsEndpoint(activeTemplateId, activeTemplate.featuredCategories),
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`Product API request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const catalogProducts = Array.isArray(payload)
          ? payload.map(normalizeCatalogProduct)
          : (payload.products ?? []).map(normalizeCatalogProduct);

        setProducts(catalogProducts);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          try {
            const fallbackCatalog = await fetchProductsFromFakeStore(
              activeTemplate.featuredCategories,
              controller.signal
            );
            setProducts(fallbackCatalog);
          } catch (fallbackError) {
            console.error("Unable to load catalog products:", error, fallbackError);
          }
        }
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, [activeTemplate.featuredCategories, activeTemplateId]);

  return <ProductContext.Provider value={products}>{children}</ProductContext.Provider>;
};

export default ProductProvider;