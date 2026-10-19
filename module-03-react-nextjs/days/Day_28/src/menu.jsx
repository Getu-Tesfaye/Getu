import React, { useState } from 'react';
import { menuData } from './data';
import CategoryBar from './CategoryBar';
import OrderForm from './OrderForm';

function Dish({ item, onAdd }) {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount((prev) => prev + 1);
    onAdd(item.price);
  };

  return (
    <div className="dish-card">
      <div className="dish-info">
        <h4>{item.name} {item.spicy && '🌶️'}</h4>
        <p>Price: {item.price} ETB</p>
      </div>
      <div className="dish-actions">
        <span className="dish-count">Qty: {count}</span>
        <button className="add-btn" onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
}

export default function Menu({ totalETB, setTotalETB }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  console.log("Current State:", { selectedCategory, totalETB });

  const categories = ['All', ...new Set(menuData.map((item) => item.category))];

  const filteredDishes = selectedCategory === 'All'
    ? menuData
    : menuData.filter((item) => item.category === selectedCategory);

  const handleAddDishPrice = (price) => {
    setTotalETB((prevTotal) => prevTotal + price);
  };

  return (
    <div className="menu-container">
      <h2 className="menu-title">Addis Eats Menu</h2>
      <div className="total-display">Total Order: {totalETB} ETB</div>

      <CategoryBar 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />

      <div>
        {filteredDishes.map((dish) => (
          <Dish key={dish.id} item={dish} onAdd={handleAddDishPrice} />
        ))}
      </div>

      <OrderForm totalETB={totalETB} />
    </div>
  );
}