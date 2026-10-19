import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useFetch } from './hooks/useFetch';
import Dish from './Dish';
import CategoryBar from './CategoryBar';

export default function Menu() {
  const { data: dishes, loading, error } = useFetch('/dishes.json');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const filteredDishes = useMemo(() => {
    if (!dishes) return [];
    return dishes.filter((dish) => {
      const matchesCategory = selectedCategory === 'All' || dish.category === selectedCategory;
      const matchesSearch = dish.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [dishes, selectedCategory, search]);

  if (loading) return <p className="status-message">Loading menu...</p>;
  if (error) return <p className="status-message">Error: {error}</p>;

  return (
    <main className="main-content">
      <input
        ref={searchInputRef}
        className="search-input"
        type="text"
        placeholder="Search dishes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <CategoryBar
        categories={['All', 'Traditional', 'Vegetarian']}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {filteredDishes.length === 0 ? (
        <p className="empty-message">No dishes found matching your selection.</p>
      ) : (
        <div className="menu-grid">
          {filteredDishes.map((dish) => (
            <Dish key={dish.id} dish={dish} />
          ))}
        </div>
      )}
    </main>
  );
}