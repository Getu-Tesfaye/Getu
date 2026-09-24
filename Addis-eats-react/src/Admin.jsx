import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";


function Admin() {

    const [order, setOrder] = useState(null);

    useEffect(() => {
        const savedOrder = localStorage.getItem("addis-eats-order");

        if (savedOrder) {
            setOrder(JSON.parse(savedOrder));
        }
    }, []);

    const totalOrders = order ? 1 : 0;

    const totalRevenue = order ? order.total : 0;

    const averageOrderValue =
        totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const topSellingDish =
        order && order.items.length > 0
            ? order.items[0].name
            : "No dishes yet";

    const orderStatus = order
        ? (order.status || "pending")
        : "No orders";

    return (
        <>
        <AdminSidebar />
        <div className="admin-content">

            <h1>Admin Dashboard</h1>

            <h2>Dashboard Analytics</h2>

            <p>Total Orders: {totalOrders}</p>

            <p>Total Revenue: {totalRevenue} ETB</p>

            <p>Average Order Value: {averageOrderValue} ETB</p>

            <p>Top Selling Dish: {topSellingDish}</p>

            <p>Order Status: {orderStatus}</p>


            <h2>Menu Management</h2>

            <Link to="/admin/menu">
                Manage Menu
            </Link>


            <h2>Order Management</h2>

            <Link to="/admin/orders">
                Manage Orders
            </Link>

        </div>
        </>
    );
}

export default Admin;