import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { totalItems } = useCart();
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">متجري</Link>
      <ul className="navbar-links">
        <li><NavLink to="/">الرئيسية</NavLink></li>
        <li><NavLink to="/about">من نحن</NavLink></li>
      </ul>
<Link to="/cart" className="navbar-cart">السلة ({totalItems})</Link>    </nav>
  );
}

export default Navbar;