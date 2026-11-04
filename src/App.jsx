
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductCard from './components/ProductCard'
import products from "./data/products";


function App() {
 

  return (
  
     <div>
    <Navbar />
    <main className='container'>

      <h2 className="section-title">أحدث المنتجات</h2>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard  key={product.id} product={product} />
        ))}
      </div>

    </main>
     <Footer />
     </div>
  )
}

export default App
