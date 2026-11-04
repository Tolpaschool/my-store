import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <article className="card">
      <div className="card-image" style={{ background: product.color }}>
        <span>{product.emoji}</span>
      </div>
      <div className="card-body">
        <span className="card-category">{product.category}</span>
        <h3 className="card-title">{product.name}</h3>
        <div className="card-footer">
          <p className="card-price">{product.price} ر.س</p>
          <button className="card-btn">أضف للسلة</button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;