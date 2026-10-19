"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Menu() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/menu-data.json")
      .then((response) => response.json())
      .then((data) => {
        setDishes(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading menu...</p>;
  }

  return (
    <main>
      <h1>Our Menu</h1>

      {dishes.map((dish) => (
        <div key={dish.id}>
          <img
            src={dish.image}
            alt={dish.name}
            width="200"
          />

          <h2>{dish.name}</h2>
          <p>{dish.description}</p>
          <p>ETB {dish.price}</p>

          <Link href={`/menu/${dish.id}`}>
            View Dish
          </Link>
        </div>
      ))}
    </main>
  );
}