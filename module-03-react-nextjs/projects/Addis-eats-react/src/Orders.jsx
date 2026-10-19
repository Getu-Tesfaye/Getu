import { useState } from "react";

function Orders() {

    const [order, setOrder] = useState(() => {
        const savedOrder = localStorage.getItem("addis-eats-order");
        return savedOrder ? JSON.parse(savedOrder) : null;
    });

    return (
        <main>
            <h1>my orders</h1>
            
            {!order ? (
                <p>No order yet</p>
            ) : (
                <div>
                    <h2>Order</h2>

                    {order.items.map((item) => (
                        <div key={item.id}>
                            <h3>{item.name}</h3>
                            <p>price: {item.price} ETB</p>
                            <p>quantity: {item.quantity}</p>
                            </div>
                    ))}

                    <h2>Total: {order.total}</h2>

                    <button onClick={() => {
                        localStorage.removeItem('addis-eats-order');
                        setOrder(null);}}>Clear Order</button>
                    

                </div>
            )}
        </main>
    );
}
export default Orders;