
import "server-only";

import { getDishes, getDishById } from "../data/dishes";

export async function fetchAllDishes() {
  return await getDishes();
}

export async function fetchDishById(id) {
  return await getDishById(id);
}
