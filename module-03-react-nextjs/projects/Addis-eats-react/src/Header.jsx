import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, Heart, Moon, Sun } from "lucide-react";

function Header({ cart, theme, setTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled;
  const cartCount = cart?.length || 0;

  return (
    <header className={`header-section ${transparent ? "" : "scrolled"}`}>
      <Link to="/" className="logo">ADDIS EATS</Link>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/favorites">Favorites</Link>

        <Link to="/cart" className="cart-icon-wrap">
          <ShoppingBag size={20} />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>

        <button
          className="icon-button"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        <button className="cta-button" onClick={() => navigate("/login")}>
          Sign In
        </button>
      </nav>
    </header>
  );
}

export default Header;