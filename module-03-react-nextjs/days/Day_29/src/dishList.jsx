export default function DishList({ dishes }) {
  if (dishes.length === 0) {
    return <p>No dishes found.</p>;
  }

  return (
    <ul>
      {dishes.map((dish) => (
        <li key={dish.id}>
          <strong>{dish.name}</strong> - ${dish.price.toFixed(2)}
          {dish.spicy && <span> 🌶️</span>}
          <span> ({dish.category})</span>
        </li>
      ))}
    </ul>
  );
}