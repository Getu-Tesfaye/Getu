import { useParams, Link } from "react-router-dom";
import { useCart } from "../CartProvider";
import dishes from "../data/dishes";

function DishDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const dish = dishes.find((d) => d.id === id);

  if (!dish) {
    return (
      <section>
        <p>Dish not found.</p>
        <Link to="/menu">Back to menu</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>{dish.name}</h1>
      <p>{dish.category}</p>
      <p>${dish.price}</p>
      <button onClick={() => addItem(dish)}>Add to cart</button>
    </section>
  );
}
export default DishDetail;
