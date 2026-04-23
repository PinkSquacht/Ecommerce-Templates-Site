export type StoreTemplateId =
  | "editorial"
  | "luxury"
  | "shelf"
  | "motion"
  | "trust"
  | "mobile"
  | "proof"
  | "personalized"
  | "system"
  | "performance";

export type ProductCardStyle =
  | "editorial"
  | "luxury"
  | "shelf"
  | "motion"
  | "trust"
  | "mobile"
  | "proof"
  | "personalized"
  | "system"
  | "performance";

export type StoreTemplate = {
  id: StoreTemplateId;
  name: string;
  tagline: string;
  designDirection: string;
  heroHeading: string;
  heroSubheading: string;
  featuredCategories: string[];
  accentColor: string;
  templateHighlights: string[];
  proofSignals: string[];
  productCardStyle: ProductCardStyle;
  previewLayout:
    | "editorial-split"
    | "luxury-minimal"
    | "shelf-panels"
    | "motion-stages"
    | "trust-dashboard"
    | "mobile-stack"
    | "proof-overlay"
    | "personalized-rail"
    | "system-kit"
    | "performance-strip";
  theme: {
    bgBase: string;
    bgPanel: string;
    textMain: string;
    textMuted: string;
    lineSoft: string;
    accent: string;
    accentContrast: string;
    navbarBg: string;
    fontHeading: string;
    fontBody: string;
    glowA: string;
    glowB: string;
    cardRadius: string;
    cardShadow: string;
  };
};

// Shared catalog scope for template previews.
// Each template can later narrow this list when its merchandising rules are finalized.
const ALL_FAKESTORE_CATEGORIES = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

