
import "server-only";
import { createClient } from "@/lib/supabase/server";

export async function getDishes() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("dishes")
    .select("*")
    .order("name", { ascending: true })
    .range(0, 999);

  if (error) {
    console.error("Error fetching dishes:", error.message);
    throw new Error("Failed to fetch dishes from Supabase.");
  }

  console.log("Dishes returned by Supabase:", data.length);
  console.log("Dish names:", data.map((dish) => dish.name));

  return data.map((dish) => ({
    ...dish,
    image: dish.image_url,
  }));
}

export async function getDishById(id) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("dishes")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching dish:", error.message);
    throw new Error("Failed to fetch dish from Supabase.");
  }

  if (!data) {
    return null;
  }

  return {
    ...data,
    image: data.image_url,
  };
}
