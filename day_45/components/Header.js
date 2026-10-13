
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    function updateCart() {
      try {
        const savedCart = localStorage.getItem("addis-eats-cart");
        const cart = savedCart ? JSON.parse(savedCart) : [];

        const count = Array.isArray(cart)
          ? cart.reduce(
              (total, item) => total + Number(item.quantity || 0),
              0
            )
          : 0;

        setCartCount(count);
      } catch {
        setCartCount(0);
      }
    }

    updateCart();
    window.addEventListener("cart-updated", updateCart);

    return () => {
      window.removeEventListener("cart-updated", updateCart);
    };
  }, []);

  return (
    <header className="site-header">
      <Link href="/" className="brand">
        <span className="brand-icon">✦</span>

        <span>
          <span className="brand-name">Addis Eats</span>
          <small className="brand-tagline">
            ETHIOPIAN CUISINE
          </small>
        </span>
      </Link>

      <nav className="main-nav">
        <Link href="/">Home</Link>

        <Link href="/menu">Our Menu</Link>

        <Link href="/orders">Orders</Link>

        <Link
  href="/cart"
  className="cart-link"
  aria-label={`Cart, ${cartCount} items`}
>
  <span className="cart-icon" aria-hidden="true">🛒</span>

  <span className="cart-count">
    {cartCount}
  </span>
</Link>

        <Link href="/customer-signup">Sign Up</Link>

        <Link href="/login">Admin Login</Link>

        <Link href="/menu" className="order-button">
          Order Online →
        </Link>
      </nav>
    </header>
  );
}
