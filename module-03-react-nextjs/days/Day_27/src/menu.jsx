import { useState } from 'react';
import Dish from './Dish';
import Card from './Card';
import menu from './data';

function Menu() {
  const [activeCategory, setActiveCategory] = useState('vegan');

  const visibleItems = menu.filter((item) => item.category === activeCategory);

  return (
    <section className="menu-wrapper">
      <nav className="category-nav">
        <button onClick={() => setActiveCategory('vegan')}>Vegan Fasting</button>
        <button onClick={() => setActiveCategory('meat')}>Meat Dishes</button>
      </nav>

      {visibleItems.length === 0 ? (
        <p className="empty-msg">Nothing available in this category right now.</p>
      ) : (
        visibleItems.map((item) => (
          <Card key={item.id}>
            <Dish dishName={item.name} cost={item.price} isSpicy={item.spicy} />
          </Card>
        ))
      )}
    </section>
  );
}

export default Menu;