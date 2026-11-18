
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { ProductsProvider } from "./context/ProductsContext";
import { CartProvider } from "./context/CartContext";
import { OrdersProvider } from "./context/OrdersContext";
import { AuthProvider } from "./context/AuthContext";


createRoot(document.getElementById("root")).render(
  <StrictMode>
  <BrowserRouter>
  <AuthProvider>
    <ProductsProvider>
      <CartProvider>
        <OrdersProvider>
          <App />
        </OrdersProvider>
      </CartProvider>
    </ProductsProvider>
  </AuthProvider>
</BrowserRouter>
  </StrictMode>
);
