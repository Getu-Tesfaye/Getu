import { useCartStore } from './cart/cartStore';

export function Checkout() {
  const total = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  const clear = useCartStore((state) => state.clear);

  return (
    <div className="checkout-container">
      <h2 className='name'>Checkout</h2>
      <p className="total-price">Total: ${total.toFixed(2)}</p>
      <button
        className="btn-checkout"
        onClick={clear}
        disabled={total === 0}
      >
        Place Order
      </button>
    </div>
  );
}