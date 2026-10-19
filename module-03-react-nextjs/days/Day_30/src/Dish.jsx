import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import { useCart } from './cart/CartProvider';

export default function Dish({ dish, currency = 'ETB' }) {
  const { dispatch } = useCart();

  return (
    <Card>
      <div>
        <h3>
          {dish.name} {dish.spicy && <span className="spicy-badge">(Spicy 🌶️)</span>}
        </h3>
        <p>Price: {dish.price} {currency}</p>
      </div>
      <button className="add-btn" onClick={() => dispatch({ type: 'ADD_ITEM', payload: dish })}>
        Add to Order
      </button>
    </Card>
  );
}

Dish.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    spicy: PropTypes.bool
  }).isRequired,
  currency: PropTypes.string
};