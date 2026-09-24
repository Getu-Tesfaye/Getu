import "./globals.css";

export const metadata = {
  title: "Getu Tesfaye | Software & QA Engineer",
  description: "Portfolio of Getu Tesfaye",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}