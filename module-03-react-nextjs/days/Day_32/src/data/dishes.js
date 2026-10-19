export async function fetchDishes() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood');
  const data = await response.json();

  // Transform raw API data into your app's dish format
  return data.meals.slice(0, 4).map((meal, index) => ({
    id: meal.idMeal,
    name: meal.strMeal,
    price: 12 + index * 3, // Dynamic price calculation
    image: meal.strMealThumb, // Dynamic image URL directly from API
  }));
}