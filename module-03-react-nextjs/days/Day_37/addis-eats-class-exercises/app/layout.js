import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <h2>Addis Eats</h2>

          <nav>
            <Link href="/">Home</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/checkout">Checkout</Link>
          </nav>
        </header>

        {children}

        <footer className="site-footer">
          <p>© 2026 Addis Eats</p>
        </footer>
      </body>
    </html>
  );
}