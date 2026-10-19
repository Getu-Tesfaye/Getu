import Image from "next/image";

export default function DishCard({dish, priority}) {

    return (

        <div>

            <Image src={dish.image}
            alt={dish.name}
            width={400}
            height={300}
            sizes="(max-width: 768px) 100vw, 400px"
            priority={priority}/>

            <h2>{dish.name}</h2>
            <p>{dish.price} ETB</p>
            <p>{dish.description}</p>
        </div>
    );
}