

function Checkout({cart}) {

    function handleSubmit(e) {
        e.preventDefault();

        if (!e.target[0].value) {
            alert("please enter your name.");
            return;
        }
        const phone = e.target.phone.value;
        if (!phone) {
        alert("enter your phone number.");
        return;
    }
    if (!/^[0-9]{10}$/.test(phone)) {
        alert("please enter a valid 10 digit phone number.");
        return;
    }

    if (!e.target[2].value) {
        alert("enter your Delivery area");
        return;
    }

    if (!e.target[3].value) {
        alert("please select your payment method.");
        return;
    }

    const order = {
        items: cart,
        total: total
    };

    localStorage.setItem("addis-eats-order", JSON.stringify(order));

    alert("ordered placed successfully.");
    
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="checkout-page">
            <form onSubmit={handleSubmit}>
            <h1>Checkout</h1>

            <h2>Customer Information</h2>
            <input type="text" name="name" placeholder="your name"></input>
            <br/>
            <input type="tel" name="phone" placeholder="phone number"></input>
            <br />
            <input type="text" name="area" placeholder="Delivery area"></input>

            <h2>payment Method</h2>
            <select name="paymentMethod">
                <option value="">select payment method</option>
                <option value="telebirr">TeleBirr</option>
                <option value="cash">cash on delivery</option>
            </select>

            

            {cart.map((item) => (
                <div key={item.id}className="checkout-item">
                    <h3>{item.name}</h3>
                    <p>price: {item.price}</p>
                    <p>quantity: {item.quantity}</p>
                    </div>
            ))}

            <h2>Total: {total} ETB</h2>

            <br/>

            <button type="submit">place Order</button>

            </form>
        </div>
    )
}
export default Checkout;