export type StoreTemplateId = "tech" | "home-decor" | "fitness";

export type ProductLayoutPreset = "horizontal-stack" | "amazon-grid";

export const PRODUCT_LAYOUT_OPTIONS: Array<{
  id: ProductLayoutPreset;
  label: string;
}> = [
  { id: "horizontal-stack", label: "Horizontal Stack" },
  { id: "amazon-grid", label: "Row and Column Grid" },
];

export type StoreTemplate = {
  id: StoreTemplateId;
  name: string;
  tagline: string;
  heroHeading: string;
  heroSubheading: string;
  featuredCategories: string[];
  accentColor: string;
  theme: {
    bgBase: string;
    bgPanel: string;
    textMain: string;
    textMuted: string;
    lineSoft: string;
    accent: string;
    accentContrast: string;
    navbarBg: string;
  };
  productLayoutPreset: ProductLayoutPreset;
  productLayoutLabel: string;
};

// Shared catalog scope for template previews.
// Each template can later narrow this list when its merchandising rules are finalized.
const ALL_FAKESTORE_CATEGORIES = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

// Template registry: update this object to add or tune storefront variants.
export const STORE_TEMPLATES: Record<StoreTemplateId, StoreTemplate> = {
  // Tech-focused merchandising.
  tech: {
    id: "tech",
    name: "Squacht Tech",
    tagline: "Smart tools for modern routines",
    heroHeading: "Build A Smarter Everyday Setup",
    heroSubheading:
      "Launch-ready technology storefront focused on practical, high-intent products.",
    featuredCategories: ALL_FAKESTORE_CATEGORIES,
    accentColor: "#008060",
    theme: {
      bgBase: "#f3f6f8",
      bgPanel: "#fdfefe",
      textMain: "#1d2733",
      textMuted: "#556170",
      lineSoft: "#c9d4dd",
      accent: "#0f766e",
      accentContrast: "#ffffff",
      navbarBg: "#e8eff4",
    },
    productLayoutPreset: "horizontal-stack",
    productLayoutLabel: "Horizontal Stack",
  },
  // Lifestyle and decor-focused merchandising.
  "home-decor": {
    id: "home-decor",
    name: "Hearth And Haven",
    tagline: "Comfort-first decor experiences",
    heroHeading: "Curated Decor For Every Room",
    heroSubheading:
      "A template tuned for lifestyle merchandising, bundles, and visual storytelling.",
    featuredCategories: ALL_FAKESTORE_CATEGORIES,
    accentColor: "#7b5e57",
    theme: {
      bgBase: "#f7f2ec",
      bgPanel: "#fffaf4",
      textMain: "#332a24",
      textMuted: "#6f6157",
      lineSoft: "#dac9b8",
      accent: "#8c5a3c",
      accentContrast: "#ffffff",
      navbarBg: "#f0e4d7",
    },
    productLayoutPreset: "amazon-grid",
    productLayoutLabel: "Row and Column Grid",
  },
  // Fitness and apparel-focused merchandising.
  fitness: {
    id: "fitness",
    name: "Peak Routine",
    tagline: "Performance products for daily consistency",
    heroHeading: "Train Better With Focused Gear",
    heroSubheading:
      "A conversion-oriented fitness storefront template centered on goals and routines.",
    featuredCategories: ALL_FAKESTORE_CATEGORIES,
    accentColor: "#1f6feb",
    theme: {
      bgBase: "#f1f4f8",
      bgPanel: "#fbfdff",
      textMain: "#1b2430",
      textMuted: "#596578",
      lineSoft: "#c7d2e3",
      accent: "#1d4ed8",
      accentContrast: "#ffffff",
      navbarBg: "#e3ebf7",
    },
    productLayoutPreset: "amazon-grid",
    productLayoutLabel: "Row and Column Grid",
  },
};

// Used when no template is provided in query params/local storage.
export const DEFAULT_STORE_TEMPLATE: StoreTemplateId = "tech";
