
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

 function ReportDisputeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const bookingId = searchParams.get("bookingId");

  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function checkUser() {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.replace(
          `/signin?next=${encodeURIComponent(
            `/report-dispute?bookingId=${bookingId || ""}`
          )}`
        );
        return;
      }

      setUser(data.user);
      setLoading(false);
    }

    checkUser();
  }, [router, bookingId]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!bookingId) {
      setError("Booking ID is missing. Please open this page from My Bookings.");
      return;
    }

    if (!title.trim() || !description.trim()) {
      setError("Please enter a problem title and description.");
      return;
    }

    setSubmitting(true);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      if (!token) {
        router.replace("/signin");
        return;
      }

      const response = await fetch("/api/disputes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          booking_id: bookingId,
          title: title.trim(),
          description: description.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Could not submit your report.");
      }

      setSuccess("Your problem report was submitted successfully.");
      setTitle("");
      setDescription("");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="dashboard-page">
        <p className="dashboard-loading">Checking your account...</p>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <span className="dashboard-eyebrow">RENTER PORTAL</span>
          <h1>Report a Problem</h1>
          <p>Tell our administration team about an issue with your booking.</p>
        </div>
      </header>

      <section className="dashboard-welcome">
        <div>
          <span>Reporting as</span>
          <h2>{user?.user_metadata?.full_name || "Renter"}</h2>
          <p>{user?.email}</p>
        </div>
      </section>

      <section className="dashboard-booking-card">
        <div className="dashboard-booking-info">
          <span className="dashboard-muted">BOOKING REFERENCE</span>
          <h3>{bookingId ? bookingId.slice(0, 8) : "Missing booking"}</h3>
          <p>Your report will be linked to this reservation.</p>
        </div>
      </section>

      {error && <p className="dashboard-error">{error}</p>}

      {success && (
        <p className="dashboard-success">{success}</p>
      )}

      <form onSubmit={handleSubmit} className="dashboard-report-form">
        <div>
          <label htmlFor="problem-title">Problem title</label>
          <input
            id="problem-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Example: Car was not provided"
            maxLength={150}
            required
          />
        </div>

        <div>
          <label htmlFor="problem-description">Describe the problem</label>
          <textarea
            id="problem-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Explain what happened and how we can help..."
            rows={6}
            maxLength={5000}
            required
          />
        </div>

        <button
          type="submit"
          className="dashboard-primary-link"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Report"}
        </button>

        <Link href="/my-bookings" className="dashboard-outline-button">
          Back to My Bookings
        </Link>
      </form>
    </main>
  );
}


export default function ReportDisputePage() {
  return (
    <Suspense
      fallback={
        <main className="dashboard-page">
          <p className="dashboard-loading">
            Loading report form...
          </p>
        </main>
      }
    >
      <ReportDisputeContent />
    </Suspense>
  );
}