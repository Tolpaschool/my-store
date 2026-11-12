import { useParams, useNavigate, Link } from "react-router-dom";
import products from "../data/products";
import "./ProductDetails.css";
import ProductCard from "../components/ProductCard";


function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <main className="container">
        <p className="empty">هذا المنتج غير موجود.</p>
        <Link to="/" className="back-link">العودة للمتجر</Link>
      </main>
    );
  }
  const relatedProducts = products.filter(
  (p) => p.category === product.category && p.id !== product.id
);

  return (
    <main className="container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← رجوع
      </button>

      <div className="details">
        <div className="details-image" style={{ background: product.color }}>
          <span>{product.emoji}</span>
        </div>

        <div className="details-info">
          <span className="card-category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="details-desc">{product.description}</p>
          <p className="details-price">{product.price} ر.س</p>

          {product.stock > 0 ? (
            <p className="stock in">متوفر: {product.stock} قطعة</p>
          ) : (
            <p className="stock out">نفدت الكمية</p>
          )}

          <button className="details-btn" disabled={product.stock === 0}>
            أضف للسلة
          </button>
        </div>
      </div>
      {relatedProducts.length > 0 && (
  <section className="related">
    <h2 className="section-title">منتجات مشابهة</h2>
    <div className="products-grid">
      {relatedProducts.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  </section>
)}
    </main>
  );
}

export default ProductDetails;