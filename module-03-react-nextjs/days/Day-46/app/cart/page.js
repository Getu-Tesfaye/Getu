import Link from "next/link";
import CartClient from "../../components/CartClient";

export default function CartPage() {
  return (
    <div className="page">
      <div className="page-heading">
        <h1>Your Cart</h1>

        <p>Review your selected dishes.</p>
      </div>
      

      <CartClient />

      <div className="cart-actions">
        <Link href="/menu" className="button secondary">
          Continue Shopping
        </Link>

        <Link href="/checkout" className="button">
          Checkout
        </Link>
      </div>
    </div>
  );
}