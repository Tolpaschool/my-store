import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";
import { useProducts } from "../context/ProductsContext";
import Field from "../components/Field";
import { getShipping } from "../utils/pricing";
import { paymentLabels } from "../utils/status";
import "../components/ProductForm.css";
import "./Checkout.css";

const emptyForm = { name: "", phone: "", city: "", address: "", payment: "cash" };

function validate(values) {
  const errors = {};

  if (values.name.trim().length < 3) errors.name = "الاسم لا يقل عن 3 أحرف";
  if (!/^05\d{8}$/.test(values.phone)) {
    errors.phone = "رقم الجوال يبدأ بـ 05 ويتكون من 10 أرقام";
  }
  if (!values.city.trim()) errors.city = "المدينة مطلوبة";
  if (values.address.trim().length < 8) errors.address = "اكتب عنواناً أوضح (8 أحرف على الأقل)";

  return errors;
}

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { updateProduct } = useProducts();
  const navigate = useNavigate();

  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  if (cartItems.length === 0) {
    return (
      <main className="container">
        <p className="empty">لا توجد منتجات في السلة.</p>
        <div style={{ textAlign: "center" }}>
          <Link to="/" className="back-link">تصفح المنتجات</Link>
        </div>
      </main>
    );
  }

  const shipping = getShipping(totalPrice);
  const total = totalPrice + shipping;

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const foundErrors = validate(values);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return;

    const orderId = addOrder({
      customer: values.name.trim(),
      phone: values.phone,
      city: values.city.trim(),
      address: values.address.trim(),
      payment: values.payment,
      total,
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        emoji: item.emoji,
        price: item.price,
        quantity: item.quantity,
      })),
    });

    cartItems.forEach((item) => {
      updateProduct(item.id, { stock: item.stock - item.quantity });
    });

    clearCart();
    navigate(`/order-success/${orderId}`);
  }

  return (
    <main className="container">
      <h2 className="section-title">إتمام الطلب</h2>

      <div className="checkout">
        <form className="form" onSubmit={handleSubmit} noValidate>
          <Field label="الاسم الكامل" error={errors.name}>
            <input name="name" value={values.name} onChange={handleChange} />
          </Field>

          <Field label="رقم الجوال" error={errors.phone}>
            <input name="phone" inputMode="numeric" placeholder="05xxxxxxxx" value={values.phone} onChange={handleChange} />
          </Field>

          <div className="form-row">
            <Field label="المدينة" error={errors.city}>
              <input name="city" value={values.city} onChange={handleChange} />
            </Field>
            <Field label="طريقة الدفع">
              <select name="payment" value={values.payment} onChange={handleChange}>
                {Object.entries(paymentLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="العنوان بالتفصيل" error={errors.address}>
            <textarea name="address" rows="3" value={values.address} onChange={handleChange} />
          </Field>

          <button type="submit" className="details-btn">تأكيد الطلب</button>
        </form>

        <aside className="summary">
          <h3>ملخص الطلب</h3>
          {cartItems.map((item) => (
            <div key={item.id}>
              <span>{item.emoji} {item.name} × {item.quantity}</span>
              <span>{item.price * item.quantity} ر.س</span>
            </div>
          ))}
          <div><span>الشحن</span><span>{shipping === 0 ? "مجاني" : `${shipping} ر.س`}</span></div>
          <div className="summary-total"><span>الإجمالي</span><span>{total} ر.س</span></div>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;