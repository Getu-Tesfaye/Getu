import { useState, useEffect } from "react";

function AdminOrders() {
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const savedOrder = localStorage.getItem("addis-eats-order");

        if (savedOrder) {
            setOrder(JSON.parse(savedOrder));
        }
    }, []);

    function updateStatus(newStatus) {
        const updatedOrder = {
            ...order,
            status: newStatus
        };

        setOrder(updatedOrder);
        localStorage.setItem("addis-eats-order", JSON.stringify(updatedOrder));
    }

    function deleteOrder() {
        const confirmDelete = window.confirm("Are you sure you want to delete this order?");

        if (confirmDelete) {
            localStorage.removeItem("addis-eats-order");
            setOrder(null);
        }
    }

    return (
        <div className="admin-orders-page">
            <h1>Manage Orders</h1>

            {!order ? (
                <p>No orders found.</p>
            ) : (
                <div className="order-container">
                    <h2>Order</h2>

                    {order.items.map((item) => (
                        <div key={item.id} className="order-item">
                            <h3>{item.name}</h3>
                            <p>Price: {item.price} ETB</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    ))}

                    <h2>Total: {order.total} ETB</h2>

                    <p>Status: {order.status || "pending"}</p>

                    <select
                        value={order.status || "pending"}
                        onChange={(e) => updateStatus(e.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="preparing">Preparing</option>
                        <option value="delivering">Delivering</option>
                        <option value="delivered">Delivered</option>
                    </select>

                    <br />

                    <button onClick={deleteOrder}>Delete Order</button>
                </div>
            )}
        </div>
    );
}

export default AdminOrders;