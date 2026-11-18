import { createContext, useContext, useState, useEffect } from "react";

const ProductsContext = createContext();

const COLORS = [
  "linear-gradient(135deg,#e0e7ff,#c7d2fe)",
  "linear-gradient(135deg,#fce7f3,#fbcfe8)",
  "linear-gradient(135deg,#dcfce7,#bbf7d0)",
  "linear-gradient(135deg,#fef3c7,#fde68a)",
  "linear-gradient(135deg,#e0f2fe,#bae6fd)",
];

function readSaved() {
  try {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function ProductsProvider({ children }) {
  const [saved] = useState(readSaved);
  const [products, setProducts] = useState(saved ?? []);
  const [status, setStatus] = useState(saved ? "ready" : "loading");

  useEffect(() => {
    if (status !== "loading") return;

    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/products.json");
        if (!response.ok) throw new Error("Bad response");

        const data = await response.json();

        if (!cancelled) {
          setProducts(data);
          setStatus("ready");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [status]);

  useEffect(() => {
    if (status === "ready") {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products, status]);

  function addProduct(data) {
    const newProduct = {
      ...data,
      id: Date.now(),
      color: COLORS[products.length % COLORS.length],
    };
    setProducts((prev) => [...prev, newProduct]);
  }

  function updateProduct(id, data) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  }

  function deleteProduct(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  function reload() {
    setStatus("loading");
  }

  function resetProducts() {
    localStorage.removeItem("products");
    setStatus("loading");
  }

  const value = {
    products,
    status,
    reload,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProducts,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useProducts() {
  return useContext(ProductsContext);
}