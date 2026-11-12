
import './App.css'
import { Routes, Route  } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop.jsx';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound.jsx';
import ProductDetails from "./pages/ProductDetails";


function App() {
 

  return (
  
     <>
     <ScrollToTop />
    <Navbar /> 
   <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
     <Footer />
     </>
  )
}

export default App
