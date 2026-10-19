
import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

 function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addItem = (dish) => setCart((prev) => [...prev, dish]);

  return (
    <CartContext.Provider value={{ cart, addItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
export default CartProvider;