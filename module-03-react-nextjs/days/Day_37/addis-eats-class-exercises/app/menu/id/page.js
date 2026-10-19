import { notFound } from "next/navigation";

async function getDishes() {
  const response = await fetch(
    "http://localhost:3000/menu-data.json"
  );

  return response.json();
}

export async function generateStaticParams() {
  const dishes = await getDishes();

  return dishes.map((dish) => ({
    id: String(dish.id),
  }));
}

export default async function DishPage({ params }) {
  const { id } = await params;

  const dishes = await getDishes();

  const dish = dishes.find(
    (item) => item.id === Number(id)
  );

  if (!dish) {
    notFound();
  }

  return (
    <main>
      <h1>{dish.name}</h1>

      <img
        src={dish.image}
        alt={dish.name}
        className="dish-detail-image"
      />

      <p>{dish.description}</p>

      <p>ETB {dish.price}</p>

      <p>Category: {dish.category}</p>
    </main>
  );
}