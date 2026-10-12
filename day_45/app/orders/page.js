
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import OrdersClient from "../../components/OrdersClient";

export default async function OrdersPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (error || !claims?.sub) {
    redirect(
      "/customer-login?next=/orders&message=Please%20sign%20in%20first%20to%20view%20your%20orders."
    );
  }

  return (
    <div className="page">
      <div className="page-heading">
        <h1>My Orders</h1>
        <p>View your recent orders.</p>
      </div>

      <OrdersClient />
    </div>
  );
}
