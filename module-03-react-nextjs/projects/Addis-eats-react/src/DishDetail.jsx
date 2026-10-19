import  { Link, useParams} from "react-router-dom";
import { useState, useEffect } from "react";

function DishDetail({cart, setCart}) {

    const [dishes, setDishes] = useState([]);
    useEffect(() => {
        fetch("/menu-data.json")
        .then((response) => response.json())
        .then((data) => {
            setDishes(data);
        });

    }, []);

    const {id} = useParams();

    const dish = dishes.find((item) => item.id === Number(id));

    if (dishes.length === 0) {
        return <p>Loading...</p>;
    }

    if (!dish) {
        return (
            <main className="dish-detail">
                <h2>Dish not found</h2>
                <Link to="/menu">Back to Menu</Link>
            </main>
        );
    }

    return (
        <main className="dish-detail">
            <img src={dish.image} alt={dish.name}
            className="dish-detail-image"/>

            <h1>{dish.name}</h1>
            <p>{dish.description}</p>
            <p>{dish.price}</p>
            <button onClick={() => {
                setCart([ ...cart, { ...dish, quantity: 1 }])}}>Add to cart</button>

            <h2>ingredients</h2>

            <ul>
                {dish.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>

                ))}
            </ul>

            <Link to="/menu">Back to Menu</Link>
        </main>
    );
}
    
        
    

export default DishDetail;