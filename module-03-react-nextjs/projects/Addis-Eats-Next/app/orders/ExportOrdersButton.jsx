"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toCsv, downloadCsv } from "@/lib/csv";
import { etb, when } from "@/lib/format";

const columns = [
  { label: "Order", value: (order) => order.id },
  { label: "Date", value: (order) => when(order.created_at) },
  { label: "Customer", value: (order) => order.customer_name },
  { label: "Delivery area", value: (order) => order.delivery_area },
  { label: "Payment", value: (order) => order.payment_method },
  { label: "Status", value: (order) => order.status },
  { label: "Total", value: (order) => etb(order.total) },
];

export default function ExportOrdersButton() {
  const [message, setMessage] = useState("");

  async function handleExport() {
    setMessage("Preparing file...");

    const supabase = createClient();

    const { data, error } = await supabase
      .from("orders")
      .select(
        "id, created_at, customer_name, delivery_area, payment_method, status, total"
      )
      .order("created_at", { ascending: false });

    if (error || !data) {
      setMessage("Could not export your orders.");
      return;
    }

    if (data.length === 0) {
      setMessage("You have no orders to export.");
      return;
    }

    downloadCsv("order-history.csv", toCsv(data, columns));
    setMessage("Downloaded order-history.csv");
  }

  return (
    <div>
      <button onClick={handleExport}>Export orders (CSV)</button>
      <p role="status">{message}</p>
    </div>
  );
}