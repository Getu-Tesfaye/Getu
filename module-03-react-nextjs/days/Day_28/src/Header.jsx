import React from 'react';

export default function Header({ totalETB = 0 }) {
  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="brand">
          <span className="brand-icon">🍲</span>
          <h1 className="brand-title">Addis<span className="highlight">Eats</span></h1>
        </div>

        <nav className="nav-links">
          <a href="#menu" className="nav-link active">Menu</a>
          <a href="#categories" className="nav-link">Categories</a>
          <a href="#checkout" className="nav-link">Checkout</a>
        </nav>

        <div className="cart-summary">
          <span className="cart-icon">🛒</span>
          <div className="cart-details">
            <span className="cart-total">{totalETB} ETB</span>
          </div>
        </div>
      </div>
    </header>
  );
}