import { createContext, useContext, useState, useEffect } from "react";
import initialOrders from "../data/orders";
import { toDateKey } from "../utils/date";

const OrdersContext = createContext();

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("orders");
      return saved ? JSON.parse(saved) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  function addOrder(data) {
    const id = Math.max(0, ...orders.map((o) => o.id)) + 1;

    const newOrder = {
      ...data,
      id,
      date: toDateKey(),
      status: "قيد التجهيز",
    };

    setOrders((prev) => [...prev, newOrder]);
    return id;
  }

  function updateOrderStatus(id, status) {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  }

  const value = { orders, addOrder, updateOrderStatus };

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}
// eslint-disable-next-line react-refresh/only-export-components
export function useOrders() {
  return useContext(OrdersContext);
}