
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
    <header className="header">
      <div className="header-logo">
        <Link href="/">Addis Eats</Link>
      </div>

      <nav className="header-nav">
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>

        <Link href="/cart" className="cart-link">
          Cart
          {cartCount > 0 && (
            <span className="cart-count">{cartCount}</span>
          )}
        </Link>

        <Link href="/orders">Orders</Link>
        <Link href="/checkout">Checkout</Link>
      </nav>

      <div className="header-admin">
        <Link href="/login">Admin</Link>
        <Link href="/customer-signup">Sign Up</Link>
      </div>
    </header>
  );
}
