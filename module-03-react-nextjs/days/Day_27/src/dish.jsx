import PropTypes from 'prop-types';

function Dish({ dishName, cost, isSpicy }) {
  return (
    <article className="menu-item">
      <h4>{dishName}</h4>
      <span className="price-tag">{cost} birr</span>
      {isSpicy && <em className="spicy-flag">spicy
         🔥</em>}
    </article>
   
  );
}

Dish.propTypes = {
  dishName: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  isSpicy: PropTypes.bool,
};

Dish.defaultProps = {
  cost: 100,
};

export default Dish;