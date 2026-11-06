import { useState } from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import products from "../data/products";
import SearchBar from "../components/SearchBar";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [searchText, setSearchText] = useState("");

  const categories = ["الكل", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((p) => {
    const matchCategory = 
    selectedCategory === "الكل" || p.category === selectedCategory;
    const matchSearch = p.name.includes(searchText.trim());
    return matchCategory && matchSearch;

  });
  
  return (
    <main className="container">
      <Hero
        title="خصم 20% على الأجهزة"
        subtitle="تسوّق أحدث المنتجات بأفضل الأسعار مع توصيل سريع."
        buttonText="تسوق الآن"
      />
      <SearchBar value={searchText} onChange={setSearchText} />
      <h2 className="section-title">أحدث المنتجات</h2>

      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

export default Home;