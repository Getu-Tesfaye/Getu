import { redirect } from "next/navigation";
import { connection } from "next/server";
import { createClient } from "./supabase/server";

export async function requireLogin(nextPage, message) {
  await connection();
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims?.sub) {
    redirect(
      `/customer-login?next=${nextPage}&message=${encodeURIComponent(message)}`
    );
  }
}