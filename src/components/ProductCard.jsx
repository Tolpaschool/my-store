import "./ProductCard.css";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <article className="card">
      <Link
        to={`/product/${product.id}`}
        className="card-image"
        style={{ background: product.color }}
      >
        <span>{product.emoji}</span>
      </Link>
      <div className="card-body">
        <span className="card-category">{product.category}</span>
        <h3 className="card-title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="card-footer">
          <p className="card-price">{product.price} ر.س</p>
          <button className="card-btn">أضف للسلة</button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
