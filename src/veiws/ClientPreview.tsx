import { useContext } from "react";
import { Badge, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import { useStorefront } from "../contexts/useStorefront";

const ClientPreview = () => {
  // This page is the client-facing presentation view: clean, public, and easy to demo.
  const products = useContext(ProductContext);
  const { activeTemplate, activeTemplateId, availableTemplates, setActiveTemplateId } = useStorefront();

  const previewProducts = products
    .filter((product) => activeTemplate.featuredCategories.includes(product.category))
    .slice(0, 6);

  const renderPreviewLayout = () => {
    switch (activeTemplate.previewLayout) {
      case "editorial-split":
        return (
          <section className="client-preview-layout client-preview-layout--editorial">
            <div className="client-preview-feature-panel client-preview-feature-panel--tall">
              <p className="hero-eyebrow">Editorial storytelling</p>
              <h2>Big type, generous whitespace, and a stronger brand narrative.</h2>
              <p>
                This layout makes the store feel like a premium magazine spread instead of a standard catalog.
              </p>
            </div>
            <div className="client-preview-feature-panel">
              <p className="hero-eyebrow">Structure</p>
              <ul>
                <li>Large hero area</li>
                <li>Two-column story blocks</li>
                <li>Wide featured products</li>
              </ul>
            </div>
          </section>
        );
      case "luxury-minimal":
        return (
          <section className="client-preview-layout client-preview-layout--luxury">
            <div className="client-preview-luxury-banner">
              <p className="hero-eyebrow">Quiet luxury</p>
              <h2>Neutral, calm, and expensive-feeling without visual clutter.</h2>
            </div>
            <div className="client-preview-feature-panel">
              <p>Minimal text, confident hierarchy, and soft surfaces keep attention on the product.</p>
            </div>
          </section>
        );
      case "shelf-panels":
        return (
          <section className="client-preview-layout client-preview-layout--shelf">
            <div className="client-preview-shelf-panels">
              <article>
                <p className="hero-eyebrow">Category browsing</p>
                <h2>Built like a store aisle, not a brochure.</h2>
              </article>
              <article>
                <p className="hero-eyebrow">Quick scanning</p>
                <h2>Horizontal shelves and fast category jumps.</h2>
              </article>
            </div>
          </section>
        );
      case "motion-stages":
        return (
          <section className="client-preview-layout client-preview-layout--motion">
            <div className="client-preview-motion-stack">
              <article>Stage 1 - Hero reveal</article>
              <article>Stage 2 - Section fade</article>
              <article>Stage 3 - Product hover emphasis</article>
            </div>
          </section>
        );
      case "trust-dashboard":
        return (
          <section className="client-preview-layout client-preview-layout--trust">
            <div className="client-preview-trust-grid">
              <article>
                <h3>Rating</h3>
                <strong>4.8/5</strong>
              </article>
              <article>
                <h3>Shipping</h3>
                <strong>2-5 days</strong>
              </article>
              <article>
                <h3>Returns</h3>
                <strong>30 days</strong>
              </article>
            </div>
          </section>
        );
      case "mobile-stack":
        return (
          <section className="client-preview-layout client-preview-layout--mobile">
            <div className="client-preview-mobile-stack">
              <article>Thumb-friendly actions first</article>
              <article>Compact sections for small screens</article>
              <article>Sticky CTA-ready product cards</article>
            </div>
          </section>
        );
      case "proof-overlay":
        return (
          <section className="client-preview-layout client-preview-layout--proof">
            <div className="client-preview-proof-overlay">
              <article>
                <h3>Social proof</h3>
                <p>Ratings, returns, and shipping info are pushed close to the action.</p>
              </article>
              <article>
                <h3>Purchase confidence</h3>
                <p>Clear reassurance blocks help reduce hesitation before checkout.</p>
              </article>
            </div>
          </section>
        );
      case "personalized-rail":
        return (
          <section className="client-preview-layout client-preview-layout--personalized">
            <div className="client-preview-personalized-rail">
              <article>
                <p className="hero-eyebrow">Recommended for you</p>
                <h2>Merchandising that adapts to the shopper's path.</h2>
              </article>
              <article>
                <p className="hero-eyebrow">Top picks</p>
                <h2>Context-aware blocks keep the catalog feeling relevant.</h2>
              </article>
            </div>
          </section>
        );
      case "system-kit":
        return (
          <section className="client-preview-layout client-preview-layout--system">
            <div className="client-preview-system-kit">
              <article>
                <h3>Tokens</h3>
                <p>Color, spacing, and type scale are controlled centrally.</p>
              </article>
              <article>
                <h3>Components</h3>
                <p>Reusable sections can be swapped between client brands.</p>
              </article>
              <article>
                <h3>Consistency</h3>
                <p>Every template stays on-brand without rewriting the whole app.</p>
              </article>
            </div>
          </section>
        );
      case "performance-strip":
        return (
          <section className="client-preview-layout client-preview-layout--performance">
            <div className="client-preview-performance-strip">
              <article>
                <h3>Fast load</h3>
                <p>Compact visual weight and lean presentation reduce perceived lag.</p>
              </article>
              <article>
                <h3>Quick decisions</h3>
                <p>Simple hierarchy and sharper CTA placement move shoppers faster.</p>
              </article>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <main className="client-preview-shell">
      <Container>
        <section className="client-preview-hero" style={{ borderColor: activeTemplate.accentColor }}>
          {/* The hero leads with the active template identity so the client sees the direction immediately. */}
          <div className="client-preview-hero-copy">
            <p className="hero-eyebrow">Client Presentation Mode</p>
            <h1>{activeTemplate.heroHeading}</h1>
            <p className="hero-subtitle">{activeTemplate.heroSubheading}</p>
            <p className="hero-subtitle">
              This is the version you can show clients: a clean, public-facing snapshot of the selected template.
            </p>
            <div className="client-preview-actions">
              <Link to="/" className="text-decoration-none">
                <Button className="btn-theme-solid" variant="light">
                  Open Store
                </Button>
              </Link>
              <Link to="/admin" className="text-decoration-none">
                <Button className="btn-theme-outline" variant="light">
                  Open Admin
                </Button>
              </Link>
            </div>
          </div>
          <div className="client-preview-hero-panel">
            {/* This side panel is a concise summary of the template's visual language. */}
            <h2>{activeTemplate.name}</h2>
            <p>{activeTemplate.designDirection}</p>
            <div className="template-pill-row">
              {activeTemplate.templateHighlights.map((highlight) => (
                <Badge key={highlight} bg="light" text="dark" className="template-pill">
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        <section className="client-preview-switcher">
          {/* Letting the client swap templates in place turns this page into a live design demo. */}
          <div>
            <p className="hero-eyebrow mb-2">Template switcher</p>
            <h2>Show different design directions</h2>
            <p>Pick a template and let the client see how the same store behaves with a different identity.</p>
          </div>
          <div className="control-block client-preview-control">
            <label htmlFor="preview-template-select">Preview Template</label>
            <select
              id="preview-template-select"
              value={activeTemplateId}
              onChange={(event) => setActiveTemplateId(event.target.value as typeof activeTemplateId)}
            >
              {availableTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name} - {template.designDirection}
                </option>
              ))}
            </select>
          </div>
        </section>

        {renderPreviewLayout()}

        <section className="client-preview-proof-grid">
          {/* Proof blocks translate the design system into language clients care about. */}
          <article>
            <h3>Brand Tone</h3>
            <p>{activeTemplate.tagline}</p>
          </article>
          <article>
            <h3>Trust Signals</h3>
            <p>{activeTemplate.proofSignals.join(" • ")}</p>
          </article>
          <article>
            <h3>Design Direction</h3>
            <p>{activeTemplate.designDirection}</p>
          </article>
        </section>

        <section className="client-preview-gallery">
          {/* The product gallery shows how the template behaves with real catalog content. */}
          <div className="client-preview-gallery-header">
            <div>
              <p className="hero-eyebrow mb-2">Storefront snapshot</p>
              <h2>What the live store feels like</h2>
            </div>
            <p>
              A quick view of featured products and the visual language clients will experience.
            </p>
          </div>
          <Row className="g-3">
            {previewProducts.map((product) => (
              <Col key={product.id} md={6} xl={4}>
                <Card className={`client-preview-card storefront-product-card storefront-product-card--${activeTemplate.productCardStyle}`}>
                  <Card.Img src={product.image} alt={product.title} className="client-preview-card-image" />
                  <Card.Body>
                    <Card.Title className="storefront-product-title">{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text>
                      <strong>Price:</strong> ${product.price}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </main>
  );
};

export default ClientPreview;