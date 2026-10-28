import Link from "next/link";
import Image from "next/image";
import { readFile } from "node:fs/promises";
import path from "node:path";

async function getCars() {
    const filePath = path.join(process.cwd(), "public", "cars.json");
    const fileContents = await readFile(filePath, "utf8");

    return JSON.parse(fileContents);
}

export default async function carDetailsPage({ params }) {
    const { id } = await params;
    const cars = await getCars();

    const car = cars.find((item => item.id === Number(id)));
    if (!car) {
        return <h1>car not found</h1>
    }

    return (
        <main>
            <div className="car-details-page">
                <Image
                    src={car.image}
                    alt={car.name}
                    width={700}
                    height={450} />

                <h1>{car.name}</h1>
                <p>{car.description}</p>
                <p>{car.category}</p>
                <Link href="/cars">Back to cars</Link>
                <Link href={`/bookings?carId=${car.id}`} className="book-car-button">
                    Book This Car
                </Link>

            </div>
        </main>
    );
}

