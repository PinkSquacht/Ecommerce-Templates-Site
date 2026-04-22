import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./design/bootstrap-studio/css/studio-overrides.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import ProductProvider from "./contexts/ProductContext.tsx";
import { CartProvider } from "./contexts/CartContext.tsx";
import { StorefrontProvider } from "./contexts/StorefrontContext.tsx";

// Root provider stack:
// 1) Cart state shared across app routes.
// 2) Storefront template context for branding/category strategy.
// 3) Product context that fetches based on active storefront.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <CartProvider>
    <StorefrontProvider>
      <ProductProvider>
        <BrowserRouter>
          <Navbar />
          <App />
        </BrowserRouter>
      </ProductProvider>
    </StorefrontProvider>
  </CartProvider>
);
