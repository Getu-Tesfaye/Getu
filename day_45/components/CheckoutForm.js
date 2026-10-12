
"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { handleAppAction } from "../app/actions";

const initialState = {
  success: false,
  message: "",
  total: 0,
};

export default function CheckoutForm() {
  const [state, formAction, pending] = useActionState(
    handleAppAction,
    initialState
  );

  const [cart, setCart] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("addis-eats-cart");
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];
      setCart(Array.isArray(parsedCart) ? parsedCart : []);
    } catch {
      setCart([]);
    }

    setCartLoaded(true);
  }, []);

  useEffect(() => {
    if (state.success) {
      localStorage.removeItem("addis-eats-cart");
      window.dispatchEvent(new Event("cart-updated"));
      setCart([]);
    }
  }, [state.success]);

  if (!cartLoaded) {
    return <p>Loading your cart...</p>;
  }

  if (state.success) {
    return (
      <div className="success-box">
        <h2>Order Successful!</h2>
        <p>{state.message}</p>
        <p>
          Total: <strong>{state.total} ETB</strong>
        </p>
        <p>Order ID: {state.orderId}</p>
        <a href="/orders" className="button">
          View Orders
        </a>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="success-box">
        <h2>Your cart is empty</h2>
        <p>Please add dishes before checking out.</p>
        <a href="/menu" className="button">
          Browse Menu
        </a>
      </div>
    );
  }

  const cartJson = JSON.stringify(
    cart.map((item) => ({
      id: item.id,
      quantity: Number(item.quantity),
    }))
  );

  return (
    <form action={formAction} className="checkout-form">
      <input type="hidden" name="intent" value="order" />
      <input type="hidden" name="cart" value={cartJson} />

      <label>
        Full Name
        <input
          name="name"
          type="text"
          placeholder="Enter your full name"
          required
        />
      </label>

      <label>
        Phone Number
        <input
          name="phone"
          type="tel"
          placeholder="0912345678"
          pattern="[0-9]{10}"
          maxLength={10}
          required
        />
      </label>

      <label>
        Delivery Area
        <input
          name="area"
          type="text"
          placeholder="Bole"
          required
        />
      </label>

      <label>
        Payment Method
        <select name="payment" defaultValue="" required>
          <option value="" disabled>
            Select payment
          </option>
          <option value="TeleBirr">TeleBirr</option>
          <option value="Cash">Cash</option>
        </select>
      </label>

      {state.message && (
        <p className="form-error">{state.message}</p>
      )}

      <button
        type="submit"
        className="button"
        disabled={pending}
      >
        {pending ? "Processing..." : "Place Order"}
      </button>
    </form>
  );
}
