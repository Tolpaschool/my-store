
import './App.css'
import { Routes, Route  } from "react-router-dom";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home';
import About from './pages/About';
import ProductDetails from "./pages/ProductDetails";


function App() {
 

  return (
  
     <>
    <Navbar /> 
   <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
     <Footer />
     </>
  )
}

export default App
