import Link from "next/link";
import { getDishes } from "../../data/dishes";
import DishCard from "../../components/DishCard";

export default async function MenuPage({ searchParams }) {
  const dishes = await getDishes();

  const params = await searchParams;
  const selectedCategory = params?.category || "All";

  const categories = [
    "All",
    "Special",
    "Pizza",
    "Burgers",
    "Drinks",
  ];

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter(
          (dish) => dish.category === selectedCategory
        );

  return (
    <div className="page">
      <div className="page-heading">
        <h1>Our Menu</h1>

        <p>
          Explore delicious food from Addis Eats.
        </p>
      </div>

      {/* CATEGORY BAR */}
      <div className="category-buttons">
        {categories.map((category) => (
          <Link
            key={category}
            href={
              category === "All"
                ? "/menu"
                : `/menu?category=${category}`
            }
            className={
              selectedCategory === category
                ? "active-category"
                : ""
            }
          >
            {category}
          </Link>
        ))}
      </div>

      {/* DISHES */}
      {filteredDishes.length === 0 ? (
        <div className="empty">
          <h2>No dishes found.</h2>

          <p>
            There are no dishes in the{" "}
            {selectedCategory} category.
          </p>
        </div>
      ) : (
        <div className="dish-grid">
          {filteredDishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
            />
          ))}
        </div>
      )}
    </div>
  );
}