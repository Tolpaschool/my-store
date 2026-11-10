import { useState } from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";
import products from "../data/products";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const categories = ["الكل", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategory === "الكل" || p.category === selectedCategory;
    const matchSearch = p.name
      .toLowerCase()
      .startsWith(searchText.trim().toLowerCase());
    return matchCategory && matchSearch;
  });

  const visibleProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "low") return a.price - b.price;
    if (sortBy === "high") return b.price - a.price;
    return 0;
  });

  const hasFilters = selectedCategory !== "الكل" || searchText !== "";

  function resetFilters() {
    setSelectedCategory("الكل");
    setSearchText("");
    setSortBy("default");
  }

  return (
    <main className="container">
      <Hero
        title="خصم 20% على الأجهزة"
        subtitle="تسوّق أحدث المنتجات بأفضل الأسعار مع توصيل سريع."
        buttonText="تسوق الآن"
      />

      <h2 className="section-title">أحدث المنتجات</h2>

      <div className="toolbar">
        <SearchBar value={searchText} onChange={setSearchText} />
        <select
          className="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">الترتيب الافتراضي</option>
          <option value="low">السعر: الأقل أولاً</option>
          <option value="high">السعر: الأعلى أولاً</option>
        </select>
      </div>

      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      {hasFilters && visibleProducts.length > 0 && (
        <p className="results-count">
          تم العثور على {visibleProducts.length} منتج
        </p>
      )}
      {hasFilters && (
        <button className="reset-btn" onClick={resetFilters}>
          إعادة ضبط ✕
        </button>
      )}

      {visibleProducts.length === 0 ? (
        <p className="empty">لا توجد منتجات مطابقة لبحثك.</p>
      ) : (
        <div className="products-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Home;
