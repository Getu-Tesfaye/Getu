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
            src="/images/landing1.jpg"
            alt="Delicious food"
            width={800}
            height={400}
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