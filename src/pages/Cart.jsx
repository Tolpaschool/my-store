import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  const shipping = totalPrice > 500 || totalPrice === 0 ? 0 : 25;

  if (cartItems.length === 0) {
    return (
      <main className="container">
        <p className="empty">سلتك فارغة 🛒</p>
        <div style={{ textAlign: "center" }}>
          <Link to="/" className="back-link">تصفح المنتجات</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <h2 className="section-title">سلة المشتريات</h2>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-row" key={item.id}>
              <div className="cart-thumb" style={{ background: item.color }}>
                {item.emoji}
              </div>

              <div className="cart-name">
                <Link to={`/product/${item.id}`}>{item.name}</Link>
                <p>{item.price} ر.س</p>
              </div>

              <div className="qty">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>

              <p className="cart-line-total">{item.price * item.quantity} ر.س</p>

              <button className="cart-remove" onClick={() => removeFromCart(item.id)}>
                🗑️
              </button>
            </div>
          ))}
        </div>

        <aside className="summary">
          <h3>ملخص الطلب</h3>
          <div><span>المجموع</span><span>{totalPrice} ر.س</span></div>
          <div><span>الشحن</span><span>{shipping === 0 ? "مجاني" : `${shipping} ر.س`}</span></div>
          <div className="summary-total">
            <span>الإجمالي</span>
            <span>{totalPrice + shipping} ر.س</span>
          </div>
          <button className="details-btn" style={{ width: "100%" }}>إتمام الطلب</button>
          <button className="clear-btn" onClick={clearCart}>تفريغ السلة</button>
        </aside>
      </div>
    </main>
  );
}

export default Cart;