import DishCard from "./DishCard";
import dishes from "./data";

export const metadata = {
  title: "Menu",
  description: "Explore Ethiopian dishes, including Doro Wat, Kitfo, Shiro and Tibs.",
};

export default function Menu() {
  return (
    <main>
      <h1>Menu</h1>

      <div className="dish-list">
        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </main>
  );
}