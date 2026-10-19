"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    function updateCart() {
      const savedCart = localStorage.getItem("addis-eats-cart");

      if (savedCart) {
        const cart = JSON.parse(savedCart);

        const count = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        setCartCount(count);
      } else {
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
      {/* LEFT */}
      <div className="header-logo">
        <Link href="/"> Addis Eats</Link>
      </div>

      {/* CENTER */}
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
      </nav>

      {/* right */}
      <div className="header-admin">
        <Link href="/login">admin</Link>
      </div>
    </header>
  );
}