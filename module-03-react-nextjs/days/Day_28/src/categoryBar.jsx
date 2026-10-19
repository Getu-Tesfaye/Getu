import React from 'react';

export default function CategoryBar({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="category-container">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}