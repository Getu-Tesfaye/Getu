
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get("addis_admin");

  if (!adminCookie?.value) {
    redirect("/login");
  }

  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret || adminCookie.value !== secret) {
    redirect("/login");
  }
}
