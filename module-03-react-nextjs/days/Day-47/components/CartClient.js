"use client";

import { useEffect, useState } from "react";

export default function CartClient() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("addis-eats-cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  function saveCart(newCart) {
    setCart(newCart);

    localStorage.setItem(
      "addis-eats-cart",
      JSON.stringify(newCart)
    );

    window.dispatchEvent(new Event("cart-updated"));
  }

  function increase(id) {
    const newCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    saveCart(newCart);
  }

  function decrease(id) {
    const newCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    saveCart(newCart);
  }

  function remove(id) {
    const newCart = cart.filter(
      (item) => item.id !== id
    );

    saveCart(newCart);
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="empty">
        <h2>Your cart is empty.</h2>
        <p>Add something delicious from our menu.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="cart-list">
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <div>
              <h3>{item.name}</h3>
              <p>{item.price} ETB each</p>
            </div>

            <div className="quantity">
              <button onClick={() => decrease(item.id)}>
                -
              </button>

              <span>{item.quantity}</span>

              <button onClick={() => increase(item.id)}>
                +
              </button>
            </div>

            <strong>
              {item.price * item.quantity} ETB
            </strong>

            <button
              onClick={() => remove(item.id)}
              className="delete-button"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <h2>Total: {total} ETB</h2>
      </div>
    </div>
  );
}