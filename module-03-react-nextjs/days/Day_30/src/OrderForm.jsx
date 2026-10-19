import React, { useState } from 'react';
import { useCart } from './cart/CartProvider';

export default function OrderForm() {
  const { total, dispatch } = useCart();
  const [formData, setFormData] = useState({ name: '', phone: '', area: '' });

  const isPhoneValid = /^09\d{8}$/.test(formData.phone) || /^07\d{8}$/.test(formData.phone);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order placed for ${formData.name}! Total: ${total} ETB`);
    dispatch({ type: 'CLEAR_CART' });
    setFormData({ name: '', phone: '', area: '' });
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h3>TeleBirr Checkout (Total: {total} ETB)</h3>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input name="phone" placeholder="TeleBirr Phone (09... or 07...)" value={formData.phone} onChange={handleChange} required />
      <input name="area" placeholder="Delivery Area" value={formData.area} onChange={handleChange} required />
      <button className="submit-btn" type="submit" disabled={!isPhoneValid || total === 0}>
        Complete Order
      </button>
    </form>
  );
}