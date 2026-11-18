import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import { useCart } from "../../context/CartContext";
import ConfirmDialog from "../../components/ConfirmDialog";
import "./Admin.css";

function getStockStatus(stock) {
  if (stock === 0) return { label: "نفد", className: "no" };
  if (stock <= 5) return { label: "منخفض", className: "wait" };
  return { label: "متوفر", className: "ok" };
}
function AdminProducts() {
  const { products, deleteProduct, resetProducts } = useProducts();
  const [showReset, setShowReset] = useState(false);

  const { removeFromCart } = useCart();
  const [search, setSearch] = useState("");
  const [productToDelete, setProductToDelete] = useState(null);
  function handleReset() {
    resetProducts();
    setShowReset(false);
  }

  function handleDelete() {
    deleteProduct(productToDelete.id);
    removeFromCart(productToDelete.id);
    setProductToDelete(null);
  }
  const visible = products.filter((p) => p.name.includes(search.trim()));

  return (
    <>
      <h1 className="page-title">إدارة المنتجات</h1>

      <div className="toolbar-admin">
        <input
          className="search"
          placeholder="بحث عن منتج..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link
          to="/admin/products/new"
          className="details-btn"
          style={{ padding: "0 22px" }}
        >
          + منتج جديد
        </Link>
        <button className="btn-light" onClick={() => setShowReset(true)}>
          استعادة الأصلية
        </button>
      </div>

      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>المنتج</th>
              <th>الفئة</th>
              <th>السعر</th>
              <th>المخزون</th>
              <th>الحالة</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((p) => {
              const status = getStockStatus(p.stock);
              return (
                <tr key={p.id}>
                  <td>
                    {p.emoji} {p.name}
                  </td>
                  <td>{p.category}</td>
                  <td>{p.price} ر.س</td>
                  <td>{p.stock}</td>
                  <td>
                    <span className={`tag ${status.className}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="row-actions">
                    <Link to={`/admin/products/${p.id}/edit`} title="تعديل">
                      ✏️
                    </Link>
                    <button title="حذف" onClick={() => setProductToDelete(p)}>
                      🗑️
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {visible.length === 0 && (
          <p className="empty">لا توجد منتجات مطابقة.</p>
        )}
      </div>
      {productToDelete && (
        <ConfirmDialog
          title="حذف المنتج"
          message={`هل أنت متأكد من حذف "${productToDelete.name}"؟ لا يمكن التراجع.`}
          confirmText="نعم، احذف"
          onConfirm={handleDelete}
          onCancel={() => setProductToDelete(null)}
        />
      )}
      {showReset && (
        <ConfirmDialog
          title="استعادة المنتجات الأصلية"
          message="سيتم حذف كل التعديلات والمنتجات المضافة والعودة للقائمة الأصلية."
          confirmText="نعم، استعد"
          onConfirm={handleReset}
          onCancel={() => setShowReset(false)}
        />
      )}
    </>
  );
}

export default AdminProducts;
