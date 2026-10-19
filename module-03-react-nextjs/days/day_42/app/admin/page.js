import { getSession, clearSession } from "@/lib/session";


export default async function AdminPage() {

    const session = await getSession();

    async function logout() {
        "use server"
        await clearSession();
    }

    async function addDish(formData) {
    "use server";

    const name = formData.get("name");
    const price = formData.get("price");
    const category = formData.get("category");

    console.log(name, price, category);
  }

    if (!session || session.role !== "admin") {
        return (
            <main>
                <h1>Access Denied</h1>
                <p>you must login as admin.</p>
            </main>
        );
    } 

    return (
        <main>
            <h1>Admin Dashboard</h1>
            <p>welcome, {session.username}</p>
            <form action={logout}>
                <button type="submit">Logout</button>
            </form>

            <h2>manage dishes</h2>

            <form action={addDish}>
                <input type="text" name="name" placeholder="dish name"/>
                <input type="number" name="price" placeholder="price"/>
                <input type="text" name="category" placeholder="category"/>
                <button type="submit">Add Dish</button>

            </form>

            <h2>manage orders</h2>
            <p>View and update customer orders</p>
        </main>
    )
}