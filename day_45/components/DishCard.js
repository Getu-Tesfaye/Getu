import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

export default function DishCard({ dish }) {
  return (
    <div className="dish-card">

      <Link href={`/menu/${dish.id}`}>
        <Image
          src={dish.image}
          alt={dish.name}
          width={900}
          height={600}
          className="dish-card-image"
        />
      </Link>

      <div className="dish-card-content">

        <h2>{dish.name}</h2>

        <p>{dish.description}</p>

        <p className="dish-price">
          {dish.price} ETB
        </p>

        <AddToCartButton dish={dish} />

      </div>
    </div>
  );
}