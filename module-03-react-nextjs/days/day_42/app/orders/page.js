
const orders = [
    {
        id: 1,
        dish: "doro wat",
        quantity: 2,
        total: 800,
        status: "preparing"
    },
];

export default function OrdersPage() {

    return (
        <main>

            <h1>Orders</h1>

            {orders.map((order) => (
                <div key={order.id}>
                    <p> {order.dish}</p>
                    <p>{order.quantity}</p>
                    <p>{order.total} ETB</p>
                    <p>{order.status}</p>
                </div>
            ))}
        </main>
    );
}