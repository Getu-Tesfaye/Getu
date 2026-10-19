import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("addis_admin")?.value === "1";

  if (!isAdmin) {
    redirect("/login");
  }
}