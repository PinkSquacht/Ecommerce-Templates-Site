import { Badge, Button, Tab, Tabs } from "react-bootstrap";
import { useStorefront } from "../contexts/useStorefront";

const paymentIntegrations = [
  {
    name: "Stripe",
    status: "Connected via backend",
    note: "Use webhooks for payment confirmation, refunds, and payout summaries.",
  },
  {
    name: "PayPal",
    status: "Ready for setup",
    note: "Track orders and settlement states without exposing credentials in the browser.",
  },
  {
    name: "Analytics",
    status: "Active",
    note: "Send safe event summaries to your reporting pipeline and dashboard.",
  },
];

const operationsCards = [
  {
    title: "Catalog Management",
    details: "Create, edit, duplicate, and feature products across all store templates.",
    badge: "Products",
  },
  {
    title: "Order Operations",
    details: "Review statuses, fulfillments, refunds, cancellations, and admin notes.",
    badge: "Orders",
  },
  {
    title: "Customer Oversight",
    details: "Search users, inspect purchase history, and flag support-sensitive accounts.",
    badge: "Customers",
  },
  {
    title: "Store Controls",
    details: "Switch templates, update homepage blocks, promos, and merchandising sections.",
    badge: "Templates",
  },
];

const insightCards = [
  {
    title: "Sales Overview",
    details: "Revenue, conversion, AOV, top products, and low-stock alerts.",
  },
  {
    title: "Payment Health",
    details: "Failed payments, refunds, chargebacks, and payout summaries.",
  },
  {
    title: "Activity Log",
    details: "Track admin actions, config changes, and important store events.",
  },
];

const AdminDashboard = () => {
  // Admin content stays tied to the active template so the same backend can support multiple storefront brands.
  const { activeTier, activeTemplate } = useStorefront();

  return (
    <main className="admin-shell">
      <section className="admin-header" style={{ borderColor: activeTemplate.accentColor }}>
        <div className="admin-header-top">
          <div>
            <p className="hero-eyebrow">Store Operations Center</p>
            <h1>Admin Dashboard</h1>
            <p>
              Current mode: <strong>{activeTier.name}</strong>. This page should help you run the store, not just view it.
            </p>
          </div>
          <div className="admin-header-actions">
            <Badge bg="light" text="dark" className="template-pill">
              {activeTemplate.designDirection}
            </Badge>
            <Button variant="light" className="btn-theme-outline">
              Export Report
            </Button>
            <Button variant="light" className="btn-theme-solid">
              Open Integrations
            </Button>
          </div>
        </div>
      </section>

      {/* KPI row gives a fast at-a-glance summary of store health. */}
      <section className="admin-metrics-grid">
        <article>
          <h3>Revenue</h3>
          <strong>$24.8k</strong>
          <p>Month-to-date gross sales</p>
        </article>
        <article>
          <h3>Orders</h3>
          <strong>186</strong>
          <p>Processed across active templates</p>
        </article>
        <article>
          <h3>Conversion</h3>
          <strong>3.9%</strong>
          <p>Storewide checkout conversion</p>
        </article>
        <article>
          <h3>Support Queue</h3>
          <strong>7 open</strong>
          <p>Returns, refunds, and shipping questions</p>
        </article>
      </section>

      <Tabs defaultActiveKey="operations" id="admin-tabs" className="admin-tabs mb-3" justify>
        <Tab eventKey="operations" title="Store Operations">
          <section className="admin-section-panel">
            {/* Operational tools live here: products, orders, customers, and template controls. */}
            <div className="admin-grid">
              {operationsCards.map((card) => (
                <article key={card.title}>
                  <Badge bg="light" text="dark" className="template-pill mb-2">
                    {card.badge}
                  </Badge>
                  <h3>{card.title}</h3>
                  <p>{card.details}</p>
                </article>
              ))}
            </div>

            <div className="admin-callout-grid">
              <article>
                <h3>Homepage Controls</h3>
                <p>Update hero copy, featured collections, promo banners, and seasonal sections.</p>
              </article>
              <article>
                <h3>Template Controls</h3>
                <p>Keep storefront brand identity consistent while switching style systems for clients.</p>
              </article>
            </div>
          </section>
        </Tab>

        <Tab eventKey="integrations" title="Integrations">
          <section className="admin-section-panel">
            {/* Integrations are backend-first, so payment and platform data stay safe and summarized. */}
            <div className="admin-integration-grid">
              <article className="admin-integration-card admin-integration-card--primary">
                <h3>Payment API Strategy</h3>
                <p>
                  Connect payment providers through backend APIs and webhooks, then store only safe status summaries in your admin views.
                </p>
                <ul>
                  <li>Payment confirmation events</li>
                  <li>Refund and payout summaries</li>
                  <li>Chargeback and failure alerts</li>
                </ul>
                <p className="admin-small-note">
                  Secret keys and raw card details should stay server-side.
                </p>
              </article>

              <div className="admin-integration-stack">
                {paymentIntegrations.map((integration) => (
                  <article key={integration.name} className="admin-integration-card">
                    <div className="d-flex align-items-center justify-content-between gap-2">
                      <h3 className="mb-0">{integration.name}</h3>
                      <Badge bg="light" text="dark" className="template-pill">
                        {integration.status}
                      </Badge>
                    </div>
                    <p className="mb-0">{integration.note}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="admin-callout-grid">
              <article>
                <h3>Shipping</h3>
                <p>Carrier tracking, shipment status, and delivery exceptions belong here.</p>
              </article>
              <article>
                <h3>Email & CRM</h3>
                <p>Automations for abandoned carts, receipts, and customer lifecycle messaging.</p>
              </article>
              <article>
                <h3>Webhooks</h3>
                <p>Monitor incoming events so order state stays in sync with external services.</p>
              </article>
            </div>
          </section>
        </Tab>

        <Tab eventKey="insights" title="Insights">
          <section className="admin-section-panel">
            {/* Reporting turns the admin page into a real decision-making surface for clients. */}
            <div className="admin-grid admin-grid--insights">
              {insightCards.map((card) => (
                <article key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.details}</p>
                </article>
              ))}
            </div>

            <div className="admin-log-panel">
              <div className="admin-log-header">
                <h3>Recent Activity</h3>
                <Badge bg="light" text="dark" className="template-pill">
                  Live Feed
                </Badge>
              </div>
              <ul>
                <li>Template switched to {activeTemplate.name}</li>
                <li>Payment webhook processed successfully</li>
                <li>3 products flagged for review</li>
                <li>1 refund request awaiting approval</li>
              </ul>
            </div>
          </section>
        </Tab>
      </Tabs>
    </main>
  );
};

export default AdminDashboard;
