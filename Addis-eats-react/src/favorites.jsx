import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

function Favorites({ favorites, setFavorites }) {
  const navigate = useNavigate();

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((dish) => dish.id !== id));
  };

  if (!favorites || favorites.length === 0) {
    return (
      <div className="page-content favorites-empty">
        <h1>My Favorites</h1>
        <p>You haven't added any dishes yet.</p>
        <button onClick={() => navigate("/menu")}>Browse Menu</button>
      </div>
    );
  }

  return (
    <div className="page-content">
      <h1>My Favorites</h1>
      <div className="dish-grid">
        {favorites.map((dish) => (
          <div className="dish-card" key={dish.id}>
            <button
              className="favorite-button"
              onClick={() => removeFavorite(dish.id)}
            >
              <Heart size={20} fill="red" color="red" />
            </button>
            <img src={dish.image} alt={dish.name} className="dish-image" />
            <h3>{dish.name}</h3>
            <p>{dish.price} ETB</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;