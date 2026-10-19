import MenuClient from "./MenuClient";

export default async function MenuPage({ searchParams }) {
  const params = await searchParams;
  const selectedCategory = params?.category || "All";

  return (
    <MenuClient selectedCategory={selectedCategory} />
  );
}