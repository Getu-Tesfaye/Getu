"use client";

import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      localStorage.getItem("addis-eats-orders");

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  function deleteOrder(id) {
    const updatedOrders = orders.filter(
      (order) => order.id !== id
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "addis-eats-orders",
      JSON.stringify(updatedOrders)
    );
  }

  return (
    <div>
      <h1>Orders</h1>

      {orders.length === 0 ? (
        <div className="empty">
          <h2>No orders yet.</h2>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div
              className="order-card"
              key={order.id}
            >
              <h3>Order #{order.id}</h3>

              <p>
                Customer: {order.customerName}
              </p>

              <p>
                Total: {order.total} ETB
              </p>

              <p>
                Status: {order.status}
              </p>

              <p>{order.date}</p>

              <button
                onClick={() =>
                  deleteOrder(order.id)
                }
                className="delete-button"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}