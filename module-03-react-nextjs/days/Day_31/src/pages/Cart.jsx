import { Link } from "react-router-dom";
import { useCart } from "../CartProvider";

export default function Cart() {
  const { cart } = useCart();

  return (
    <section>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Empty.</p>
      ) : (
        <ul>
          {cart.map((item, i) => (
            <li key={i}>
              {item.name} — ${item.price}
            </li>
          ))}
        </ul>
      )}
      <Link to="/checkout">Checkout</Link>
    </section>
  );
}
