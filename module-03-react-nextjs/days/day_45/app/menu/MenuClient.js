
"use client";

import { useState, useEffect } from "react";

import useSWR from "swr";
import Link from "next/link";
import DishCard from "../../components/DishCard";


const fetcher = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to load dishes");
    }

    return response.json();
};

export default function MenuClient({ selectedCategory }) {

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);


    const { data: dishes, error, isLoading, } = useSWR("/api/dishes", fetcher, { revalidateOnFocus: true, refreshInterval: 5000, });

    const categories = [
        "All",
        "Special",
        "Pizza",
        "Burgers",
        "Drinks",
    ];

    if (isLoading) {
        return <p>Loading dishes...</p>;
    }

    if (error) {
        return <p>Could not load dishes. Please try again.</p>;
    }

    const filteredDishes = dishes.filter((dish) => {

        const matchesCategory =
            selectedCategory === "All" ||
            dish.category === selectedCategory;

        const matchesSearch =
            dish.name.toLowerCase().includes(debouncedSearch.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="page">
            <div className="page-heading">
                <h1>Our Menu</h1>
                <p>Explore delicious food from Addis Eats.</p>
            </div>
            <div className="search-box">
                <input 
                type="text"
                placeholder="search dishes"
                value={search}
                onChange={(e) => setSearch(e.target.value)}/>

            </div>

            <div className="category-buttons">
                {categories.map((category) => (
                    <Link
                        key={category}
                        href={category === "All"
                            ? "/menu"
                            : `/menu?category=${category}`}
                        className={
                            selectedCategory === category
                                ? "active-category"
                                : ""}
                    >  {category} </Link>

                ))}
            </div>

            {filteredDishes.length === 0 ? (
                <div className="empty">
                    <h2>No dishes found.</h2>
                    <p>
                        There are no dishes in the {selectedCategory} category.
                    </p>
                </div>
            ) : (
                <div className="dish-grid">
                    {filteredDishes.map((dish) => (
                        <DishCard key={dish.id} dish={dish} />
                    ))}
                </div>
            )}
        </div>
    );
}
