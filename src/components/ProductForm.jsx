import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import Field from "./Field";
import "./ProductForm.css";

const emptyForm = {
  name: "",
  price: "",
  category: "",
  emoji: "📦",
  stock: "",
  description: "",
};

function validate(values) {
  const errors = {};

  if (values.name.trim().length < 3) {
    errors.name = "الاسم يجب ألا يقل عن 3 أحرف";
  }
  if (values.price === "" || Number(values.price) <= 0) {
    errors.price = "أدخل سعراً أكبر من صفر";
  }
  if (!values.category.trim()) {
    errors.category = "الفئة مطلوبة";
  }
  if (values.stock === "" || !Number.isInteger(Number(values.stock)) || Number(values.stock) < 0) {
    errors.stock = "المخزون رقم صحيح من 0 فأكثر";
  }
  if (values.description.trim().length < 10) {
    errors.description = "الوصف لا يقل عن 10 أحرف";
  }

  return errors;
}



function ProductForm({ initialValues = emptyForm, onSubmit, submitLabel }) {
  const { products } = useProducts();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const categories = [...new Set(products.map((p) => p.category))];

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const foundErrors = validate(values);
    setErrors(foundErrors);

    if (Object.keys(foundErrors).length > 0) return;

    onSubmit({
      ...values,
      name: values.name.trim(),
      category: values.category.trim(),
      description: values.description.trim(),
      price: Number(values.price),
      stock: Number(values.stock),
    });
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <Field label="اسم المنتج" error={errors.name}>
        <input name="name" value={values.name} onChange={handleChange} />
      </Field>

      <div className="form-row">
        <Field label="السعر (ر.س)" error={errors.price}>
          <input name="price" type="number" value={values.price} onChange={handleChange} />
        </Field>
        <Field label="المخزون" error={errors.stock}>
          <input name="stock" type="number" value={values.stock} onChange={handleChange} />
        </Field>
      </div>

      <div className="form-row">
        <Field label="الفئة" error={errors.category}>
          <input name="category" list="categories" value={values.category} onChange={handleChange} />
          <datalist id="categories">
            {categories.map((c) => <option key={c} value={c} />)}
          </datalist>
        </Field>
        <Field label="إيموجي المنتج">
          <input name="emoji" value={values.emoji} onChange={handleChange} />
        </Field>
      </div>

      <Field label="الوصف" error={errors.description}>
        <textarea name="description" rows="4" value={values.description} onChange={handleChange} />
      </Field>

      <div className="form-actions">
        <button type="submit" className="details-btn">{submitLabel}</button>
        <Link to="/admin/products" className="btn-light">إلغاء</Link>
      </div>
    </form>
  );
}

export default ProductForm;