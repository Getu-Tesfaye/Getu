
"use client";

import { useRouter } from "next/navigation";

export default function OwnerReviewsPage() {
  const router = useRouter();

  return (
    <main className="owner-earnings-page">
      <div className="owner-earnings-header">
        <div>
          <p className="owner-earnings-eyebrow">OWNER PORTAL</p>
          <h1>Customer Reviews</h1>
          <p>
            View customer feedback about your rental cars.
          </p>
        </div>
      </div>

      <section className="owner-earnings-table-section">
        <div className="owner-earnings-empty">
          <h3>Reviews feature is being prepared</h3>
          <p>
            The review list and owner replies will be connected after
            the reviews table and its columns are confirmed in Supabase.
          </p>
        </div>
      </section>

      <button
        className="owner-earnings-back"
        type="button"
        onClick={() => router.push("/owner-dashboard")}
      >
        Back to Owner Dashboard
      </button>
    </main>
  );
}
