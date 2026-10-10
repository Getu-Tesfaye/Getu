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

  useEffect(() => {
    const savedCart = localStorage.getItem("addis-eats-cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (state.success) {
      const order = {
        id: Date.now(),
        customerName: state.customerName,
        total: state.total,
        status: "Pending",
        date: new Date().toLocaleString(),
      };

      const savedOrders =
        localStorage.getItem("addis-eats-orders");

      const orders = savedOrders
        ? JSON.parse(savedOrders)
        : [];

      orders.push(order);

      localStorage.setItem(
        "addis-eats-orders",
        JSON.stringify(orders)
      );

      localStorage.removeItem("addis-eats-cart");

      window.dispatchEvent(new Event("cart-updated"));
    }
  }, [state]);

  const cartJson = JSON.stringify(cart);

  if (state.success) {
    return (
      <div className="success-box">
        <h2>Order Successful!</h2>

        <p>{state.message}</p>

        <p>
          Total: <strong>{state.total} ETB</strong>
        </p>

        <a href="/orders" className="button">
          View Orders
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="checkout-form">
      <input
        type="hidden"
        name="intent"
        value="order"
      />

      <input
        type="hidden"
        name="cart"
        value={cartJson}
      />

      <label>
        Full Name
        <input
          name="name"
          type="text"
          placeholder="Enter your name"
        />
      </label>

      <label>
        Phone Number
        <input
          name="phone"
          type="text"
          placeholder="0912345678"
        />
      </label>

      <label>
        Delivery Area
        <input
          name="area"
          type="text"
          placeholder="Bole"
        />
      </label>

      <label>
        Payment Method
        <select name="payment">
          <option value="">Select payment</option>
          <option value="TeleBirr">TeleBirr</option>
          <option value="Cash">Cash</option>
        </select>
      </label>

      {state.message && (
        <p className="form-error">
          {state.message}
        </p>
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