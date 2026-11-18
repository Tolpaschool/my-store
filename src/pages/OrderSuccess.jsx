import { useParams, Link } from "react-router-dom";
import { useOrders } from "../context/OrdersContext";
import { paymentLabels } from "../utils/status";

function OrderSuccess() {
  const { id } = useParams();
  const { orders } = useOrders();

  const order = orders.find((o) => o.id === Number(id));

  if (!order) {
    return (
      <main className="container notfound">
        <p>لم نجد هذا الطلب.</p>
        <Link to="/" className="back-link">العودة للمتجر</Link>
      </main>
    );
  }

  return (
    <main className="container notfound">
      <h1 style={{ fontSize: 64 }}>✅</h1>
      <h2 className="section-title">تم استلام طلبك بنجاح</h2>
      <p>رقم الطلب: <strong>#{order.id}</strong></p>
      <p>الإجمالي: {order.total} ر.س ({paymentLabels[order.payment]})</p>
      <p>سنتواصل معك على {order.phone} لتأكيد التوصيل.</p>
      <Link to="/" className="back-link" style={{ marginTop: 20 }}>متابعة التسوق</Link>
    </main>
  );
}

export default OrderSuccess;