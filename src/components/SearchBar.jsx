import products from "../data/products";
import "./SearchBar.css";

function SearchBar({ value, onChange }) {
  return (
    <>
     
     <input
      className="search"
      type="text"
      placeholder="ابحث عن منتج..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
   
    </>
    
  );
}

export default SearchBar;