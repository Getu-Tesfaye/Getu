"use client";

import { useState } from "react";

export default function AddToCartButton({ dish }) {
  const [message, setMessage] = useState("");

  function addToCart() {
    let cart = [];

    try {
      const savedCart = localStorage.getItem("addis-eats-cart");
      cart = savedCart ? JSON.parse(savedCart) : [];
    } catch {
      cart = [];
    }

    const existingItem = cart.find((item) => item.id === dish.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...dish, quantity: 1 });
    }

    localStorage.setItem("addis-eats-cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));

    setMessage(`${dish.name} added to cart!`);

    setTimeout(() => {
      setMessage("");
    }, 2000);
  }

  return (
    <>
      <button
        type="button"
        onClick={addToCart}
        aria-label={`Add to Cart, ${dish.name}`}
      >
        Add to Cart
      </button>

      <div role="status">
        {message && <div className="cart-popup">✓ {message}</div>}
      </div>
    </>
  );
}