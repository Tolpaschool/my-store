import "./ProductCard.css";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    useEffect(() => {
    if (!added) return;

    const timer = setTimeout(() => setAdded(false), 2000);
    return () => clearTimeout(timer);
  }, [added]);

  function handleAdd() {
    addToCart(product);
    setAdded(true);
  }

  return (
   <article className="card">
      <Link to={`/product/${product.id}`} className="card-image" style={{ background: product.color }}>
        <span>{product.emoji}</span>
      </Link>
      <div className="card-body">
        <span className="card-category">{product.category}</span>
        <h3 className="card-title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="card-footer">
          <p className="card-price">{product.price} ر.س</p>
          <button
            className={added ? "card-btn added" : "card-btn"}
            onClick={handleAdd}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "نفد" : added ? "تمت الإضافة ✓" : "أضف للسلة"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
