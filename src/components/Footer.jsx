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
          <p>الرئيسية</p>
          <p>المنتجات</p>
          <p>السلة</p>
        </div>
        <div>
          <h4>تواصل معنا</h4>
          <p>info@mystore.com</p>
          <p>الرياض، السعودية</p>
        </div>
      </div>
      <p className="footer-copy">© {year} متجري. جميع الحقوق محفوظة.</p>
    </footer>
  );
}

export default Footer;