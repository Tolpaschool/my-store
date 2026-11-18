import StatCard from "../../components/StatCard";
import { useProducts } from "../../context/ProductsContext";
import { statusClass } from "../../utils/status";
import { useOrders } from "../../context/OrdersContext";
import SalesChart from "../../components/SalesChart";
import { toDateKey } from "../../utils/date";
import "./Admin.css";

function Dashboard() {
  const { products } = useProducts();
  const { orders } = useOrders();

  const validOrders = orders.filter((o) => o.status !== "ملغي");

  const totalSales = validOrders.reduce((sum, o) => sum + o.total, 0);

  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length;

  const salesByDay = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const key = toDateKey(date);

    return {
      day: date.toLocaleDateString("ar", { weekday: "short" }),
      sales: validOrders
        .filter((o) => o.date === key)
        .reduce((sum, o) => sum + o.total, 0),
    };
  });

  const recentOrders = orders.slice(-5).reverse();

  return (
    <>
      <h1 className="page-title">لوحة المعلومات</h1>

      <div className="stats">
        <StatCard
          title="إجمالي المبيعات"
          value={`${totalSales} ر.س`}
          icon="💰"
        />
        <StatCard title="عدد الطلبات" value={orders.length} icon="🧾" />
        <StatCard title="عدد المنتجات" value={products.length} icon="📦" />
        <StatCard title="مخزون منخفض" value={lowStock} icon="⚠️" />
      </div>

      <div className="panel">
        <h3>المبيعات خلال الأسبوع</h3>
        <div className="panel">
          <h3>المبيعات آخر 7 أيام</h3>
          <SalesChart data={salesByDay} />
        </div>
      </div>

      <div className="panel">
        <h3>آخر الطلبات</h3>
        <table className="table">
          <thead>
            <tr>
              <th>رقم الطلب</th>
              <th>العميل</th>
              <th>المبلغ</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((o) => (
              <tr key={o.id}>
                <td>#{o.id}</td>
                <td>{o.customer}</td>
                <td>{o.total} ر.س</td>
                <td>
                  <span className={`tag ${statusClass[o.status]}`}>
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Dashboard;
