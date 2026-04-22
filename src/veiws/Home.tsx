import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Product from "../components/Product";
import { Container, Row } from 'react-bootstrap';
import { useStorefront } from "../contexts/StorefrontContext";
import {
  PRODUCT_LAYOUT_OPTIONS,
  type ProductLayoutPreset,
  type StoreTemplateId,
} from "../config/storeTemplates";
import type { ServiceTierId } from "../config/serviceTiers";

// Home is template-driven: branding copy + category strategy are derived from active template.
const Home = () => {
  const products = useContext(ProductContext);
  const {
    activeTemplate,
    activeTemplateId,
    availableTemplates,
    setActiveTemplateId,
    activeTier,
    activeTierId,
    availableTiers,
    setActiveTierId,
    activeLayoutPreset,
    setActiveLayoutPreset,
  } = useStorefront();

  // Keep merchandising logic centralized so templates can swap without component rewrites.
  const filteredProducts = products.filter((item) => {
    return activeTemplate.featuredCategories.includes(item.category);
  });

  const isAmazonGrid = activeLayoutPreset === "amazon-grid";

  const productsByCategory = filteredProducts.reduce<Record<string, typeof filteredProducts>>((acc, product) => {
    const category = product.category || "uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <Container className="storefront-shell">
      <section className="hero-panel" style={{ borderColor: activeTemplate.accentColor }}>
        <p className="hero-eyebrow">Client-Ready Storefront Engine</p>
        <h1>{activeTemplate.heroHeading}</h1>
        <p className="hero-subtitle">{activeTemplate.heroSubheading}</p>
        <p className="tier-summary">
          Active tier: <strong>{activeTier.name}</strong> - {activeTier.summary}
        </p>
        <div className="control-grid">
          <div className="control-block">
            <label htmlFor="template-select">Store Template</label>
            <select
              id="template-select"
              value={activeTemplateId}
              onChange={(event) => setActiveTemplateId(event.target.value as StoreTemplateId)}
            >
              {availableTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>
          <div className="control-block">
            <label htmlFor="tier-select">Complexity Tier</label>
            <select
              id="tier-select"
              value={activeTierId}
              onChange={(event) => setActiveTierId(event.target.value as ServiceTierId)}
            >
              {availableTiers.map((tier) => (
                <option key={tier.id} value={tier.id}>
                  {tier.name}
                </option>
              ))}
            </select>
          </div>
          <div className="control-block">
            <label htmlFor="layout-select">Product Layout</label>
            <select
              id="layout-select"
              value={activeLayoutPreset}
              onChange={(event) => setActiveLayoutPreset(event.target.value as ProductLayoutPreset)}
            >
              {PRODUCT_LAYOUT_OPTIONS.map((layout) => (
                <option key={layout.id} value={layout.id}>
                  {layout.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="hero-metrics">
          <article>
            <h4>{products.length}</h4>
            <p>Products in catalog</p>
          </article>
          <article>
            <h4>{activeTemplate.name}</h4>
            <p>Current template identity</p>
          </article>
          <article>
            <h4>{activeTier.hasAdminDashboard ? "Enabled" : "Disabled"}</h4>
            <p>Admin dashboard access</p>
          </article>
          <article>
            <h4>{PRODUCT_LAYOUT_OPTIONS.find((layout) => layout.id === activeLayoutPreset)?.label}</h4>
            <p>Current product layout</p>
          </article>
        </div>
      </section>
      {isAmazonGrid ? (
        Object.entries(productsByCategory).map(([category, categoryProducts]) => {
          return (
            <section key={category} className="category-row-block">
              <div className="category-row-header">
                <h2>{category}</h2>
                <span>{categoryProducts.length} items</span>
              </div>
              <Row className="product-grid-row amazon-category-row flex-nowrap">
                {categoryProducts.map((product) => {
                  return (
                    <Product key={product.id} product={product} />
                  );
                })}
              </Row>
            </section>
          );
        })
      ) : (
        <Row className="product-grid-row">
          {filteredProducts.map((product) => {
            return (
              <Product key={product.id} product={product} />
            );
          })}
        </Row>
      )}
    </Container>
  );
}

export default Home;