

"use client"

export default function CategoryBar({ categories, selectedCategory, setSelectedCategory}) {

    return (

        <div>
            {categories.map((category) => (
                <button
                    key={category} 
                    onClick={() => setSelectedCategory(category)}>{category}
                </button>
            ))}
        </div>
    )
}