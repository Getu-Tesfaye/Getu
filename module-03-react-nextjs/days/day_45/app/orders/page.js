import OrdersClient from "../../components/OrdersClient";

export default function OrdersPage() {
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