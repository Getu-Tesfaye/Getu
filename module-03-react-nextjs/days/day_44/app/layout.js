import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("http://localhost:3000"),

  title: {
    template: "%s · Addis Eats",
    default: "Addis Eats",
  },

  description:
    "Addis Eats is an Ethiopian food delivery website in Addis Ababa.",

  openGraph: {
    title: "Addis Eats",
    description:
      "Explore Ethiopian food and dishes from Addis Eats.",
    images: ["/images/DORO.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}