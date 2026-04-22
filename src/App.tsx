import "./App.css";
import { Suspense, lazy } from "react";
import Home from "./veiws/Home";
import Product from "./components/Product";
import { Routes, Route } from "react-router-dom";
import { useStorefront } from "./contexts/StorefrontContext";

const SignUp = lazy(() => import("./veiws/Signup"));
const Login = lazy(() => import("./veiws/Login"));
const UserAcct = lazy(() => import("./veiws/UserAcct"));
const Cart = lazy(() => import("./components/Cart"));
const AdminDashboard = lazy(() => import("./veiws/AdminDashboard"));
const StudioDesign = lazy(() => import("./veiws/StudioDesign"));

function App() {
  const { activeTier } = useStorefront();

  return (
    <Suspense fallback={<div className="storefront-shell">Loading page...</div>}>
      <Routes>
        {/* Template-driven landing and catalog experience. */}
        <Route path="/" element={<Home />} />
        {/* Commerce and account flows. */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/user" element={<UserAcct />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={activeTier.hasAdminDashboard ? <AdminDashboard /> : <Home />} />
        <Route path="/studio" element={<StudioDesign />} />
        {/* Dedicated product route placeholder for future PDP work. */}
        <Route path="/product/:id" element={<Product product={null} />} />
      </Routes>
    </Suspense>
  );
}

export default App;
