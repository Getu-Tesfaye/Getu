"use client";

import { useState } from "react";

export default function AddToCartButton({ dish }) {
  const [message, setMessage] = useState("");

  function addToCart() {
    const savedCart = localStorage.getItem("addis-eats-cart");

    let cart = savedCart ? JSON.parse(savedCart) : [];

    const existingItem = cart.find(
      (item) => item.id === dish.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...dish,
        quantity: 1,
      });
    }

    localStorage.setItem(
      "addis-eats-cart",
      JSON.stringify(cart)
    );

    // Update cart number in Header
    window.dispatchEvent(new Event("cart-updated"));

    // Show popup
    setMessage(`${dish.name} added to cart!`);

    // Hide popup after  seconds
    setTimeout(() => {
      setMessage("");
    }, 2000);
  }

  return (
    <>
      <button onClick={addToCart}>
        Add to Cart
      </button>

      {message && (
        <div className="cart-popup">
          ✓ {message}
        </div>
      )}
    </>
  );
}