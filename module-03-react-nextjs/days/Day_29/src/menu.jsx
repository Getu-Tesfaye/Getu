import { useState, useEffect, useRef } from "react";
import { loadDishes } from "./api";
import DishList from "./DishList";

export default function Menu() {
  const [dishes, setDishes] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  
  const searchInputRef = useRef(null);

  
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  // Fetch data, refetch on category change, and abort old requests on cleanup
  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const data = await loadDishes(category, controller.signal);
        setDishes(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    // Abort request on cleanup or component unmount
    return () => controller.abort();
  }, [category]);

  return (
    <div>
      {/* Search Input with ref */}
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search menu..."
      />

      {/* Category Filter */}
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="All">All Categories</option>
        <option value="Starters">Starters</option>
        <option value="Mains">Mains</option>
        <option value="Drinks">Drinks</option>
      </select>

      {/* Conditional UI Rendering */}
      {loading && <p>Loading menu...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && <DishList dishes={dishes} />}
    </div>
  );
}