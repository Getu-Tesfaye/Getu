import { Suspense } from "react";
import { notFound } from "next/navigation";
import { requireLogin } from "@/lib/requireLogin";
import { createClient } from "@/lib/supabase/server";
import { kitchen, getDeliveryPoint } from "@/lib/places";
import TrackingClient from "./TrackingClient";

async function TrackContent({ params }) {
  const { id } = await params;

  await requireLogin(
    `/track/${id}`,
    "Please sign in first to track your order."
  );

  const supabase = await createClient();

  const { data: order } = await supabase
    .from("orders")
    .select("id, total, created_at, delivery_area")
    .eq("id", id)
    .maybeSingle();

  if (!order) {
    notFound();
  }

  const initial = {
    status: "Order received",
    courier: kitchen,
    delivery: getDeliveryPoint(order.delivery_area),
    order,
  };

  return <TrackingClient orderId={order.id} initial={initial} />;
}

export default function TrackPage({ params }) {
  return (
    <div className="page">
      <div className="page-heading">
        <h1>Track your order</h1>
      </div>

      <Suspense fallback={<p>Loading tracking...</p>}>
        <TrackContent params={params} />
      </Suspense>
    </div>
  );
}