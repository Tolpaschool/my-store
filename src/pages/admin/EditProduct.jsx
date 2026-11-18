import { useParams, useNavigate, Link } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import ProductForm from "../../components/ProductForm";
import "./Admin.css";

function EditProduct() {
  const { id } = useParams();
  const { products, updateProduct } = useProducts();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <>
        <p className="empty">هذا المنتج غير موجود.</p>
        <Link to="/admin/products" className="back-link">العودة للمنتجات</Link>
      </>
    );
  }

  function handleSubmit(data) {
    updateProduct(product.id, data);
    navigate("/admin/products");
  }

  return (
    <>
      <h1 className="page-title">تعديل: {product.name}</h1>
      <div className="panel">
        <ProductForm
          key={product.id}
          initialValues={product}
          onSubmit={handleSubmit}
          submitLabel="حفظ التعديلات"
        />
      </div>
    </>
  );
}

export default EditProduct;