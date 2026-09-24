import { Link } from "react-router-dom";

function AdminSidebar() {
    return (
        <aside className="admin-sidebar">

            <div className="admin-logo">
                🍽️ Addis Eats
            </div>

            <nav>
                <Link to="/admin">Dashboard</Link>
                <Link to="/admin/menu">Menu</Link>
                <Link to="/admin/orders">Orders</Link>
            </nav>

            <div className="admin-logout">
                Logout
            </div>

        </aside>
    );
}

export default AdminSidebar;