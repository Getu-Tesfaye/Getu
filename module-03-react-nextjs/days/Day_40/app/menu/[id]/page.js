import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDishById } from "../../../data/dishes";
import AddToCartButton from "../../../components/AddToCartButton";

export default async function DishDetailPage({ params }) {
  const { id } = await params;

  const dish = await getDishById(id);

  if (!dish) {
    notFound();
  }

  return (
    <div className="detail-page">
      <div className="detail-image">
        <Image
          src={dish.image}
          alt={dish.name}
          width={900}
          height={700}
        />
      </div>

      <div className="detail-content">
        <p className="category">{dish.category}</p>

        <h1>{dish.name}</h1>

        <p>{dish.description}</p>

        <h2>{dish.price} ETB</h2>

        <h3>Ingredients</h3>

        <ul>
          {dish.ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>

        <AddToCartButton dish={dish} />

        <br />
        <br />

        <Link href="/menu">
          ← Back to Menu
        </Link>
      </div>
    </div>
  );
}