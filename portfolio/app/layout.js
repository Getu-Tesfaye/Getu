import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";
import Link from "next/link";
import "./globals.css";


export const metadata = {
  title: "Getu Tesfaye | Software Developer & QA Engineer",
  description:
    "Portfolio of Getu Tesfaye, Software Developer and QA Engineer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

         <CustomCursor />

  <header className="navbar">

          <Link href="/" className="logo">
            Getu<span>.</span>
          </Link>

          <nav>

            <Link href="/about">
              About
            </Link>

            <Link href="/skills">
              Skills
            </Link>

            <Link href="/projects">
              Projects
            </Link>

            <Link href="/experience">
              Experience
            </Link>

            <Link href="/education">
              Education
            </Link>

            <Link href="/contact">
              Contact
            </Link>

          </nav>

          <a
            href="https://github.com/Getu-Tesfaye"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-github"
          >
            GitHub ↗
          </a>

        </header>

        {children}

        <Footer />

      </body>
    </html>
  );
}