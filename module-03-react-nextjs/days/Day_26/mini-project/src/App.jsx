import Header from './Header';
import Dish from './Dish';

const dishes = [
  { id: 1, name: 'Doro Wat', price: 250 },
  { id: 2, name: 'Tibs', price: 220 },
  { id: 3, name: 'Shiro', price: 150 },
  { id: 4, name: 'Kitfo', price: 280 },
  { id: 5, name: 'Injera Combo', price: 350 },
];

function App() {
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