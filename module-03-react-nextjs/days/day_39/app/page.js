"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDishes() {
      try {
        const response = await fetch("/api/dishes");
        const data = await response.json();

        setDishes(data);
      } catch (error) {
        console.error("Error loading dishes:", error);
      } finally {
        setLoading(false);
      }
    }

    getDishes();
  }, []);

  return (
    <main>
      <h1>Welcome to Addis Eats 🍽️</h1>

      <p>Delicious Ethiopian food delivered to you.</p>

      <h2>Our Dishes</h2>

      {loading ? (
        <p>Loading dishes...</p>
      ) : (
        <div>
          {dishes.map((dish) => (
            <div key={dish.id}>
              <h3>{dish.name}</h3>
              <p>Category: {dish.category}</p>
              <p>Price: {dish.price} ETB</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}