import Checkout from "./checkout/Checkout";

function App() {
  const cartTotal = 500;
  return (
    <main>
      <Checkout total={cartTotal} />

    </main>
  );
}
export default App;