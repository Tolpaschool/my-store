import { createContext, useContext, useState, useEffect } from "react";
import { useProducts } from "./ProductsContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { products } = useProducts();

  const [lines, setLines] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("cart"));
      return Array.isArray(saved)
        ? saved.map(({ id, quantity }) => ({ id, quantity }))
        : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(lines));
  }, [lines]);

  const cartItems = lines
    .map((line) => {
      const product = products.find((p) => p.id === line.id);
      if (!product || product.stock === 0) return null;
      return { ...product, quantity: Math.min(line.quantity, product.stock) };
    })
    .filter(Boolean);

  function addToCart(product, quantity = 1) {
    setLines((prev) => {
      const existing = prev.find((l) => l.id === product.id);

      if (existing) {
        return prev.map((l) =>
          l.id === product.id
            ? { ...l, quantity: Math.min(l.quantity + quantity, product.stock) }
            : l
        );
      }

      return [...prev, { id: product.id, quantity: Math.min(quantity, product.stock) }];
    });
  }

  function removeFromCart(id) {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }

  function updateQuantity(id, quantity) {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    setLines((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, quantity: Math.max(1, Math.min(quantity, product.stock)) }
          : l
      )
    );
  }

  function clearCart() {
    setLines([]);
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  return useContext(CartContext);
}