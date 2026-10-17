import { Suspense } from "react";
import Link from "next/link";
import { requireAdmin } from "../../lib/requireAdmin";
import { getDashboardOrders } from "../../lib/dashboardOrders";

async function AdminStats() {
  await requireAdmin();

  const orders = await getDashboardOrders();
  const totalOrders = orders.length;
  const revenue = orders.reduce((sum, order) => sum + Number(order.total), 0);
  const average = totalOrders > 0 ? Math.round(revenue / totalOrders) : 0;

  return (
    <>
      <div className="dashboard-grid">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <strong>{totalOrders}</strong>
        </div>

        <div className="stat-card">
          <h3>Revenue</h3>
          <strong>{revenue.toLocaleString()} ETB</strong>
        </div>

        <div className="stat-card">
          <h3>Average Order</h3>
          <strong>{average.toLocaleString()} ETB</strong>
        </div>

        <div className="stat-card">
          <h3>Status</h3>
          <strong>Active</strong>
        </div>
      </div>

      <p>
        <Link href="/dashboard">Open charts and orders table →</Link>
      </p>
    </>
  );
}

export default function AdminPage() {
  return (
    <div>
      <h1>Dashboard</h1>

      <p>Welcome to the Addis Eats administration dashboard.</p>

      <Suspense fallback={<p>Loading dashboard...</p>}>
        <AdminStats />
      </Suspense>
    </div>
  );
}