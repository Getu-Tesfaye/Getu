
"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url) =>
    fetch(url, { cache: "no-store" }).then((response) => {
        if (!response.ok) {
            throw new Error("Failed to load cars");
        }

        return response.json();
    });


export default function CarsPage() {
    const { data: cars = [],   error,   isLoading,} = useSWR("/cars.json", fetcher, { refreshInterval: 10000, });
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All cars");


    const debouncedSearch = useDebouncedValue(search, 500);
    function useDebouncedValue(value, delay = 500) {
        const [debouncedValue, setDebouncedValue] = useState(value);

        useEffect(() => {
            const timer = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => clearTimeout(timer);
        }, [value, delay]);

        return debouncedValue;
    }



    const categories = ["All cars", "Compact", "SUV", "Premium"];
    const filteredCars = cars.filter((car) => {

        const matchesSearch = car.name.toLowerCase().includes(debouncedSearch.toLowerCase());

        const matchesCategory = selectedCategory === "All cars" || car.category === selectedCategory;

        return matchesSearch && matchesCategory;
    })

    if (isLoading) {
        return <p>Loading cars...</p>;
    }

    if (error) {
        return <p>Could not load cars. Please try again.</p>;
    }
    return (
        <main>
            <h1>explore our cars</h1>
            <p>find the right cars for your next trip.</p>

            <div className="car-filters">
                <input type="search" placeholder="search cars" value={search}
                    onChange={(e) => setSearch(e.target.value)}
                     aria-label="search cars by name" />


                <div className="category-buttons">
                    {categories.map((category) => (
                        <button key={category} type="button"
                            className={selectedCategory === category ? "active" : ""}
                            onClick={() => setSelectedCategory(category)}>{category}</button>
                    ))}

                </div>
            </div>

            <section className="card-grid">
                {filteredCars.length === 0 ? (<p className="no-cars-found">No cars found, try another search or category</p>) :
                filteredCars.map((car) => (
                    <article className="car-card" key={car.id}>
                        <Link href={`/cars/${car.id}`} className="car-card-link">

                            <Image src={car.image}
                                alt={car.name}
                                width={400}
                                height={250}
                                loading="eager"
                                className="car-page-image"></Image>
                                
                        </Link>

                        <div className="car-details">
                            <p className="car-category">{car.category}</p>
                            <h2>{car.name}</h2>
                            <p>{car.description}</p>
                            <p>{car.price}</p>
                            <span>View Details →</span>

                        </div>

                    </article>
                ))}
            </section>


        </main>
    );
}