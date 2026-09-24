import { Link } from "react-router-dom";

function Cart({ cart, setCart }) {
    return (
        <div className="cart-page">
            <h1>Your cart</h1>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <div key={item.id}className="cart-item">
                            <h3>{item.name}</h3>
                            <p>price: {item.price} ETB</p>
 <button   onClick={() => { 
    const updatedCart = item.quantity === 1  ? cart.filter((cartItem) => 
        cartItem.id !== item.id)  : cart.map((cartItem) => 
            cartItem.id === item.id  ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem  );

                                    setCart(updatedCart);
                                }}
                            > - </button>
                            <span>{item.quantity}</span>
<button  onClick={() => {
                          const updatedCart = cart.map((cartItem) =>
                         cartItem.id === item.id  ? 
                      { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem );  
                      setCart(updatedCart);  }}   > + </button>
<button onClick={() => {  const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);   setCart(updatedCart); }} > Remove </button>
                        </div>
                    ))}

                    <Link to="/checkout">
                        <button>Proceed to Checkout</button>
                    </Link>
                </>
            )}
        </div>
    );
}
export default Cart;