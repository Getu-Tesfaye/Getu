import dishes from "./menu/data";

export default function sitemap() {
  const baseUrl = "http://localhost:3000";

  const dishUrls = dishes.map((dish) => ({
    url: `${baseUrl}/menu/${dish.id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: new Date(),
    },
    ...dishUrls,
  ];
}