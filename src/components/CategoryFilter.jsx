import "./CategoryFilter.css";

function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="filter">
      {categories.map((category) => (
        <button
          key={category}
          className={category === selected ? "chip active" : "chip"}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;