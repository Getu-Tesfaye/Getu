import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AutoLogout from "../components/AutoLogout";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000")
  ),
  title: "Ethiopian Food Delivery in Addis Ababa · Addis Eats",
  description:
    "Order Ethiopian dishes, fresh injera, and traditional wots delivered across Addis Ababa.",
  openGraph: {
    title: "Ethiopian Food Delivery in Addis Ababa · Addis Eats",
    description:
      "Order Ethiopian dishes, fresh injera, and traditional wots delivered across Addis Ababa.",
    url: "/",
    siteName: "Addis Eats",
    images: [
      {
        url: "/images/preview.jpg",
        width: 1200,
        height: 630,
        alt: "Ethiopian food from Addis Eats",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <Header />

        <AutoLogout />

        <main id="main">{children}</main>

        <Footer />
      </body>
    </html>
  );
}