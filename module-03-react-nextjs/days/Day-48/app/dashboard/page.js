import { Suspense } from "react";
import { requireAdmin } from "../../lib/requireAdmin";
import { getDashboardOrders } from "../../lib/dashboardOrders";
import {
  revenueByNeighbourhood,
  ordersPerDay,
} from "../../lib/dashboardSummary";
import { RevenueChart, OrdersLineChart } from "./RevenueChart";
import OrderTable from "../orders/OrderTable";
import OrdersLoading from "../orders/loading";

async function DashboardContent({ searchParams }) {
  await requireAdmin();

  const { demo, sort = "date", dir = "desc", page = "1" } = await searchParams;

  if (demo === "slow") {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  if (demo === "error") {
    throw new Error("Demo error");
  }

  const orders = demo === "empty" ? [] : await getDashboardOrders();

  if (orders.length === 0) {
    return (
      <div className="empty">
        <h2>No orders yet.</h2>
        <p>When customers place orders, you will see charts and a table here.</p>
      </div>
    );
  }

  const revenue = revenueByNeighbourhood(orders);
  const perDay = ordersPerDay(orders);
  const firstDay = perDay[0].day;
  const lastDay = perDay[perDay.length - 1].day;

  return (
    <>
      <section>
        <h2>Revenue by neighbourhood (ETB)</h2>
        <RevenueChart data={revenue} />

        <table>
          <caption>Revenue by neighbourhood in ETB</caption>
          <thead>
            <tr>
              <th scope="col">Neighbourhood</th>
              <th scope="col">Revenue (ETB)</th>
            </tr>
          </thead>
          <tbody>
            {revenue.map((row) => (
              <tr key={row.neighbourhood}>
                <th scope="row">{row.neighbourhood}</th>
                <td>{row.revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>
          Orders per day (number of orders), {firstDay} to {lastDay}
        </h2>
        <OrdersLineChart data={perDay} />

        <table>
          <caption>
            Number of orders per day, {firstDay} to {lastDay}
          </caption>
          <thead>
            <tr>
              <th scope="col">Day</th>
              <th scope="col">Orders</th>
            </tr>
          </thead>
          <tbody>
            {perDay.map((row) => (
              <tr key={row.day}>
                <th scope="row">{row.day}</th>
                <td>{row.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <OrderTable orders={orders} sort={sort} dir={dir} page={page} />
    </>
  );
}

export default function DashboardPage({ searchParams }) {
  return (
    <div className="page">
      <div className="page-heading">
        <h1>Dashboard</h1>
        <p>Revenue and orders at a glance.</p>
      </div>

      <Suspense fallback={<OrdersLoading />}>
        <DashboardContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}