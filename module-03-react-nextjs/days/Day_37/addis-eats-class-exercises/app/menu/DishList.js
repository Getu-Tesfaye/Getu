import Link from "next/link";

export default async function DishList() {
  const response = await fetch(
    "http://localhost:3000/menu-data.json"
  );

  const dishes = await response.json();

  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <article className="dish-card" key={dish.id}>
          <img
            src={dish.image}
            alt={dish.name}
          />

          <h2>{dish.name}</h2>

          <p>{dish.description}</p>

          <p>ETB {dish.price}</p>

          <Link href={`/menu/${dish.id}`}>
            View Dish
          </Link>
        </article>
      ))}
    </div>
  );
}