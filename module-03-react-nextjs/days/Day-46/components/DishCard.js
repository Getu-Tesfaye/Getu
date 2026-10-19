
import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import FavoriteButton from "./favoriteButton";

export default function DishCard({ dish, priority = false }) {
  return (
    <div className="dish-card">
      <div className="dish-card-image-wrapper">
        <Link href={`/menu/${dish.id}`}>
          <Image
            src={dish.image}
            alt={dish.name}
            width={400}
            height={300}
            className="dish-card-image"
            priority={priority}
          />
        </Link>

        <FavoriteButton dish={dish} />
      </div>

      <div className="dish-card-content">
        <h2>{dish.name}</h2>

        <p>{dish.description}</p>

        <p className="dish-price">
          {dish.price} ETB
        </p>

        {dish.is_available && (
          <AddToCartButton dish={dish} />
        )}
      </div>
    </div>
  );
}
