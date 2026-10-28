
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

function formatDate(value) {
  if (!value) return "Not provided";

  return new Date(`${value}T00:00:00`).toLocaleDateString(
    undefined,
    { year: "numeric", month: "short", day: "numeric" }
  );
}

export default function MyBookingsPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      setLoading(true);
      setError("");

      try {
        const { data: authData, error: authError } =
          await supabase.auth.getUser();

        if (authError || !authData.user) {
          router.replace(
            `/signin?next=${encodeURIComponent("/my-bookings")}`
          );
          return;
        }

        if (!active) return;

        setUser(authData.user);

        const [carsResponse, bookingsResponse] = await Promise.all([
          fetch("/cars.json"),
          supabase
            .from("bookings")
            .select(
              "id, customer_name, car_id, start_date, end_date, status, created_at"
            )
            .eq("user_id", authData.user.id)
            .order("created_at", { ascending: false }),
        ]);

        if (!carsResponse.ok) {
          throw new Error("Could not load car information.");
        }

        const carData = await carsResponse.json();

        if (bookingsResponse.error) {
          throw bookingsResponse.error;
        }

        if (!active) return;

        setCars(carData);
        setBookings(bookingsResponse.data || []);
      } catch (err) {
        if (active) {
          setError(err.message || "Could not load your bookings.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadDashboard();

    return () => {
      active = false;
    };
  }, [router]);

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setError(error.message);
      return;
    }

    router.replace("/signin");
  }

  if (loading) {
    return (
      <main className="dashboard-page">
        <p className="dashboard-loading">Loading your dashboard...</p>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <span className="dashboard-eyebrow">RENTER PORTAL</span>
          <h1>My Bookings</h1>
          <p>Manage your trips and keep track of your car reservations.</p>
        </div>

        <button
          className="dashboard-outline-button"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </header>

      <section className="dashboard-welcome">
        <div className="dashboard-avatar">
          {(user?.user_metadata?.full_name || user?.email || "U")
            .charAt(0)
            .toUpperCase()}
        </div>

        <div>
          <span>Welcome back</span>
          <h2>
            {user?.user_metadata?.full_name || "Renter"}
          </h2>
          <p>{user?.email}</p>
        </div>
      </section>

      {error && <p className="dashboard-error">{error}</p>}

      <section className="dashboard-stats">
        <article className="dashboard-stat">
          <span>Total bookings</span>
          <strong>{bookings.length}</strong>
        </article>

        <article className="dashboard-stat">
          <span>Pending</span>
          <strong>
            {bookings.filter((b) => b.status === "pending").length}
          </strong>
        </article>

        <article className="dashboard-stat">
          <span>Confirmed</span>
          <strong>
            {bookings.filter((b) => b.status === "confirmed").length}
          </strong>
        </article>
      </section>

      <div className="dashboard-section-heading">
        <div>
          <h2>Your reservations</h2>
          <p>Only bookings made by your account appear here.</p>
        </div>

        <Link href="/cars" className="dashboard-primary-link">
          Browse Cars
        </Link>
      </div>

      {bookings.length === 0 ? (
        <section className="dashboard-empty">
          <div className="dashboard-empty-icon"></div>
          <h3>No bookings yet</h3>
          <p>
            Find a car you like and submit your first booking request.
          </p>
          <Link href="/cars" className="dashboard-primary-link">
            Explore Cars
          </Link>
        </section>
      ) : (
        <section className="dashboard-booking-list">
          {bookings.map((booking) => {
            const car = cars.find(
              (item) => String(item.id) === String(booking.car_id)
            );


            return (
              <article className="dashboard-booking-card" key={booking.id}>
                {car?.image ? (
                  <img
                    className="dashboard-car-image"
                    src={car.image}
                    alt={car.name || "Rental car"}
                  />
                ) : (
                  <div className="dashboard-car-placeholder">🚘</div>
                )}

                <div className="dashboard-booking-info">
                  <div className="dashboard-booking-title">
                    <div>
                      <span className="dashboard-muted">
                        BOOKING #{String(booking.id).slice(0, 8)}
                      </span>
                      <h3>{car?.name || `Car #${booking.car_id}`}</h3>
                      <p>{car?.category || "Rental car"}</p>
                      <div className="dashboard-booking-actions">
                        <Link
                          href={`/bookings/${booking.id}`}
                          className="dashboard-primary-link"
                        >
                          View Details
                        </Link>

                        <Link
                          href={`/report-dispute?bookingId=${booking.id}`}
                          className="dashboard-outline-button"
                        >
                          Report a Problem
                        </Link>
                      </div>
                    </div>

                    <span
                      className={`dashboard-status status-${booking.status}`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="dashboard-date-grid">
                    <div>
                      <span>Pickup date</span>
                      <strong>{formatDate(booking.start_date)}</strong>
                    </div>

                    <div>
                      <span>Return date</span>
                      <strong>{formatDate(booking.end_date)}</strong>
                    </div>
                  </div>

                  <p className="dashboard-booking-name">
                    Booked by: {booking.customer_name}
                  </p>
                </div>
              </article>
            );
          })}
        </section>
      )}


    </main>
  );
}
