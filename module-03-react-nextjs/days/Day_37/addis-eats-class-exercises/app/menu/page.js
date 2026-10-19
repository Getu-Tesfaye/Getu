import { Suspense } from "react";
import DishList from "./DishList";

export const revalidate = 60;

export default function Menu() {
  return (
    <main>
      <h1>Our Menu</h1>

      <Suspense fallback={<p>Loading dishes...</p>}>
        <DishList />
      </Suspense>
    </main>
  );
}