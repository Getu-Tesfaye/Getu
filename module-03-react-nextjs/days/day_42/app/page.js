import MenuSearch from "./menuSearch";

export default function Home() {
  return (
    <>
      <nav>
        <h2>Addis Eats</h2>

        <a href="/">Home</a>
        <a href="/menu">Menu</a>
        <a href="/orders">Orders</a>
        <a href="/login">Admin Login</a>
      </nav>

      <MenuSearch />
    </>
  );
}