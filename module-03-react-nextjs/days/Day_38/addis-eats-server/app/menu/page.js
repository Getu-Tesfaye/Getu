import FilterShell from "./filterShell";

export default async function Menu() {
     
    const response = await fetch("http://localhost:3000/menu-data.json");

    if (!response.ok) {
        throw new Error("failed to loads");
    }

    const dishes = await response.json();
    const categories = ["All", "Special",];

    return (
        <main>

            <h1>our menu</h1>

           <FilterShell 
                      dishes={dishes}
                      categories={categories} />

            
        </main>
    );

}