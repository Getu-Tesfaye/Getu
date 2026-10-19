

const dishes = [
    {id: 1,
    name: "doro wat",
    price: 300,
    category: "special",
},
{
    id: 2,
    name: "shiro",
    price: 200,
    category: "special",

},
{
    id: 3,
    name: "kitfo",
    price: 400,
    category: "traditional",

},
{
    id: 4,
    name: "burger",
    price: 600,
    category: "burger",

},
{
    id: 5,
    name: "pizza",
    price: 500,
    category: "pizza",
},

];


export default function MenuPage() {
    return (
        <main>

            <h1>Menu</h1>
            <div className="dish-list">

                <div className="dish-row header">
                    <span>name</span>
                    <span>price</span>
                    <span>category</span>
                </div>

            {dishes.map((dish) => (
                <div className="dish-row" key={dish.id}>
                    <span>{dish.name}</span>
                    <span>{dish.price} ETB</span>
                    <span>{dish.category}</span>
                </div>
            ))}
        </div>
        </main>
    )
}