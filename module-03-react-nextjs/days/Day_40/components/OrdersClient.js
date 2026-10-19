"use client";

import { useEffect, useState } from "react";

export default function OrdersClient() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      localStorage.getItem("addis-eats-orders");

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  function clearOrders() {
    localStorage.removeItem("addis-eats-orders");
    setOrders([]);
  }

  if (orders.length === 0) {
    return (
      <div className="empty">
        <h2>No orders yet.</h2>
      </div>
    );
  }

  return (
    <div>
      <div className="orders-list">
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            <h3>Order #{order.id}</h3>

            <p>
              Customer: {order.customerName}
            </p>

            <p>
              Total: <strong>{order.total} ETB</strong>
            </p>

            <p>Status: {order.status}</p>

            <p>Date: {order.date}</p>
          </div>
        ))}
      </div>

      <button
        onClick={clearOrders}
        className="delete-button"
      >
        Clear Orders
      </button>
    </div>
  );
}