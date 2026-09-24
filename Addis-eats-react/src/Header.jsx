import { Link } from "react-router-dom";

function Header({cart, theme, setTheme})  {
    return (

        <header className="header-section">
            <div className="logo">
                <span>Addis <span></span> Eats</span>
            </div>

            <nav className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/menu">Menu</Link>
                <Link to="/favorites">❤️</Link>
                <button onClick={() => 
                    setTheme(theme === "light" ? "dark" : "light")
                }>{theme === "light" ? "🌙" : "☀️"}</button>
                <Link to="/cart">🛍️<span> ({cart.length})</span></Link>
                <Link to="/orders">Orders</Link>
                <Link to="/login">Admin</Link>
                
            </nav>
          
        </header>
    )
}
export default Header;
    
