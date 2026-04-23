import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Product from "../components/Product";
import { Badge, Container, Row } from "react-bootstrap";
import { useStorefront } from "../contexts/useStorefront";
import type { StoreTemplateId } from "../config/storeTemplates.ts";
import type { ServiceTierId } from "../config/serviceTiers";

// Home is template-driven: branding copy + category strategy are derived from active template.
const Home = () => {
  // This screen is the live storefront, so it reacts to the active template and catalog data.
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
  } = useStorefront();

  // Filter the catalog down to only the categories that make sense for the active template.
  const filteredProducts = products.filter((item) => {
    return activeTemplate.featuredCategories.includes(item.category);
  });

  // Group products into category shelves for the discovery-heavy storefront layout.
  const productsByCategory = filteredProducts.reduce<Record<string, typeof filteredProducts>>((acc, product) => {
    const category = product.category || "uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  const categoryEntries = Object.entries(productsByCategory);

  const renderTemplateIntro = () => {
    // The intro block changes with the template so the top of the page feels like a different design system.
    switch (activeTemplate.previewLayout) {
      case "editorial-split":
        return (
          <section className="template-story-strip template-story-strip--editorial">
            <div>
              <p className="hero-eyebrow">Editorial system</p>
              <h2>Spacious, brand-forward layouts with a stronger narrative.</h2>
            </div>
            <p>Best for clients who want the store to feel premium and content-led.</p>
          </section>
        );
      case "luxury-minimal":
        return (
          <section className="template-story-strip template-story-strip--luxury">
            <div>
              <p className="hero-eyebrow">Quiet luxury</p>
              <h2>Calm surfaces, neutral tones, and a more restrained layout.</h2>
            </div>
            <p>Best when the client wants a high-end, minimal presentation.</p>
          </section>
        );
      case "shelf-panels":
        return (
          <section className="template-story-strip template-story-strip--shelf">
            <div>
              <p className="hero-eyebrow">Shelf browsing</p>
              <h2>Discovery-first product rows and fast category scanning.</h2>
            </div>
            <p>Best for catalogs where customers compare multiple items quickly.</p>
          </section>
        );
      case "motion-stages":
        return (
          <section className="template-story-strip template-story-strip--motion">
            <div>
              <p className="hero-eyebrow">Motion layer</p>
              <h2>Staged sections that feel animated without being distracting.</h2>
            </div>
            <p>Best for a more interactive, modern showcase.</p>
          </section>
        );
      case "trust-dashboard":
        return (
          <section className="template-story-strip template-story-strip--trust">
            <div>
              <p className="hero-eyebrow">Trust system</p>
              <h2>Clear reassurance blocks and purchase confidence cues.</h2>
            </div>
            <p>Best for stores where conversion clarity matters most.</p>
          </section>
        );
      case "mobile-stack":
        return (
          <section className="template-story-strip template-story-strip--mobile">
            <div>
              <p className="hero-eyebrow">Mobile first</p>
              <h2>Tighter spacing and simplified sections for smaller screens.</h2>
            </div>
            <p>Best when most buyers are shopping on phones.</p>
          </section>
        );
      case "proof-overlay":
        return (
          <section className="template-story-strip template-story-strip--proof">
            <div>
              <p className="hero-eyebrow">Proof stack</p>
              <h2>Ratings, shipping, and returns are part of the layout, not an afterthought.</h2>
            </div>
            <p>Best for reducing hesitation right before checkout.</p>
          </section>
        );
      case "personalized-rail":
        return (
          <section className="template-story-strip template-story-strip--personalized">
            <div>
              <p className="hero-eyebrow">Personalized merchandising</p>
              <h2>Recommended-for-you and top-pick style rails.</h2>
            </div>
            <p>Best for clients who want the store to feel more curated.</p>
          </section>
        );
      case "system-kit":
        return (
          <section className="template-story-strip template-story-strip--system">
            <div>
              <p className="hero-eyebrow">Design system</p>
              <h2>Token-driven branding that is easy to reuse and hand off.</h2>
            </div>
            <p>Best when you want a scalable client-ready foundation.</p>
          </section>
        );
      case "performance-strip":
        return (
          <section className="template-story-strip template-story-strip--performance">
            <div>
              <p className="hero-eyebrow">Performance first</p>
              <h2>Compact sections and lighter visual weight for a faster feel.</h2>
            </div>
            <p>Best for a clean, efficient shopping experience.</p>
          </section>
        );
      default:
        return null;
    }
  };

  const renderCategorySection = ([category, categoryProducts]: [string, typeof filteredProducts], index: number) => {
    // Each template gets a different product section layout so the storefront composition feels unique.
    const leadProduct = categoryProducts[0];
    const shelfProducts = categoryProducts.slice(0, activeTemplate.previewLayout === "shelf-panels" ? 4 : 3);

    if (activeTemplate.previewLayout === "editorial-split") {
      return (
        <section key={category} className="category-row-block category-row-block--editorial">
          <div className="category-row-header">
            <h2>{category}</h2>
            <span>{categoryProducts.length} items</span>
          </div>
          <div className="editorial-category-layout">
            {leadProduct ? (
              <div className="editorial-feature-card">
                <Product product={leadProduct} />
              </div>
            ) : null}
            <div className="editorial-category-list">
              {shelfProducts.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (activeTemplate.previewLayout === "luxury-minimal") {
      return (
        <section key={category} className="category-row-block category-row-block--luxury">
          <div className="category-row-header">
            <h2>{category}</h2>
            <span>{categoryProducts.length} curated items</span>
          </div>
          <Row className="product-grid-row luxury-grid-row g-3">
            {shelfProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </Row>
        </section>
      );
    }

    if (activeTemplate.previewLayout === "motion-stages") {
      return (
        <section key={category} className={`category-row-block category-row-block--motion category-row-block--motion-${index % 2}`}>
          <div className="category-row-header">
            <h2>{category}</h2>
            <span>{categoryProducts.length} items</span>
          </div>
          <Row className="product-grid-row motion-grid-row g-3">
            {shelfProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </Row>
        </section>
      );
    }

    if (activeTemplate.previewLayout === "trust-dashboard") {
      return (
        <section key={category} className="category-row-block category-row-block--trust">
          <div className="category-row-header">
            <h2>{category}</h2>
            <span>Trust-first display</span>
          </div>
          <div className="trust-layout-grid">
            {shelfProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </section>
      );
    }

    if (activeTemplate.previewLayout === "mobile-stack") {
      return (
        <section key={category} className="category-row-block category-row-block--mobile">
          <div className="category-row-header">
            <h2>{category}</h2>
            <span>Thumb-friendly stack</span>
          </div>
          <div className="mobile-stack-list">
            {shelfProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </section>
      );
    }

    if (activeTemplate.previewLayout === "proof-overlay") {
      return (
        <section key={category} className="category-row-block category-row-block--proof">
          <div className="category-row-header">
            <h2>{category}</h2>
            <span>Proof near the CTA</span>
          </div>
          <div className="proof-layout-grid">
            {shelfProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </section>
      );
    }

    if (activeTemplate.previewLayout === "personalized-rail") {
      return (
        <section key={category} className="category-row-block category-row-block--personalized">
          <div className="category-row-header">
            <h2>{category}</h2>
            <span>Recommended for this shopper</span>
          </div>
          <div className="personalized-rail-wrap">
            {shelfProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </section>
      );
    }

    if (activeTemplate.previewLayout === "system-kit") {
      return (
        <section key={category} className="category-row-block category-row-block--system">
          <div className="category-row-header">
            <h2>{category}</h2>
            <span>Reusable component set</span>
          </div>
          <Row className="product-grid-row system-grid-row g-3">
            {shelfProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </Row>
        </section>
      );
    }

    if (activeTemplate.previewLayout === "performance-strip") {
      return (
        <section key={category} className="category-row-block category-row-block--performance">
          <div className="category-row-header">
            <h2>{category}</h2>
            <span>Fast scan strip</span>
          </div>
          <div className="performance-strip-list">
            {shelfProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </section>
      );
    }

    return (
      <section key={category} className="category-row-block">
        <div className="category-row-header">
          <h2>{category}</h2>
          <span>{categoryProducts.length} items</span>
        </div>
        <Row className="product-grid-row amazon-category-row flex-nowrap">
          {categoryProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </Row>
      </section>
    );
  };

  return (
    <Container className="storefront-shell">
      <section className="hero-panel" style={{ borderColor: activeTemplate.accentColor }}>
        {/* Hero panel: this is the first thing a client sees when they open the store. */}
        <p className="hero-eyebrow">Client-Ready Storefront Engine</p>
        <h1>{activeTemplate.heroHeading}</h1>
        <p className="hero-subtitle">{activeTemplate.heroSubheading}</p>
        <p className="hero-subtitle">
          Design direction: <strong>{activeTemplate.designDirection}</strong> - {activeTemplate.tagline}
        </p>
        <p className="tier-summary">
          Active tier: <strong>{activeTier.name}</strong> - {activeTier.summary}
        </p>
        <div className="control-grid control-grid--template-only">
          <div className="control-block">
            <label htmlFor="template-select">Store Template</label>
            <select
              id="template-select"
              value={activeTemplateId}
              onChange={(event) => setActiveTemplateId(event.target.value as StoreTemplateId)}
            >
              {availableTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name} - {template.designDirection}
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
        </div>
        <div className="template-pill-row">
          {/* Quick highlights make the design direction easy to explain in a sales conversation. */}
          {activeTemplate.templateHighlights.map((highlight) => (
            <Badge key={highlight} bg="light" text="dark" className="template-pill">
              {highlight}
            </Badge>
          ))}
        </div>
        <div className="template-proof-row">
          {/* These are trust cues that support the visual pitch of the template. */}
          {activeTemplate.proofSignals.map((signal) => (
            <div key={signal} className="template-proof-chip">
              {signal}
            </div>
          ))}
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
            <h4>{activeTemplate.productCardStyle}</h4>
            <p>Product card style</p>
          </article>
        </div>
      </section>
      <section className="template-story-strip">
        {renderTemplateIntro()}
      </section>
      <section className="catalog-intro-grid">
        {/* These cards explain the template in plain language for the client. */}
        <article>
          <h3>Merchandising tone</h3>
          <p>{activeTemplate.tagline}</p>
        </article>
        <article>
          <h3>Brand feel</h3>
          <p>{activeTemplate.designDirection}</p>
        </article>
        <article>
          <h3>Purchase guidance</h3>
          <p>{activeTemplate.proofSignals[0]}</p>
        </article>
      </section>
      {categoryEntries.map((entry, index) => renderCategorySection(entry, index))}
    </Container>
  );
}

export default Home;