"use client";

import { useState } from "react";
import { placeOrder } from "../actions";

export default function CheckoutPage() {
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    formData.set(
      "items",
      JSON.stringify([
        {
          id: "1",
          name: "Doro Wat",
          price: 350,
          quantity: 1,
        },
      ])
    );

    const result = await placeOrder(formData);

    if (!result.success) {
      setMessage("Please check your information.");
      return;
    }

    setMessage(
      `Order created successfully! Order ID: ${result.order.id}`
    );
  }

  return (
    <main>
      <h1>Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            name="name"
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <label>Phone</label>
          <input
            name="phone"
            placeholder="0912345678"
            required
          />
        </div>

        <div>
          <label>Area</label>
          <input
            name="area"
            placeholder="Bole"
            required
          />
        </div>

        <div>
          <label>Payment Method</label>

          <select name="paymentMethod" defaultValue="Cash">
            <option value="Cash">Cash</option>
            <option value="TeleBirr">TeleBirr</option>
          </select>
        </div>

        <button type="submit">
          Place Order
        </button>
      </form>

      {message && <p>{message}</p>}
    </main>
  );
}