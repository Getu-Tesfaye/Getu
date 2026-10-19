import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Welcome to Addis Eats</h1>

      <p>Delicious food delivered to you.</p>

      <Link href="/menu">
        View Our Menu
      </Link>
    </main>
  );
}