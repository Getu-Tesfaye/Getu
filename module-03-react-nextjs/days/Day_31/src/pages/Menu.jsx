
import { Link, useSearchParams } from "react-router-dom";
import  dishes  from "../data/dishes";

 function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "All";

  const filtered =
    category === "All" ? dishes : dishes.filter((d) => d.category === category);

  const categories = ["All", ...new Set(dishes.map((d) => d.category))];

  return (
    <section>
      <h1>Menu</h1>
      <div>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSearchParams(c === "All" ? {} : { category: c })}
          >
            {c}
          </button>
        ))}
      </div>
      <ul>
        {filtered.map((dish) => (
          <li key={dish.id}>
            <Link to={`/menu/${dish.id}`}>{dish.name}</Link> — ${dish.price}
          </li>
        ))}
      </ul>
    </section>
  );
}
export default Menu;