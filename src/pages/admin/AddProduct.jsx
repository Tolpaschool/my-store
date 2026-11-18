import { useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import ProductForm from "../../components/ProductForm";
import "./Admin.css";

function AddProduct() {
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  function handleSubmit(data) {
    addProduct(data);
    navigate("/admin/products");
  }

  return (
    <>
      <h1 className="page-title">منتج جديد</h1>
      <div className="panel">
        <ProductForm onSubmit={handleSubmit} submitLabel="إضافة المنتج" />
      </div>
    </>
  );
}

export default AddProduct;