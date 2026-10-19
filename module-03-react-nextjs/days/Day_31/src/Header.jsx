import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <nav className="nav-container">
        <NavLink to="/" className="logo">
          ADDIS EATS
        </NavLink>
        
        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/signin">Sign In</NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;