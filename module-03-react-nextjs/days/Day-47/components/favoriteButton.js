
"use client";

import { useEffect, useState } from "react";

export default function FavoriteButton({ dish }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("addis-eats-favorites") || "[]"
      );

      setIsFavorite(
        saved.some((item) => String(item.id) === String(dish.id))
      );
    } catch {
      setIsFavorite(false);
    }
  }, [dish.id]);

  function toggleFavorite() {
    try {
      const saved = JSON.parse(
        localStorage.getItem("addis-eats-favorites") || "[]"
      );

      const exists = saved.some(
        (item) => String(item.id) === String(dish.id)
      );

      const updated = exists
        ? saved.filter((item) => String(item.id) !== String(dish.id))
        : [...saved, dish];

      localStorage.setItem(
        "addis-eats-favorites",
        JSON.stringify(updated)
      );

      setIsFavorite(!exists);
      window.dispatchEvent(new Event("favorites-updated"));
    } catch {
      console.error("Could not update favorites.");
    }
  }

  return (
    <button
      type="button"
      className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
      onClick={toggleFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={isFavorite}
    >
      {isFavorite ? "❤️" : "♡"}
    </button>
  );
}
