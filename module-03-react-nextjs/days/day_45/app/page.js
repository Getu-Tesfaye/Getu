import Link from "next/link";
import Image from "next/image";
import { getDishes } from "../data/dishes";
import DishCard from "../components/DishCard";

export default async function HomePage() {
  const dishes = await getDishes();

  const specialDishes = dishes
    .filter((dish) => dish.category === "Special")
    .slice(0, 4);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <p className="small-title"></p>

          <h1>Addis Eats</h1>

          <p>
            Delicious Ethiopian food delivered directly to your door.
          </p>

          <Link href="/menu" className="button">
            Explore Menu
          </Link>
        </div>

        <div className="hero-image">
          <Image
            src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80"
            alt="Delicious food"
            width={1200}
            height={800}
            priority
          />
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>Today's Specials</h2>

          <Link href="/menu">
            View All
          </Link>
        </div>

        <div className="dish-grid">
          {specialDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      </section>
    </div>
  );
}