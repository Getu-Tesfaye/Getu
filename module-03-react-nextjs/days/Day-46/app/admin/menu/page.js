import Image from "next/image";
import { getDishes } from "../../../data/dishes";

export default async function AdminMenuPage() {
  const dishes = await getDishes();

  return (
    <div>
      <h1>Manage Menu</h1>

      <p>Available dishes in Addis Eats.</p>

      <div className="admin-table">
        <div className="admin-table-header">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Actions</span>
        </div>

        {dishes.map((dish) => (
          <div
            className="admin-table-row"
            key={dish.id}
          >
            <Image
              src={dish.image}
              alt={dish.name}
              width={100}
              height={70}
            />

            <strong>{dish.name}</strong>

            <span>{dish.category}</span>

            <span>{dish.price} ETB</span>

            <div>
              <button className="small-button">
                Edit
              </button>

              <button className="delete-button">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}