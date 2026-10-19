import Dish from "./Dish";
import "./App.css";

function Header() {
  return (
    <header>
      <h1>Addis Eats</h1>
      <p>Fresh Ethiopian meals, delivered fast.</p>
    </header>
  );
}

function App() {
  const dishes = [
    { id: 1, name: "Doro Wat", price: 10},
    { id: 2, name: "Tibs", price: 10.0 },
    { id: 3, name: "Shiro", price: 5 },
    { id: 4, name: "Kitfo", price: 9 },
    { id: 5, name: "Injera Combo", price: 12.0 },
  ];

  return (
    <div className="app">
      <Header />
      <main className="menu">
        {dishes.map((dish) => (
          <Dish key={dish.id} name={dish.name} price={dish.price} />
        ))}
      </main>
    </div>
  );
}

export default App;