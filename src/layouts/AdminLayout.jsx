import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";import "./AdminLayout.css";


function AdminLayout() {

  const { logout } = useAuth();
const navigate = useNavigate();

function handleLogout() {
  logout();
  navigate("/");
}
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
        <button className="admin-logout" onClick={handleLogout}>تسجيل الخروج</button>
      </aside>

      <section className="admin-content">
        <Outlet />
      </section>
    </div>
  );
}

export default AdminLayout;