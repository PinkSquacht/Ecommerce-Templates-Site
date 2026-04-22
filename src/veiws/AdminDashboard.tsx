import { useStorefront } from "../contexts/StorefrontContext";

const AdminDashboard = () => {
  const { activeTier, activeTemplate } = useStorefront();

  return (
    <main className="admin-shell">
      <section className="admin-header" style={{ borderColor: activeTemplate.accentColor }}>
        <h1>Admin Dashboard</h1>
        <p>
          This dashboard is enabled by tier configuration and is currently running in
          <strong> {activeTier.name}</strong> mode.
        </p>
      </section>
      <section className="admin-grid">
        <article>
          <h3>Catalog Management</h3>
          <p>Product CRUD controls are planned for this panel.</p>
        </article>
        <article>
          <h3>Order Operations</h3>
          <p>Order queue and status transitions will live here.</p>
        </article>
        <article>
          <h3>Reporting</h3>
          <p>
            {activeTier.hasAdvancedReporting
              ? "Advanced reports are enabled for this tier."
              : "Basic reporting mode is active for this tier."}
          </p>
        </article>
      </section>
    </main>
  );
};

export default AdminDashboard;
