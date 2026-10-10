
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboardClient from "../../components/AdminDashboardClient";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("addis_admin")?.value === "1";

  if (!isAdmin) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <p>
        Welcome to the Addis Eats administration dashboard.
      </p>

      <AdminDashboardClient />
    </div>
  );
}
