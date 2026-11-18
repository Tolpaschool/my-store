import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <h3 className="footer-logo">متجري</h3>
          <p>منتجات مختارة بعناية، وتوصيل سريع لباب بيتك.</p>
        </div>

        <div>
          <h4>روابط سريعة</h4>
          <Link to="/">الرئيسية</Link>
          <Link to="/about">من نحن</Link>
          <Link to="/cart">السلة</Link>
        </div>

        <div>
          <h4>تواصل معنا</h4>
          <a href="mailto:info@mystore.com">info@mystore.com</a>
          <p>الرياض، السعودية</p>
        </div>
      </div>

      <p className="footer-copy">© {year} متجري. جميع الحقوق محفوظة.</p>
    </footer>
  );
}

export default Footer;