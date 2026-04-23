import { Suspense, lazy } from "react";
import Home from "./veiws/Home";
import { Routes, Route } from "react-router-dom";
import { useStorefront } from "./contexts/useStorefront";

const SignUp = lazy(() => import("./veiws/Signup"));
const Login = lazy(() => import("./veiws/Login"));
const UserAcct = lazy(() => import("./veiws/UserAcct"));
const Cart = lazy(() => import("./components/Cart"));
const AdminDashboard = lazy(() => import("./veiws/AdminDashboard"));

function App() {
  // Tier data determines whether the admin surface is visible or whether the user gets bounced back to the storefront.
  const { activeTier } = useStorefront();

  return (
    <Suspense fallback={<div className="storefront-shell">Loading page...</div>}>
      <Routes>
        {/* Main storefront landing page. */}
        <Route path="/" element={<Home />} />
        {/* Core commerce and account flows. */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/user" element={<UserAcct />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* Admin only appears for tiers that include dashboard access. */}
        <Route path="/admin" element={activeTier.hasAdminDashboard ? <AdminDashboard /> : <Home />} />
        {/* Placeholder route for product detail pages. */}
        <Route
          path="/product/:id"
          element={<div className="storefront-shell">Product detail page coming soon.</div>}
        />
      </Routes>
    </Suspense>
  );
}

export default App;
