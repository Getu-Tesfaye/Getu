import { useCartStore } from './cart/cartStore';

export function CartBadge() {
  const itemCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  return <div className="cart-badge">🛒 Items: {itemCount}</div>;
}