import dishes from "../data/dishes";

function Menu() {
  return (
    <div>
      <h2>Our Menu</h2>

      <div className="dish-list">
        {dishes.map((dish) => (
          <div className="dish-card" key={dish.id}>
            <img
              src={dish.image}
              alt={dish.name}
              className="dish-image"
            />

            <div className="dish-info">
              <h3>{dish.name}</h3>
              <p>{dish.description}</p>
              <strong>{dish.price} ETB</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;