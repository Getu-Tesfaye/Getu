import Header from './Header';
import Dish from './Dish';

const dishes = [
  { id: 1, name: 'Doro Wat', price: 10 },
  { id: 2, name: 'Tibs', price: 10 },
  { id: 3, name: 'Shiro', price: 5 },
  { id: 4, name: 'Kitfo', price: 9 },
  { id: 5, name: 'Injera Combo', price: 12 },
];

function App() {
  return (
    <>
      <Header />
      {dishes.map((dish) => (
        <Dish key={dish.id} name={dish.name} price={dish.price} />
      ))}
    </>
  );
}

export default App;