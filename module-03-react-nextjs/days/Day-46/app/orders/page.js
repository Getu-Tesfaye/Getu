import { connection } from "next/server";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import OrdersClient from "../../components/OrdersClient";

async function OrdersContent() {
   await connection();
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (error || !claims?.sub) {
    redirect(
      "/customer-login?next=/orders&message=Please%20sign%20in%20first%20to%20view%20your%20orders."
    );
  }

  return <OrdersClient />;
}

export default function OrdersPage() {
  return (
    <div className="page">
      <div className="page-heading">
        <h1>My Orders</h1>
        <p>View your recent orders.</p>
      </div>

      <Suspense fallback={<p>Loading your orders...</p>}>
        <OrdersContent />
      </Suspense>
    </div>
  );
}
