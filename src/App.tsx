import "./App.css";
import SignUp from "./veiws/Signup";
import Login from "./veiws/Login";
import Home from "./veiws/Home";
import UserAcct from "./veiws/UserAcct";
import Product from "./components/Product";
import { Routes, Route } from "react-router-dom";
import "@fontsource/roboto/400.css";
import Cart from "./components/Cart";
import AdminDashboard from "./veiws/AdminDashboard";
import StudioDesign from "./veiws/StudioDesign";
import { useStorefront } from "./contexts/StorefrontContext";

function App() {
  const { activeTier } = useStorefront();

  return (
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
  );
}

export default App;
