import dishes from "../data";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const dish = dishes.find((dish) => dish.id === Number(id));

  if (!dish) {
    return {
      title: "Dish Not Found",
      description: "The requested dish could not be found.",
    };
  }

  return {
    title: dish.name,
    description: dish.description,

    openGraph: {
      title: dish.name,
      description: dish.description,
      images: [dish.image],
    },
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;

  const dish = dishes.find((dish) => dish.id === Number(id));

  if (!dish) {
    return <h1>Dish not found</h1>;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.description,
    image: dish.image,
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: "ETB",
    },
  };

  return (
    <main>
      <h1>{dish.name}</h1>

      <p>{dish.price} ETB</p>

      <p>{dish.description}</p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </main>
  );
}