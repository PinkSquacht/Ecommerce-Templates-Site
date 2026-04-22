export type ServiceTierId =
  | "basic"
  | "basic-admin"
  | "custom-basic"
  | "custom-basic-admin";

export type ServiceTier = {
  id: ServiceTierId;
  name: string;
  hasAdminDashboard: boolean;
  hasCustomSections: boolean;
  hasRoleAccess: boolean;
  hasAdvancedReporting: boolean;
  summary: string;
};

export const SERVICE_TIERS: Record<ServiceTierId, ServiceTier> = {
  basic: {
    id: "basic",
    name: "Basic",
    hasAdminDashboard: false,
    hasCustomSections: false,
    hasRoleAccess: false,
    hasAdvancedReporting: false,
    summary: "Core storefront pages with checkout and account flow.",
  },
  "basic-admin": {
    id: "basic-admin",
    name: "Basic + Admin",
    hasAdminDashboard: true,
    hasCustomSections: false,
    hasRoleAccess: false,
    hasAdvancedReporting: false,
    summary: "Core storefront plus admin dashboard for product and order operations.",
  },
  "custom-basic": {
    id: "custom-basic",
    name: "Custom Storefront",
    hasAdminDashboard: false,
    hasCustomSections: true,
    hasRoleAccess: false,
    hasAdvancedReporting: false,
    summary: "Custom-branded storefront with bespoke section layout.",
  },
  "custom-basic-admin": {
    id: "custom-basic-admin",
    name: "Custom Storefront + Admin",
    hasAdminDashboard: true,
    hasCustomSections: true,
    hasRoleAccess: true,
    hasAdvancedReporting: true,
    summary: "Custom storefront with full admin operations and reporting controls.",
  },
};

// Tier 2 default requested by project owner.
export const DEFAULT_SERVICE_TIER: ServiceTierId = "basic-admin";
