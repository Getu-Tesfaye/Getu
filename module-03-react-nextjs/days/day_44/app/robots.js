export default function robots() {
  const baseUrl = "http://localhost:3000";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/checkout", "/orders"],
    },

    sitemap: `${baseUrl}/sitemap.xml`,
  };
}