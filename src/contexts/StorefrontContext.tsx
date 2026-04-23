import { createContext, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_STORE_TEMPLATE,
  STORE_TEMPLATES,
  type StoreTemplate,
  type StoreTemplateId,
} from "../config/storeTemplates.ts";
import {
  DEFAULT_SERVICE_TIER,
  SERVICE_TIERS,
  type ServiceTier,
  type ServiceTierId,
} from "../config/serviceTiers";

// Storefront context controls which template is active and exposes template metadata
// to the rest of the app (branding, category strategy, hero messaging).

type StorefrontContextValue = {
  activeTemplateId: StoreTemplateId;
  activeTemplate: StoreTemplate;
  availableTemplates: StoreTemplate[];
  setActiveTemplateId: (templateId: StoreTemplateId) => void;
  activeTierId: ServiceTierId;
  activeTier: ServiceTier;
  availableTiers: ServiceTier[];
  setActiveTierId: (tierId: ServiceTierId) => void;
};

export const StorefrontContext = createContext<StorefrontContextValue | undefined>(undefined);

function resolveInitialTemplateId(): StoreTemplateId {
  // Priority order: query param -> local storage -> default template.
  if (typeof window === "undefined") {
    return DEFAULT_STORE_TEMPLATE;
  }

  const templateParam = new URLSearchParams(window.location.search).get("template");
  if (templateParam && templateParam in STORE_TEMPLATES) {
    return templateParam as StoreTemplateId;
  }

  const storedTemplate = window.localStorage.getItem("activeStoreTemplate");
  if (storedTemplate && storedTemplate in STORE_TEMPLATES) {
    return storedTemplate as StoreTemplateId;
  }

  return DEFAULT_STORE_TEMPLATE;
}

function resolveInitialTierId(): ServiceTierId {
  if (typeof window === "undefined") {
    return DEFAULT_SERVICE_TIER;
  }

  const tierParam = new URLSearchParams(window.location.search).get("tier");
  if (tierParam && tierParam in SERVICE_TIERS) {
    return tierParam as ServiceTierId;
  }

  const storedTier = window.localStorage.getItem("activeServiceTier");
  if (storedTier && storedTier in SERVICE_TIERS) {
    return storedTier as ServiceTierId;
  }

  return DEFAULT_SERVICE_TIER;
}

export function StorefrontProvider({ children }: { children: React.ReactNode }) {
  // Template and tier together define what the storefront is and what tools the client can access.
  const [activeTemplateId, setActiveTemplateId] = useState<StoreTemplateId>(resolveInitialTemplateId);
  const [activeTierId, setActiveTierId] = useState<ServiceTierId>(resolveInitialTierId);

  const setTemplate = (templateId: StoreTemplateId) => {
    // Persist template changes so client demo previews survive refreshes.
    setActiveTemplateId(templateId);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("activeStoreTemplate", templateId);
    }
  };

  const setTier = (tierId: ServiceTierId) => {
    setActiveTierId(tierId);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("activeServiceTier", tierId);
    }
  };

  const value = useMemo<StorefrontContextValue>(() => {
    return {
      activeTemplateId,
      activeTemplate: STORE_TEMPLATES[activeTemplateId],
      availableTemplates: Object.values(STORE_TEMPLATES),
      setActiveTemplateId: setTemplate,
      activeTierId,
      activeTier: SERVICE_TIERS[activeTierId],
      availableTiers: Object.values(SERVICE_TIERS),
      setActiveTierId: setTier,
    };
  }, [activeTemplateId, activeTierId]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const root = document.documentElement;
    const theme = STORE_TEMPLATES[activeTemplateId].theme;

    // Expose the active template id so CSS can target template-specific presentation rules.
    root.dataset.storeTemplate = activeTemplateId;

    // Push the selected template's tokens into CSS variables for app-wide restyling.
    root.style.setProperty("--bg-base", theme.bgBase);
    root.style.setProperty("--bg-panel", theme.bgPanel);
    root.style.setProperty("--text-main", theme.textMain);
    root.style.setProperty("--text-muted", theme.textMuted);
    root.style.setProperty("--line-soft", theme.lineSoft);
    root.style.setProperty("--highlight", theme.accent);
    root.style.setProperty("--accent-contrast", theme.accentContrast);
    root.style.setProperty("--navbar-bg", theme.navbarBg);
    root.style.setProperty("--font-heading", theme.fontHeading);
    root.style.setProperty("--font-body", theme.fontBody);
    root.style.setProperty("--hero-glow-a", theme.glowA);
    root.style.setProperty("--hero-glow-b", theme.glowB);
    root.style.setProperty("--card-radius", theme.cardRadius);
    root.style.setProperty("--card-shadow", theme.cardShadow);
  }, [activeTemplateId]);

  return <StorefrontContext.Provider value={value}>{children}</StorefrontContext.Provider>;
}
