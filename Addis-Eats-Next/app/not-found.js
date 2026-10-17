import Link from "next/link";

export default function NotFound() {
  return (
    <div className="error-page">
      <h1>404</h1>

      <h2>Page Not Found</h2>

      <p>The page you are looking for does not exist.</p>

      <Link href="/" className="button">
        Go Home
      </Link>
    </div>
  );
}