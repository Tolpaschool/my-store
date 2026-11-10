import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">متجري</Link>
      <ul className="navbar-links">
        <li><NavLink to="/">الرئيسية</NavLink></li>
        <li><NavLink to="/about">من نحن</NavLink></li>
      </ul>
      <button className="navbar-cart">السلة (0)</button>
    </nav>
  );
}

export default Navbar;