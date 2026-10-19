function Header({ setPage }) {
  return (
    <>
      <header className="nav-container">
        <div className="nav">
        <span className="logo">ADDIS EATS</span>
        </div>
    
      <nav className="nav">
        <button onClick={() => setPage("menu")}>
          Menu
        </button>

        <button onClick={() => setPage("cart")}>
          Cart
        </button>

        <button onClick={() => setPage("checkout")}>
          Checkout
        </button>

        <button onClick={() => setPage("receipt")}>
          Receipt
        </button>
      </nav>
      
      </header>
      <div className="hero-section">
        <p>Error boundaries and performance</p>
    </div>
      </>
  );
}
export default Header;