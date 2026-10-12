import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AutoLogout from "../components/AutoLogout";

export const metadata = {
  title: "Addis Eats | Ethiopian Food Delivery",
  description:
    "Order delicious Ethiopian food online with Addis Eats. Explore our menu and enjoy your favorite dishes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />

        <AutoLogout />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}