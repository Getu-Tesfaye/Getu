import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";


function Menu({cart, setCart, favorites, setFavorites}) {

    const [search, setSearch] = useState("");

    
    const [searchParams, setSearchParams] = useSearchParams();
    const urlCategory = searchParams.get("category");
   const [category, setCategory] = useState(urlCategory || "All");

    const [dishes, setDishes] = useState([]);
    
    const [loading, setLoading] =useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
        fetch("/menu-data.json")
        .then((response) => response.json())
       .then((data) => {
    setDishes(data);

    setTimeout(() => {
        setLoading(false);
    }, 1000);
})
        .catch((error) => {
            setError("failed to load dishes.");
            setLoading(false);
        });

    }, []);

    const filteredDishes = dishes.filter((dish) => 
    dish.name.toLowerCase().includes(search.toLowerCase()) && (category === "All" || dish.category === category)
);

    return (
        <main className="menu-page">
            <h1>Our Menu</h1>

            {loading && (
    <div className="skeleton-grid">
        <div className="skeleton-card"></div>
        <div className="skeleton-card"></div>
        <div className="skeleton-card"></div>
        <div className="skeleton-card"></div>
    </div>
)}


            {error && <p>{error}</p>}
  <input type="search" placeholder="search dishes..." value={search}  onChange={(e) => setSearch(e.target.value)}></input>

             {filteredDishes.length === 0 && (
                <p>no dishes found</p>
            )}

            <div>
 <button onClick={() => {  setCategory("All"); setSearchParams({category: 'All'}); }}>All</button>

  <button onClick={() => { setCategory("Special"); setSearchParams({ category: "Special"}); }}>Special</button>

<button onClick={() => { setCategory("Pizza"); setSearchParams({ category: "Pizza"}); }}>Pizza</button>
                
<button onClick={() => { setCategory("Burgers"); setSearchParams({category: "Burgers"}); }}>Burgers</button>

 <button onClick={() => { setCategory("Drinks");  setSearchParams({category: "Drinks"}); }}>Drinks</button>

 <button onClick={() => {setCategory("Vegetables"); setSearchParams({category: "Vegetables"});  }}>Vegetables</button>
            </div>

           
           <div className="dish-grid">
            {filteredDishes.map((dish) => (
                <div key={dish.id} className="dish-card">
                    <img src={dish.image} alt={dish.name}
                    className="dish-image"/>

                    <h3>{dish.name}</h3>
                    <p>{dish.description}</p>
                    <p>{dish.price} ETB</p>

                    
                    <Link to={`/menu/${dish.id}`}>view Details</Link>

                    <br />

                    <button onClick={() => setCart([...cart,  { ...dish, quantity: 1}])}>Add to cart</button>


                    <span className="favorite-button" onClick={() => {
                        if (favorites.some((item) => item.id === dish.id)) {
                            setFavorites(
                                favorites.filter((item) => item.id !== dish.id)
                            );
                        }else {
                            setFavorites([...favorites, dish]); }  }}>{favorites.some((item) => item.id === dish.id) ? "♥" : "♡"}</span>
 

                </div>
            ))}

            </div>

        </main>
            
            
        
    );
}
export default Menu;