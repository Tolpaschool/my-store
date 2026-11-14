import { NavLink, Link, Outlet } from "react-router-dom";
import "./AdminLayout.css";

function AdminLayout() {
  return (
    <div className="admin">
      <aside className="admin-side">
        <h2 className="admin-title">⚙️ الإدارة</h2>

        <nav>
          <NavLink to="/admin" end>📊 الرئيسية</NavLink>
          <NavLink to="/admin/products">📦 المنتجات</NavLink>
          <NavLink to="/admin/orders">🧾 الطلبات</NavLink>
        </nav>

        <Link to="/" className="admin-back">← العودة للمتجر</Link>
      </aside>

      <section className="admin-content">
        <Outlet />
      </section>
    </div>
  );
}

export default AdminLayout;