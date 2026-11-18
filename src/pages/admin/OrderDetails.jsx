import { useParams, Link } from "react-router-dom";
import { useOrders } from "../../context/OrdersContext";
import { statusClass, orderStatuses, paymentLabels } from "../../utils/status";
import "./Admin.css";

function OrderDetails() {
  const { id } = useParams();
  const { orders, updateOrderStatus } = useOrders();

  const order = orders.find((o) => o.id === Number(id));

  if (!order) {
    return (
      <>
        <p className="empty">هذا الطلب غير موجود.</p>
        <Link to="/admin/orders" className="back-link">العودة للطلبات</Link>
      </>
    );
  }

  const items = order.items ?? [];

  return (
    <>
      <Link to="/admin/orders" className="back-link">← رجوع للطلبات</Link>
      <h1 className="page-title">طلب #{order.id}</h1>

      <div className="panel">
        <h3>بيانات العميل</h3>
        <div className="info-grid">
          <p><span>الاسم</span>{order.customer}</p>
          <p><span>الجوال</span>{order.phone ?? "غير متوفر"}</p>
          <p><span>المدينة</span>{order.city ?? "غير متوفر"}</p>
          <p><span>العنوان</span>{order.address ?? "غير متوفر"}</p>
          <p><span>طريقة الدفع</span>{paymentLabels[order.payment] ?? "غير محدد"}</p>
          <p><span>التاريخ</span>{order.date}</p>
        </div>
      </div>

      <div className="panel">
        <h3>المنتجات</h3>

        {items.length === 0 ? (
          <p className="empty">لا تتوفر تفاصيل المنتجات لهذا الطلب.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>المنتج</th>
                <th>السعر</th>
                <th>الكمية</th>
                <th>المجموع</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.emoji} {item.name}</td>
                  <td>{item.price} ر.س</td>
                  <td>{item.quantity}</td>
                  <td>{item.price * item.quantity} ر.س</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <p className="results-count" style={{ marginTop: 16 }}>
          الإجمالي شامل الشحن: <strong>{order.total} ر.س</strong>
        </p>
      </div>

      <div className="panel">
        <h3>حالة الطلب</h3>
        <div className="status-row">
          <span className={`tag ${statusClass[order.status]}`}>{order.status}</span>
          <select
            className="status-select"
            value={order.status}
            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
          >
            {orderStatuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;