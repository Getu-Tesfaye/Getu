import Image from "next/image";
import Link from "next/link";

export default function DishCard({ dish }) {
  return (
    <div>
      <Link href={`/menu/${dish.id}`}>
        <Image
          src={dish.image}
          alt={dish.name}
          width={400}
          height={300}
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </Link>

      <h2>{dish.name}</h2>
      <p>{dish.price} ETB</p>
      <p>{dish.description}</p>

      <Link href={`/menu/${dish.id}`}>
        View Details
      </Link>
    </div>
  );
}