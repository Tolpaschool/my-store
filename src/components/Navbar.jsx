import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">متجري</h1>
      <ul className="navbar-links">
        <li>الرئيسية</li>
        <li>المنتجات</li>
        <li>تواصل معنا</li>
      </ul>
      <button className="navbar-cart">السلة (0)</button>
    </nav>
  );
}

export default Navbar;