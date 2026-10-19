import DishCard from "./DishCard";

const dishes = [

    {
        id: 1,
        name: "doro wat",
        price: 400,
        description: "traditional ethiopian minched beef dish",
        image: "/images/DORO.jpg",
    },
    {
        id: 2,
        name: "kitfo",
        price: 240,
        description: "traditional ethiopian food",
        image: "/images/kitfo.jpg",
    },
    {
        id: 3,
        name: "shiro",
        price: 300,
        description: "delicious ethiopian food chickpea stew",
        image: "/images/SHIRO.jpg",
    },
    {
        id: 4,
        name: "burger",
        price: 500,
        description: "fast food ethiopian food",
        image: "/images/TIBSS.jpg",
    },
];

export default function Menu() {

    return (

    <main>

        <h1>Menu</h1>

        <div className="dish-list">
            {dishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
            ))}
                
        </div>
    </main>
    );
}