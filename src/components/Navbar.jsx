import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">🛍️ متجري</h1>
      <ul className="navbar-links">
        <li>الرئيسية</li>
        <li>المنتجات</li>
        <li>السلة</li>
      </ul>
    </nav>
  );
}

export default Navbar;