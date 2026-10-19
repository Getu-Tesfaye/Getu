import React from 'react';
import { useCart } from './cart/CartProvider';

export default function Header() {
  const { items = [] } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="app-header">
      <h1>Addis Eats</h1>
      <div className="cart-badge">🛒 Cart Items: {itemCount}</div>
    </header>
  );
}