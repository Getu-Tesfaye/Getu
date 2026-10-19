function Dish({ name, price }) {
  return (
    <div className="dish-card">
      <h3>{name}</h3>
      <p>${price.toFixed(2)}</p>
    </div>
  );
}

export default Dish;