// Template registry: each design trend is a full storefront identity.
// These values control tone, typography, spacing, trust signals, and card style.
export const STORE_TEMPLATES: Record<StoreTemplateId, StoreTemplate> = {
  editorial: {
    id: "editorial",
    name: "Editorial Luxe",
    tagline: "Magazine-style product storytelling",
    designDirection: "Editorial ecommerce layouts",
    heroHeading: "A Brand-Forward Storefront With Room To Breathe",
    heroSubheading:
      "Big typography, asymmetrical spacing, and premium storytelling for founders who want their brand to feel considered.",
    featuredCategories: ALL_FAKESTORE_CATEGORIES,
    accentColor: "#5b4b42",
    templateHighlights: ["Hero-led storytelling", "Editorial spacing", "Featured collections"],
    proofSignals: ["Luxury presentation", "High-conversion hierarchy", "Brand-forward layouts"],
    productCardStyle: "editorial",
    previewLayout: "editorial-split",
    theme: {
      bgBase: "#f4ede4",
      bgPanel: "#fffaf4",
      textMain: "#231f1d",
      textMuted: "#665b52",
      lineSoft: "#d8cabd",
      accent: "#6f4f3e",
      accentContrast: "#ffffff",
      navbarBg: "#efe4d6",
      fontHeading: "Fraunces, serif",
      fontBody: "Source Sans 3, sans-serif",
      glowA: "rgba(111, 79, 62, 0.14)",
      glowB: "rgba(219, 175, 132, 0.14)",
      cardRadius: "20px",
      cardShadow: "0 20px 48px rgba(76, 53, 39, 0.14)",
    },
  },
  luxury: {
    id: "luxury",
    name: "Quiet Luxury",
    tagline: "Soft-neutral, conversion-friendly polish",
    designDirection: "Soft-neutral luxury palettes",
    heroHeading: "Quiet Luxury With Clear Purchase Signals",
    heroSubheading:
      "Warm creams, stone grays, and a single confident accent create a polished storefront that feels expensive without being cold.",
    featuredCategories: ALL_FAKESTORE_CATEGORIES,
    accentColor: "#8b735f",
    templateHighlights: ["Warm neutrals", "Refined surfaces", "Calm conversion flow"],
    proofSignals: ["Stone-and-cream palette", "Elegant card rhythm", "One accent color"],
    productCardStyle: "luxury",
    previewLayout: "luxury-minimal",
    theme: {
      bgBase: "#f6efe7",
      bgPanel: "#fffaf5",
      textMain: "#2c2622",
      textMuted: "#6d6158",
      lineSoft: "#d9cab8",
      accent: "#8a6a4f",
      accentContrast: "#ffffff",
      navbarBg: "#f0e5d8",
      fontHeading: "Fraunces, serif",
      fontBody: "Work Sans, sans-serif",
      glowA: "rgba(138, 106, 79, 0.14)",
      glowB: "rgba(154, 145, 133, 0.12)",
      cardRadius: "22px",
      cardShadow: "0 20px 44px rgba(85, 68, 54, 0.12)",
    },
  },
  shelf: {
    id: "shelf",
    name: "Shelf Discovery",
    tagline: "Amazon-style browsing with quick scanning",
    designDirection: "Shelf browsing patterns",
    heroHeading: "Category Shelves Built For Fast Discovery",
    heroSubheading:
      "Horizontal rows, clear sections, and quick-scanning product shelves help customers move through the catalog with less friction.",
    featuredCategories: ALL_FAKESTORE_CATEGORIES,
    accentColor: "#2563eb",
    templateHighlights: ["Category shelves", "Fast scanning", "Clear browsing structure"],
    proofSignals: ["Row-based discovery", "Easy visual scanning", "Quick category focus"],
    productCardStyle: "shelf",
    previewLayout: "shelf-panels",
    theme: {
      bgBase: "#eef2f8",
      bgPanel: "#fbfdff",
      textMain: "#172033",
      textMuted: "#5a6780",
      lineSoft: "#c5d1e3",
      accent: "#1d4ed8",
      accentContrast: "#ffffff",
      navbarBg: "#dfe9f8",
      fontHeading: "Sora, sans-serif",
      fontBody: "Manrope, sans-serif",
      glowA: "rgba(29, 78, 216, 0.14)",
      glowB: "rgba(56, 189, 248, 0.1)",
      cardRadius: "14px",
      cardShadow: "0 14px 34px rgba(24, 44, 88, 0.12)",
    },
  },
  motion: {
    id: "motion",
    name: "Motion Layered",
    tagline: "Subtle transitions with intention",
    designDirection: "Fewer but better animations",
    heroHeading: "Motion That Guides Attention",
    heroSubheading:
      "Staggered reveals, smoother spacing, and deliberate hover states create a premium feel without visual noise.",
    featuredCategories: ALL_FAKESTORE_CATEGORIES,
    accentColor: "#7c3aed",
    templateHighlights: ["Subtle reveal layers", "Intentional hover states", "Smooth section flow"],
    proofSignals: ["Motion with purpose", "Attention-first hierarchy", "Refined interaction rhythm"],
    productCardStyle: "motion",
    previewLayout: "motion-stages",
    theme: {
      bgBase: "#f3f0f9",
      bgPanel: "#fcfbff",
      textMain: "#1d1a2c",
      textMuted: "#625e75",
      lineSoft: "#d7d0e8",
      accent: "#7c3aed",
      accentContrast: "#ffffff",
      navbarBg: "#ece7fb",
      fontHeading: "Sora, sans-serif",
      fontBody: "Work Sans, sans-serif",
      glowA: "rgba(124, 58, 237, 0.16)",
      glowB: "rgba(236, 72, 153, 0.08)",
      cardRadius: "18px",
      cardShadow: "0 18px 44px rgba(69, 42, 126, 0.14)",
    },
  },
  trust: {
    id: "trust",
    name: "Trust First",
    tagline: "High-confidence purchase pages",
    designDirection: "High-trust product cards",
    heroHeading: "Product Cards Built To Reduce Doubt",
    heroSubheading:
      "Cleaner cards, clearer pricing, and more obvious CTAs give shoppers the confidence to move from browse to buy.",
    featuredCategories: ALL_FAKESTORE_CATEGORIES,
    accentColor: "#0f766e",
    templateHighlights: ["Stronger hierarchy", "Clear CTA emphasis", "Trust-first surfaces"],
    proofSignals: ["Fewer words, more clarity", "Visible pricing", "Confidence-driven UI"],
    productCardStyle: "trust",
    previewLayout: "trust-dashboard",
    theme: {
      bgBase: "#eef5f2",
      bgPanel: "#f9fffd",
      textMain: "#17211f",
      textMuted: "#5b6e68",
      lineSoft: "#c5d8d1",
      accent: "#0f766e",
      accentContrast: "#ffffff",
      navbarBg: "#e1f0eb",
      fontHeading: "Manrope, sans-serif",
      fontBody: "Source Sans 3, sans-serif",
      glowA: "rgba(15, 118, 110, 0.16)",
      glowB: "rgba(16, 185, 129, 0.08)",
      cardRadius: "16px",
      cardShadow: "0 16px 38px rgba(22, 65, 59, 0.12)",
    },
  },
  mobile: {
    id: "mobile",
    name: "Mobile First",
    tagline: "Thumb-reach commerce that stays usable",
    designDirection: "Mobile-first sticky actions",
    heroHeading: "Built For One-Handed Shopping",
    heroSubheading:
      "Fast thumb reach, visible actions, and tighter card spacing keep the flow strong on smaller screens.",
    featuredCategories: ALL_FAKESTORE_CATEGORIES,
    accentColor: "#ea580c",
    templateHighlights: ["Thumb-friendly actions", "Compact spacing", "Responsive priority"],
    proofSignals: ["Mobile conversion focus", "Sticky action emphasis", "Fast scanning on small screens"],
    productCardStyle: "mobile",
    previewLayout: "mobile-stack",
    theme: {
      bgBase: "#fbf2ec",
      bgPanel: "#fffaf7",
      textMain: "#2a1d18",
      textMuted: "#745e51",
      lineSoft: "#e3ccb9",
      accent: "#ea580c",
      accentContrast: "#ffffff",
      navbarBg: "#f8e5d8",
      fontHeading: "Sora, sans-serif",
      fontBody: "Work Sans, sans-serif",
      glowA: "rgba(234, 88, 12, 0.16)",
      glowB: "rgba(251, 146, 60, 0.1)",
      cardRadius: "14px",
      cardShadow: "0 16px 36px rgba(118, 59, 21, 0.14)",
    },
  },
  proof: {
    id: "proof",
    name: "Proof Stack",
    tagline: "Product pages with evidence near the CTA",
    designDirection: "Visual proof near CTAs",
    heroHeading: "Trust Signals Placed Where They Matter",
    heroSubheading:
      "Ratings, shipping estimates, and return cues show up close to the action so shoppers have fewer unanswered questions.",
    featuredCategories: ALL_FAKESTORE_CATEGORIES,
    accentColor: "#1d4ed8",
    templateHighlights: ["Proof near CTA", "Shipping and returns cues", "Confidence cues near action"],
    proofSignals: ["Ratings-first emphasis", "Operational reassurance", "Purchase clarity"],
    productCardStyle: "proof",
    previewLayout: "proof-overlay",
    theme: {
      bgBase: "#eef3fb",
      bgPanel: "#fbfdff",
      textMain: "#192032",
      textMuted: "#5b667a",
      lineSoft: "#c7d1e4",
      accent: "#1d4ed8",
      accentContrast: "#ffffff",
      navbarBg: "#dfe8f8",
      fontHeading: "Archivo Expanded, sans-serif",
      fontBody: "Manrope, sans-serif",
      glowA: "rgba(29, 78, 216, 0.16)",
      glowB: "rgba(59, 130, 246, 0.1)",
      cardRadius: "14px",
      cardShadow: "0 15px 34px rgba(28, 46, 84, 0.14)",
    },
  },
  personalized: {
    id: "personalized",
    name: "Curated For You",
    tagline: "Merchandising that adapts to the shopper",
    designDirection: "Personalized merchandising blocks",
    heroHeading: "Recommendations That Feel Thoughtful",
    heroSubheading:
      "Recommended for you rails and context-aware category ordering make the catalog feel more personal and more relevant.",
    featuredCategories: ALL_FAKESTORE_CATEGORIES,
    accentColor: "#be185d",
    templateHighlights: ["Recommended rails", "Context-aware ordering", "Personalized merchandising"],
    proofSignals: ["Tailored presentation", "Relevant discovery", "Higher intent browsing"],
    productCardStyle: "personalized",
    previewLayout: "personalized-rail",
    theme: {
      bgBase: "#f9eef4",
      bgPanel: "#fff9fc",
      textMain: "#2b1822",
      textMuted: "#725664",
      lineSoft: "#e0c9d5",
      accent: "#be185d",
      accentContrast: "#ffffff",
      navbarBg: "#f4dce7",
      fontHeading: "Fraunces, serif",
      fontBody: "Source Sans 3, sans-serif",
      glowA: "rgba(190, 24, 93, 0.16)",
      glowB: "rgba(244, 114, 182, 0.1)",
      cardRadius: "18px",
      cardShadow: "0 18px 42px rgba(106, 28, 58, 0.14)",
    },
  },
  system: {
    id: "system",
    name: "Design System",
    tagline: "Token-driven storefront architecture",
    designDirection: "System-driven theming",
    heroHeading: "One Codebase, Many Brand Identities",
    heroSubheading:
      "Token-based color, spacing, and typography control makes each storefront variant feel consistent and easy to rebrand.",
    featuredCategories: ALL_FAKESTORE_CATEGORIES,
    accentColor: "#475569",
    templateHighlights: ["Token-based styling", "Reusable surfaces", "Brand-switch ready"],
    proofSignals: ["Scalable design system", "Easy client handoff", "Strong visual consistency"],
    productCardStyle: "system",
    previewLayout: "system-kit",
    theme: {
      bgBase: "#eef2f4",
      bgPanel: "#fcfdfe",
      textMain: "#1d2630",
      textMuted: "#5c6874",
      lineSoft: "#c8d1d8",
      accent: "#475569",
      accentContrast: "#ffffff",
      navbarBg: "#e4eaee",
      fontHeading: "Sora, sans-serif",
      fontBody: "Work Sans, sans-serif",
      glowA: "rgba(71, 85, 105, 0.14)",
      glowB: "rgba(148, 163, 184, 0.08)",
      cardRadius: "14px",
      cardShadow: "0 14px 32px rgba(32, 44, 58, 0.12)",
    },
  },
  performance: {
    id: "performance",
    name: "Performance First",
    tagline: "Fast load, clean hierarchy, quick decisions",
    designDirection: "Performance-as-design",
    heroHeading: "Built To Feel Fast Before It Even Finishes Loading",
    heroSubheading:
      "Compact spacing, efficient visual weight, and simple hierarchy make the storefront feel quicker and more responsive.",
    featuredCategories: ALL_FAKESTORE_CATEGORIES,
    accentColor: "#16a34a",
    templateHighlights: ["Compact hierarchy", "Fast perceived load", "Efficient visual weight"],
    proofSignals: ["Speed-first layout", "Reduced visual noise", "Sharper scanning"],
    productCardStyle: "performance",
    previewLayout: "performance-strip",
    theme: {
      bgBase: "#eef7f0",
      bgPanel: "#fbfffc",
      textMain: "#18231b",
      textMuted: "#587066",
      lineSoft: "#c8ddcf",
      accent: "#16a34a",
      accentContrast: "#ffffff",
      navbarBg: "#dff2e4",
      fontHeading: "Manrope, sans-serif",
      fontBody: "Source Sans 3, sans-serif",
      glowA: "rgba(22, 163, 74, 0.14)",
      glowB: "rgba(34, 197, 94, 0.08)",
      cardRadius: "12px",
      cardShadow: "0 12px 28px rgba(23, 66, 36, 0.12)",
    },
  },
};

// Used when no template is provided in query params/local storage.
export const DEFAULT_STORE_TEMPLATE: StoreTemplateId = "editorial";
