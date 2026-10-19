"use client";

import { useEffect, useState } from "react";

export default function AdminDashboardClient() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      localStorage.getItem("addis-eats-orders");

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const totalOrders = orders.length;

  const revenue = orders.reduce(
    (sum, order) => sum + Number(order.total),
    0
  );

  const average =
    totalOrders > 0
      ? Math.round(revenue / totalOrders)
      : 0;

  return (
    <div className="dashboard-grid">
      <div className="stat-card">
        <h3>Total Orders</h3>
        <strong>{totalOrders}</strong>
      </div>

      <div className="stat-card">
        <h3>Revenue</h3>
        <strong>{revenue} ETB</strong>
      </div>

      <div className="stat-card">
        <h3>Average Order</h3>
        <strong>{average} ETB</strong>
      </div>

      <div className="stat-card">
        <h3>Status</h3>
        <strong>Active</strong>
      </div>
    </div>
  );
}