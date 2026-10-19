
import { createClient } from "./server";

export async function testSupabaseConnection() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("dishes")
    .select("id")
    .limit(1);

  if (error) {
    console.error("Supabase connection failed:", error.message);
    return { success: false, error: error.message };
  }

  console.log("Supabase connection successful!");
  return { success: true, data };
}
