import { createAdminClient } from "./supabase/admin";

export async function getDashboardOrders() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("orders")
    .select("id, neighbourhood:delivery_area, total, status, created_at")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}