import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, DollarSign, TrendingUp, Star, Activity } from "lucide-react";

function Admin() {
  const navigate = useNavigate();

  return (
    <div className="admin-content">
      <h1>Admin Dashboard</h1>

      <h2>Dashboard Analytics</h2>
      <div className="stat-grid">
        <div className="stat-card" style={{ "--stat-color": "darkgreen" }}>
          <div className="stat-icon"><ShoppingBag size={22} /></div>
          <div>
            <p className="stat-label">Total Orders</p>
            <p className="stat-value">0</p>
          </div>
        </div>

        <div className="stat-card" style={{ "--stat-color": "orange" }}>
          <div className="stat-icon"><DollarSign size={22} /></div>
          <div>
            <p className="stat-label">Total Revenue</p>
            <p className="stat-value">0 ETB</p>
          </div>
        </div>

        <div className="stat-card" style={{ "--stat-color": "#08a66a" }}>
          <div className="stat-icon"><TrendingUp size={22} /></div>
          <div>
            <p className="stat-label">Average Order Value</p>
            <p className="stat-value">0 ETB</p>
          </div>
        </div>

        <div className="stat-card" style={{ "--stat-color": "red" }}>
          <div className="stat-icon"><Star size={22} /></div>
          <div>
            <p className="stat-label">Top Selling Dish</p>
            <p className="stat-value">No dishes yet</p>
          </div>
        </div>

        <div className="stat-card" style={{ "--stat-color": "#555" }}>
          <div className="stat-icon"><Activity size={22} /></div>
          <div>
            <p className="stat-label">Order Status</p>
            <p className="stat-value">No orders</p>
          </div>
        </div>
      </div>

      <h2>Menu Management</h2>
      <div className="management-grid">
        <div className="management-card">
          <h3>Menu Items</h3>
          <p>Add, edit, or remove dishes from your menu.</p>
          <button onClick={() => navigate("/admin/menu")}>Manage Menu</button>
        </div>

        <div className="management-card">
          <h3>Orders</h3>
          <p>Track and update the status of customer orders.</p>
          <button onClick={() => navigate("/admin/orders")}>Manage Orders</button>
        </div>
      </div>
    </div>
  );
}

export default Admin;