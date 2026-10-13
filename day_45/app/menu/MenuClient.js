
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

export default function MenuClient({ selectedCategory = "All" }) {
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const dishesPerPage = 4;

    const categories = [
        "All",
        "Dinner",
        "Breakfast",
        "Special",
        "Drinks",
        "Habesha",
        "Traditional",
    ];

    // Debounce search input by 500 milliseconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    // Reset pagination when search or category changes
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, selectedCategory]);

    // Load dishes from the API with SWR
    const {
        data: dishes,
        error,
        isLoading,
        mutate,
    } = useSWR("/api/dishes", fetcher, {
        revalidateOnFocus: true,
        refreshInterval: 30000,
    });

    if (isLoading) {
        return (
            <div className="page">
                <div className="page-heading">
                    <h1>Our Menu</h1>
                    <p>Loading delicious dishes...</p>
                </div>

                <div className="dish-grid">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            className="dish-card skeleton-card"
                            key={index}
                        >
                            <div className="skeleton-image"></div>

                            <div className="dish-card-content">
                                <div className="skeleton-line skeleton-title"></div>
                                <div className="skeleton-line"></div>
                                <div className="skeleton-line skeleton-price"></div>
                                <div className="skeleton-button"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error || !Array.isArray(dishes)) {
        return (
            <div className="page">
                <div className="empty">
                    <h2>Could not load the menu.</h2>
                    <p>Please check your connection and try again.</p>

                    <button onClick={() => mutate()}>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Filter dishes by category and search text
    const filteredDishes = dishes.filter((dish) => {
        const matchesCategory =
            selectedCategory.toLowerCase() === "all" ||
            dish.category?.trim().toLowerCase() ===
            selectedCategory.trim().toLowerCase();

        const searchText = debouncedSearch.trim().toLowerCase();

        const matchesSearch =
            (dish.name || "").toLowerCase().includes(searchText) ||
            (dish.description || "").toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;
    });

    // Pagination
    const totalPages = Math.ceil(
        filteredDishes.length / dishesPerPage
    );

    const startIndex = (currentPage - 1) * dishesPerPage;

    const currentDishes = filteredDishes.slice(
        startIndex,
        startIndex + dishesPerPage
    );

    return (
        <div className="page">
            <div className="page-heading">
                <h1>Our Menu</h1>
                <p>Explore delicious food from Addis Eats.</p>
            </div>

            {/* Search appears before the category buttons */}
            <div className="menu-controls">
                
                <div className="search-box">
                    <span className="search-icon" aria-hidden="true">
                        🔍
                    </span>

                    <input
                        type="search"
                        placeholder="Search dishes..."
                        aria-label="Search dishes"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>
                

                <div className="category-buttons">
                    {categories.map((category) => (
                        <Link
                            key={category}
                            href={
                                category === "All"
                                    ? "/menu"
                                    : `/menu?category=${encodeURIComponent(category)}`
                            }
                            className={
                                selectedCategory.toLowerCase() ===
                                    category.toLowerCase()
                                    ? "active-category"
                                    : ""
                            }
                        >
                            {category}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Menu results */}
            {filteredDishes.length === 0 ? (
                <div className="empty">
                    <h2>No dishes found.</h2>
                    <p>
                        Try another category or search for a different dish.
                    </p>
                </div>
            ) : (
                <>
                    <div className="dish-grid">
                        {currentDishes.map((dish) => (
                            <DishCard
                                key={dish.id}
                                dish={dish}
                            />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage((page) => page - 1)
                                }
                            >
                                Previous
                            </button>

                            <span>
                                Page {currentPage} of {totalPages}
                            </span>

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() =>
                                    setCurrentPage((page) => page + 1)
                                }
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
