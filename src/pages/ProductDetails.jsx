import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import "./ProductDetails.css";
import PageState from "../components/PageState";


function ProductDetailsContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { products, status, reload } = useProducts();

  
  useEffect(() => {
    if (!added) return;

    const timer = setTimeout(() => setAdded(false), 2000);
    return () => clearTimeout(timer);
  }, [added]);

  const product = products.find((p) => p.id === Number(id));
  
  if (status !== "ready") {
  return (
    <main className="container">
      <PageState status={status} onRetry={reload} />
    </main>
  );
}
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

  function handleAdd() {
    addToCart(product, quantity);
    setAdded(true);
  }

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
            <>
              <p className="stock in">متوفر: {product.stock} قطعة</p>

              <div className="qty" style={{ width: "fit-content", marginBottom: "16px" }}>
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}>+</button>
              </div>
            </>
          ) : (
            <p className="stock out">نفدت الكمية</p>
          )}

          <button
            className={added ? "details-btn added" : "details-btn"}
            onClick={handleAdd}
            disabled={product.stock === 0}
          >
            {added ? "تمت الإضافة ✓" : "أضف للسلة"}
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

export default ProductDetailsContent;