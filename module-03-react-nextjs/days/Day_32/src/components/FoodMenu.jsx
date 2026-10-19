import { useEffect, useState } from 'react';
import { fetchDishes } from '../data/dishes';
import { useCartStore } from '../cart/cartStore';

export function FoodMenu() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetchDishes().then((data) => {
      setDishes(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading menu...</div>;

  return (
    <>
      <div className="hero-banner">
        <h2 className="hero-title"></h2>
        <p className="hero-subtitle">Browse our menu of Special Food.</p>
      </div>

      <div className="main-content">
        <div className="menu-header-bar">
          <h2 className="menu-title">Menu</h2>
          <input type="text" className="search-input" placeholder="Search dishes..." />
        </div>

        <div className="filter-container">
          <button className="filter-btn active">All</button>
          
        </div>

        <div className="dish-grid">
          {dishes.map((dish) => (
            <div key={dish.id} className="dish-card">
              <span className="favorite-icon">♡</span>
              <img src={dish.image} alt={dish.name} className="dish-image" />
              <div className="dish-details">
                <div>
                  <h3 className="dish-name">{dish.name}</h3>
                  <p className="dish-price">${dish.price.toFixed(2)}</p>
                </div>
                <button className="btn-add" onClick={() => addItem(dish)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}