
"use client"

import { useState } from "react";
import CategoryBar from "./categoryBar";

export default function FilterShell({ dishes, categories }) {

    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredDishes = selectedCategory === "All" ? dishes
        : dishes.filter((dish) => dish.category === selectedCategory);


    return (

        <>

        <categoryBar categories={categories}
                      setCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}/>


                      <div className="category-buttons">

                        {categories.map((category) => (
                            <button 
                            key={category} 
                            onClick={() => setSelectedCategory(category)}>{category}</button>
                        ))}
                      </div>

                      <div className="dish-grid">

                        {filteredDishes.map((dish) => (
                            < div className="dish-card" key={dish.id}>

                                <img 
                                src={dish.image}
                                alt={dish.name}
                                width="200" />

                        <div className="dish-card-content">
                                <h2>{dish.name}</h2>
                                <p>{dish.category}</p>
                                <p className="dish-price">{dish.price}</p>
                                </div>
                                </div>
                        ))}
                      </div>
                       


     </>
    );
}