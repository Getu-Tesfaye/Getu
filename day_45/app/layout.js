import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AutoLogout from "../components/AutoLogout";

export const metadata = {
  metadataBase: new URL("https://addis-eats-next-advanced-projects-ten.vercel.app"),
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
        url: "/preview.jpg",
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
        <Header />

        <AutoLogout />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}