import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="container notfound">
      <h1>404</h1>
      <p>الصفحة التي تبحث عنها غير موجودة.</p>
      <Link to="/" className="back-link">العودة للرئيسية</Link>
    </main>
  );
}

export default NotFound;