import { useState, useEffect } from "react";

function AdminMenu() {

    const [dishes, setDishes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [editingDish, setEditingDish] = useState(null);
    const [search, setSearch] = useState("");
   
    

    useEffect(() => {
        fetch("/menu-data.json")
          .then((response) => response.json())
          .then((data) => {
            setDishes(data);
        });
 }, []);
 
 useEffect(() => {
    localStorage.setItem("addis-eats-dishes", JSON.stringify(dishes));
}, [dishes]);

   function handleSubmit(e) {
    e.preventDefault();
    
    const newDish = { id: Date.now(), name: name, price: Number(price), category: category, image: image};

    setDishes([...dishes, newDish]); setName(""); setPrice(""); setCategory(""); setImage("");}

    function handleUpdate() { 
    setDishes(
     dishes.map((dish) =>
     dish.id === editingDish.id ? editingDish : dish )  );

    setEditingDish(null);
}


function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this dish?");

    if (confirmDelete) {
        const updatedDishes = dishes.filter((dish) => dish.id !== id);

        setDishes(updatedDishes);
    }
}

 
    return (
        <div className="admin-menu-page">
            <h1>Dishes</h1>
            <div className="admin-menu-top">
            <input
    type="text"
    placeholder="Search dishes..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="admin-search"
/>


            <button className="add-dish-button" onClick={() => setShowForm(true)}>Add new Dish</button>
            </div>

            {showForm && (
                <form className="dish-form" onSubmit={handleSubmit}>
                    <label>Dish name:</label>
                    <input placeholder="Dish name" value={name} 
                    onChange={(e) => setName(e.target.value)}/>
                    <br/>
                    <label>Dish price:</label>
                    <input placeholder="price" value={price}
                    onChange={(e) => setPrice(e.target.value)}/>
                    <br/>
                    <label>category</label>
                    <input placeholder="category" value={category}
                    onChange={(e) => setCategory(e.target.value)}/>
                    <br/>
                    <label>Image path</label>
                    <input placeholder="image" value={image} 
                    onChange={(e) => setImage(e.target.value)} />

                    <br/>
                    <button type="submit">Add Dish</button>
                    <button type="button" onClick={() => setShowForm(false)}>cancel</button>
                    </form>
                    
            )}
        

            {editingDish && (
                <div className="edit-dish">
                    <h2>Edit Dish</h2>
  
     <input value={editingDish.name}  onChange={(e) =>   setEditingDish({  ...editingDish,   name:e.target.value})}/>
 <br/>
    <input value={editingDish.price}  onChange={(e) =>  setEditingDish({...editingDish,    price: e.target.value})} />
<br/>
     <input value={editingDish.description} onChange={(e) => setEditingDish({   ...editingDish,  description: e.target.value})} />
<br/>
     <input value={editingDish.image} onChange={(e) => setEditingDish({...editingDish, image: e.target.value})}/>  
     <br/>
     <button type="button" onClick={handleUpdate}> Update Dish</button>
 </div>
 )}

 <div className="admin-dish-header">
    <span>Image</span>
    <span>Name</span>
    <span>Category</span>
    <span>Price</span>
    <span>Actions</span>
</div>
            
    {dishes
    .filter((dish) =>
        dish.name.toLowerCase().includes(search.toLowerCase())
)
      .map((dish) => (
            <div key={dish.id} className="admin-dish-card">
              <img className="admin-dish-image" src={dish.image} alt={dish.name}/>

        <h3>{dish.name}</h3>

        <p className="category">{dish.category}</p>

        <p className="price">price:ETB {dish.price.toFixed(2)} </p>

        <div className="admin-dish-actions">

        <button onClick={() => setEditingDish(dish)}> Edit  </button>

        <button onClick={() => handleDelete(dish.id)}>  Delete </button>
        </div>
    </div>
))}
        </div>
    );
}
export default AdminMenu;