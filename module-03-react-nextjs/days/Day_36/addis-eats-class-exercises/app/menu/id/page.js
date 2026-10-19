async function getDish(id) {
  const response = await fetch(
    "http://localhost:3000/menu-data.json",
    {
      cache: "no-store",
    }
  );

  const dishes = await response.json();

  return dishes.find((dish) => dish.id === Number(id));
}

export default async function DishPage({ params }) {
  const { id } = await params;

  const dish = await getDish(id);

  if (!dish) {
    return <h1>Dish not found</h1>;
  }

  return (
    <main>
      <h1>{dish.name}</h1>

      <img
        src={dish.image}
        alt={dish.name}
        width="300"
      />

      <p>{dish.description}</p>

      <p>ETB {dish.price}</p>

      <p>Category: {dish.category}</p>
    </main>
  );
}