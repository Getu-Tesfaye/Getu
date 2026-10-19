
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "../../components/LogoutButton";

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();

  const adminCookie = cookieStore.get("addis_admin")?.value;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret || adminCookie !== secret) {
    redirect("/login");
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>🍽️ Addis Eats</h2>

        <p>Admin Panel</p>

        <nav>
          <Link href="/admin">Dashboard</Link>

          <Link href="/admin/menu">Menu</Link>

          <Link href="/admin/orders">Orders</Link>
        </nav>

        <LogoutButton />
      </aside>

      <section className="admin-content">
        {children}
      </section>
    </div>
  );
}
