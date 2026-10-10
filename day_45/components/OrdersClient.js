
"use client";

import { useEffect, useState } from "react";

export default function OrdersClient() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    function loadOrders() {
      try {
        const savedOrders = localStorage.getItem(
          "addis-eats-orders"
        );

        setOrders(savedOrders ? JSON.parse(savedOrders) : []);
      } catch {
        setOrders([]);
      }
    }

    loadOrders();

    // Poll every 5 seconds
    const intervalId = setInterval(loadOrders, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Automatically update order status
  useEffect(() => {
    const timerId = setInterval(() => {
      const savedOrders = localStorage.getItem(
        "addis-eats-orders"
      );

      if (!savedOrders) return;

      const currentOrders = JSON.parse(savedOrders);

      const updatedOrders = currentOrders.map((order) => {
        const orderAge = Date.now() - Number(order.id);

        if (orderAge >= 10000 && order.status === "Preparing") {
          return { ...order, status: "Delivered" };
        }

        if (orderAge >= 5000 && order.status === "Pending") {
          return { ...order, status: "Preparing" };
        }

        return order;
      });

      localStorage.setItem(
        "addis-eats-orders",
        JSON.stringify(updatedOrders)
      );

      setOrders(updatedOrders);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  function changeStatus(orderId, newStatus) {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? { ...order, status: newStatus }
        : order
    );

    localStorage.setItem(
      "addis-eats-orders",
      JSON.stringify(updatedOrders)
    );

    setOrders(updatedOrders);
  }

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
            <p>Customer: {order.customerName}</p>
            <p>
              Total: <strong>{order.total} ETB</strong>
            </p>
            <p>Status: {order.status}</p>

            <label>
              Change status:{" "}
              <select
                value={order.status}
                onChange={(event) =>
                  changeStatus(order.id, event.target.value)
                }
              >
                <option value="Pending">Pending</option>
                <option value="Preparing">Preparing</option>
                <option value="Delivered">Delivered</option>
              </select>
            </label>

            <p>Date: {order.date}</p>
          </div>
        ))}
      </div>

      <button onClick={clearOrders} className="delete-button">
        Clear Orders
      </button>
    </div>
  );
}
