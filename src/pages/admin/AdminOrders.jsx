import { useState } from "react";
import { useOrders } from "../../context/OrdersContext";
import CategoryFilter from "../../components/CategoryFilter";
import { statusClass, orderStatuses } from "../../utils/status";
import "./Admin.css";
import { Link } from "react-router-dom" ;

function AdminOrders() {
  const { orders, updateOrderStatus } = useOrders();
  const [status, setStatus] = useState("الكل");

  const visible =
    status === "الكل" ? orders : orders.filter((o) => o.status === status);

  const total = visible.reduce((sum, o) => sum + o.total, 0);

  return (
    <>
      <h1 className="page-title">الطلبات</h1>

      <CategoryFilter
        categories={["الكل", ...orderStatuses]}
        selected={status}
        onSelect={setStatus}
      />

      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>رقم الطلب</th>
              <th>العميل</th>
              <th>التاريخ</th>
              <th>المبلغ</th>
              <th>الحالة</th>
              <th>تغيير الحالة</th>
            </tr>
          </thead>
          <tbody>
            {[...visible].reverse().map((o) => (
              <tr key={o.id}>
                <td><Link className="order-link" to={`/admin/orders/${o.id}`}>#{o.id}</Link></td>
                <td>{o.customer}</td>
                <td>{o.date}</td>
                <td>{o.total} ر.س</td>
                <td>
                  <span className={`tag ${statusClass[o.status]}`}>
                    {o.status}
                  </span>
                </td>
                <td>
                  <select
                    className="status-select"
                    value={o.status}
                    onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                  >
                    {orderStatuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {visible.length === 0 && <p className="empty">لا توجد طلبات.</p>}
      </div>

      <p className="results-count">
        {visible.length} طلب، بإجمالي {total} ر.س
      </p>
    </>
  );
}

export default AdminOrders;
