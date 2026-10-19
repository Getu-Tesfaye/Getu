export async function loadDishes(category = "All", signal) {
  const response = await fetch("/dishes.json", { signal });

  // Check res.ok and throw a clear message if response fails
  if (!response.ok) {
    throw new Error(`Failed to fetch dishes: ${response.statusText}`);
  }

  const data = await response.json();

  if (category !== "All") {
    return data.filter((dish) => dish.category === category);
  }

  return data;
}