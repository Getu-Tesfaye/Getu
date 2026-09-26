import React, { useState, useEffect } from "react";
import { Search, Heart } from "lucide-react";

const categories = ["All", "Special", "Pizza", "Burgers", "Drinks", "Vegetables"];

function Menu({ cart, setCart, favorites, setFavorites }) {
  const [menuData, setMenuData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/menu-data.json")
      .then((res) => res.json())
      .then((data) => setMenuData(data))
      .catch((err) => console.error("Failed to load menu:", err));
  }, []);

  const filtered = menuData.filter((dish) => {
    const matchesCategory =
      activeCategory === "All" ||
      dish.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesQuery = dish.name.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const toggleFavorite = (dish) => {
    const exists = favorites.some((f) => f.id === dish.id);
    setFavorites(
      exists ? favorites.filter((f) => f.id !== dish.id) : [...favorites, dish]
    );
  };

  const addToCart = (dish) => {
    setCart([...cart, dish]);
  };

  return (
    <div className="menu-page">
      <h1>Our Menu</h1>
      <p className="menu-subtitle">Fresh, authentic Ethiopian dishes made daily</p>

      <div className="search-wrap">
        <Search size={18} />
        <input
          type="search"
          placeholder="search dishes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="category-pills">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={activeCategory === cat ? "active" : ""}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {menuData.length === 0 && <p>Loading menu...</p>}

      {menuData.length > 0 && filtered.length === 0 && (
        <p>No dishes match your search.</p>
      )}

      <div className="dish-grid">
        {filtered.map((dish) => (
          <div className="dish-card" key={dish.id}>
            <button
              type="button"
              className="favorite-button"
              onClick={() => toggleFavorite(dish)}
            >
              <Heart
                size={20}
                fill={favorites.some((f) => f.id === dish.id) ? "red" : "none"}
                color="red"
              />
            </button>
            <img src={dish.image} alt={dish.name} className="dish-image" />
            <h3>{dish.name}</h3>
            <p>{dish.description}</p>
            <p className="dish-price">{dish.price} ETB</p>
            <button
              type="button"
              className="add-to-cart"
              onClick={() => addToCart(dish)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;