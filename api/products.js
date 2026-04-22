const FAKESTORE_BASE_URL = "https://fakestoreapi.com";

const ALL_FAKESTORE_CATEGORIES = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

// Template-to-category mapping controls what each storefront receives.
const TEMPLATE_CATEGORY_MAP = {
  tech: ALL_FAKESTORE_CATEGORIES,
  "home-decor": ALL_FAKESTORE_CATEGORIES,
  fitness: ALL_FAKESTORE_CATEGORIES,
};

const DEFAULT_TEMPLATE = "tech";

// Minimal emergency fallback catalog if upstream API is unavailable.
const FALLBACK_PRODUCTS = [
  {
    id: "fallback-electronics",
    title: "Wireless Headphones",
    price: 59.99,
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    description: "Fallback catalog item served when Fake Store API is unavailable.",
    category: "electronics",
  },
  {
    id: "fallback-jewelery",
    title: "Gold Chain Bracelet",
    price: 39.99,
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    description: "Fallback catalog item for decor-style storefronts.",
    category: "jewelery",
  },
  {
    id: "fallback-mens-clothing",
    title: "Casual Athletic Tee",
    price: 24.99,
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879_.jpg",
    description: "Fallback product for fitness storefronts.",
    category: "men's clothing",
  },
];

function normalizeProduct(product) {
  // Normalize upstream payload to a stable frontend contract.
  return {
    id: String(product.id),
    title: product.title || "Untitled product",
    price: Number(product.price ?? 0),
    image: product.image || "",
    description: product.description || "",
    category: product.category || "uncategorized",
    categoryLabel: product.category || "uncategorized",
    source: "fakestoreapi",
  };
}

function getRequestUrl(request) {
  return new URL(request.url || "", "http://localhost");
}

function parseRequestedTemplate(requestUrl) {
  // Invalid template values gracefully resolve to the default template.
  const template = requestUrl.searchParams.get("template") || DEFAULT_TEMPLATE;
  return template in TEMPLATE_CATEGORY_MAP ? template : DEFAULT_TEMPLATE;
}

function parseRequestedCategories(requestUrl, template) {
  // Allow category overrides for testing, otherwise use template defaults.
  const categoriesParam = requestUrl.searchParams.get("categories");

  if (!categoriesParam) {
    return TEMPLATE_CATEGORY_MAP[template];
  }

  const parsedCategories = categoriesParam
    .split(",")
    .map((category) => category.trim())
    .filter(Boolean);

  if (parsedCategories.length === 0) {
    return TEMPLATE_CATEGORY_MAP[template];
  }

  return parsedCategories;
}

async function fetchProductsByCategories(categories) {
  // Fetch each category in parallel for lower response time.
  const requests = categories.map(async (category) => {
    const response = await fetch(
      `${FAKESTORE_BASE_URL}/products/category/${encodeURIComponent(category)}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Fake Store request failed with status ${response.status}`);
    }

    const payload = await response.json();
    const products = Array.isArray(payload) ? payload : [];

    return products.map(normalizeProduct);
  });

  const batches = await Promise.all(requests);
  return batches.flat();
}

function createFallbackCatalog(categories) {
  // Keep fallback response shape identical to live responses.
  return FALLBACK_PRODUCTS
    .filter((product) => categories.includes(product.category))
    .map((product) => ({
      ...product,
      categoryLabel: product.category,
      source: "fallback",
    }));
}

export default async function handler(request, response) {
  // This endpoint only supports reads for storefront catalog loading.
  if (request.method && request.method !== "GET") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  const requestUrl = getRequestUrl(request);
  const template = parseRequestedTemplate(requestUrl);
  const categories = parseRequestedCategories(requestUrl, template);

  try {
    const products = await fetchProductsByCategories(categories);

    response.status(200).json({
      template,
      categories,
      products,
    });
  } catch (error) {
    response.status(200).json({
      template,
      categories,
      products: createFallbackCatalog(categories),
      warning: error instanceof Error ? error.message : "Using fallback catalog",
    });
  }
}
