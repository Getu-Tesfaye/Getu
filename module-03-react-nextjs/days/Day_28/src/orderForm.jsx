import React, { useState } from 'react';

export default function OrderForm({ totalETB }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const isPhoneValid = /^(09|07)\d{8}$/.test(formData.phone);
  const isFormValid = formData.name.trim() !== '' && formData.area.trim() !== '' && isPhoneValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      alert(`Order submitted for ${formData.name}! Total: ${totalETB} ETB`);
    }
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h3>TeleBirr Delivery Details</h3>
      
      <div className="form-group">
        <label>Name</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className="form-group">
        <label>TeleBirr Phone Number</label>
        <input 
          type="text" 
          name="phone" 
          value={formData.phone} 
          onChange={handleChange} 
          placeholder="09... or 07..."
          required 
        />
        {!isPhoneValid && formData.phone.length > 0 && (
          <span className="error-text">Enter a valid 10-digit number (09... or 07...)</span>
        )}
      </div>

      <div className="form-group">
        <label>Delivery Area</label>
        <input 
          type="text" 
          name="area" 
          value={formData.area} 
          onChange={handleChange} 
          required 
        />
      </div>

      <button className="submit-btn" type="submit" disabled={!isFormValid || totalETB === 0}>
        Pay {totalETB} ETB with TeleBirr
      </button>
    </form>
  );
}