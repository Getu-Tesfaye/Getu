"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { etb, when, relative } from "@/lib/format";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  loading: () => (
    <div style={{ height: 400 }} role="status">
      Loading map...
    </div>
  ),
});

const connectionText = {
  connecting: "Connecting...",
  connected: "Live",
  reconnecting: "Reconnecting...",
  finished: "Finished",
};

export default function TrackingClient({ orderId, initial }) {
  const [tracking, setTracking] = useState(initial);
  const [connection, setConnection] = useState("connecting");

  useEffect(() => {
    const source = new EventSource(`/api/orders/${orderId}/stream`);

    source.onopen = () => setConnection("connected");

    source.onmessage = (event) => {
      const update = JSON.parse(event.data);
      setTracking((current) => ({ ...current, ...update }));

      if (update.status === "Delivered") {
        source.close();
        setConnection("finished");
      }
    };

    source.onerror = () => setConnection("reconnecting");

    return () => source.close();
  }, [orderId]);

  const { status, courier, delivery, order, updatedAt } = tracking;

  return (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      <div style={{ flex: "2 1 400px" }}>
        <DeliveryMap courier={courier} delivery={delivery} />
      </div>

      <section style={{ flex: "1 1 260px" }} aria-live="polite">
        <h2>Order #{order.id.slice(0, 8)}</h2>
        <p role="status">Connection: {connectionText[connection]}</p>
        <p>Status: {status}</p>
        <p>Delivery area: {order.delivery_area}</p>
        <p>
          Courier at: {courier.lat.toFixed(4)}, {courier.lng.toFixed(4)}
        </p>
        <p>Total: {etb(order.total)}</p>
        <p>Ordered: {when(order.created_at)}</p>
        {updatedAt && <p>Updated {relative(updatedAt)}</p>}
      </section>
    </div>
  );
}