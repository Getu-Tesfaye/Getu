
"use client";

import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client";

export default function OrdersClient() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let active = true;

    async function loadOrders() {
      const supabase = createClient();

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        if (active) {
          setMessage("Please sign in to view your orders.");
          setLoading(false);
        }
        return;
      }

      const { data, error } = await supabase
        .from("orders")
        .select(`
          id,
          status,
          total,
          payment_method,
          customer_name,
          delivery_area,
          created_at,
          order_items (
            id,
            dish_name,
            quantity,
            unit_price
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!active) return;

      if (error) {
        console.error("Could not load orders:", error.message);
        setMessage("Could not load your orders. Please try again.");
      } else {
        setOrders(data || []);
      }

      setLoading(false);
    }

    loadOrders();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <p>Loading your orders...</p>;
  }

  if (message) {
    return <p className="form-error">{message}</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="success-box">
        <h2>No orders yet</h2>
        <p>Your completed checkout orders will appear here.</p>
        <a href="/menu" className="button">
          Browse Menu
        </a>
      </div>
    );
  }

  return (
    <div className="orders-list">
      {orders.map((order) => (
        <article className="success-box" key={order.id}>
          <h2>Order #{order.id.slice(0, 8)}</h2>

          <p>
            Status: <strong>{order.status}</strong>
          </p>

          <p>
            Total: <strong>{Number(order.total).toFixed(2)} ETB</strong>
          </p>

          <p>Payment: {order.payment_method || "Not specified"}</p>
          <p>Delivery area: {order.delivery_area || "Not specified"}</p>
          <p>
            Date:{" "}
            {mounted
              ? new Date(order.created_at).toLocaleString()
              : "Loading date..."}
          </p>

          <h3>Items</h3>

          <ul>
            {(order.order_items || []).map((item) => (
              <li key={item.id}>
                {item.dish_name} × {item.quantity} —{" "}
                {(Number(item.unit_price) * item.quantity).toFixed(2)} ETB
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
