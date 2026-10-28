
"use client";

import { useCallback, useEffect, useState } from "react";
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

export default function OwnerDashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [assignedCarIds, setAssignedCarIds] = useState([]);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (authError || !authData.user) {
        router.replace(
          `/signin?next=${encodeURIComponent("/owner-dashboard")}`
        );
        return;
      }

      setUser(authData.user);

      const [carsResponse, assignmentsResponse] = await Promise.all([
        fetch("/cars.json"),
        supabase
          .from("car_owners")
          .select("car_id")
          .eq("owner_id", authData.user.id),
      ]);

      if (!carsResponse.ok) {
        throw new Error("Could not load car information.");
      }

      if (assignmentsResponse.error) {
        throw assignmentsResponse.error;
      }

      const carData = await carsResponse.json();
      const carIds = (assignmentsResponse.data || []).map(
        (assignment) => assignment.car_id
      );

      setAssignedCarIds(carIds);

      setCars(carData);

      if (carIds.length === 0) {
        setBookings([]);
        return;
      }

      const { data: bookingData, error: bookingError } =
        await supabase
          .from("bookings")
          .select(
            "id, user_id, customer_name, car_id, start_date, end_date, status, created_at"
          )
          .in("car_id", carIds)
          .order("created_at", { ascending: false });

      if (bookingError) throw bookingError;

      setBookings(bookingData || []);
    } catch (err) {
      setError(err.message || "Could not load the owner dashboard.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  async function handleStatusChange(bookingId, newStatus) {
    setError("");
    setNotice("");
    setUpdatingId(bookingId);

    try {
      const { data, error } = await supabase
        .from("bookings")
        .update({ status: newStatus })
        .eq("id", bookingId)
        .select(
          "id, user_id, customer_name, car_id, start_date, end_date, status, created_at"
        )
        .single();

      if (error) throw error;

      setBookings((current) =>
        current.map((booking) =>
          booking.id === bookingId ? data : booking
        )
      );

      setNotice(`Booking status updated to ${newStatus}.`);
    } catch (err) {
      setError(
        err.message ||
        "Could not update this booking. Check your owner permissions."
      );
    } finally {
      setUpdatingId(null);
    }
  }

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
        <p className="dashboard-loading">Loading owner dashboard...</p>
      </main>
    );
  }

  const pendingCount = bookings.filter(
    (booking) => booking.status === "pending"
  ).length;

  const confirmedCount = bookings.filter(
    (booking) => booking.status === "confirmed"
  ).length;

  const cancelledCount = bookings.filter(
    (booking) => booking.status === "cancelled"
  ).length;



  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <span className="dashboard-eyebrow">OWNER PORTAL</span>
          <h1>Owner Dashboard</h1>
          <p>Manage reservation requests for your assigned vehicles.</p>
        </div>

        <button
          className="dashboard-outline-button"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </header>

      <section className="dashboard-welcome">
        <div className="dashboard-avatar">O</div>

        <div>
          <span>Signed in as owner</span>
          <h2>{user?.user_metadata?.full_name || "Car Owner"}</h2>
          <p>{user?.email}</p>
        </div>
      </section>

      {error && <p className="dashboard-error">{error}</p>}
      {notice && <p className="dashboard-success">{notice}</p>}

      <section className="dashboard-stats">
        <article className="dashboard-stat">
          <span>Booking requests</span>
          <strong>{bookings.length}</strong>
        </article>

        <article className="dashboard-stat">
          <span>Pending</span>
          <strong>{pendingCount}</strong>
        </article>

        <article className="dashboard-stat">
          <span>Confirmed</span>
          <strong>{confirmedCount}</strong>
        </article>

        <article className="dashboard-stat">
          <span>Cancelled</span>
          <strong>{cancelledCount}</strong>
        </article>
      </section>

      <section className="dashboard-section-heading">
        <div>
          <h2>Reservation requests</h2>
          <p>Review dates and update the status of each request.</p>
        </div>

        <button
          className="dashboard-outline-button"
          onClick={loadDashboard}
        >
          Refresh
        </button>
      </section>

      {assignedCarIds.length === 0 ? (
        <section className="dashboard-empty">
          <div className="dashboard-empty-icon">🔑</div>
          <h3>No cars assigned yet</h3>
          <p>
            Your account is signed in, but no car IDs have been assigned
            to it in Supabase. Ask the project administrator to assign
            your cars before managing bookings.
          </p>
        </section>
      ) : bookings.length === 0 ? (
        <section className="dashboard-empty">
          <div className="dashboard-empty-icon">📋</div>
          <h3>No booking requests yet</h3>
          <p>
            Your assigned vehicles do not have any bookings to display.
          </p>
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
                      <p>
                        {car?.category || "Rental car"} · Customer:{" "}
                        {booking.customer_name}
                      </p>
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

                  <div className="dashboard-actions">
                    {booking.status !== "confirmed" && (
                      <button
                        className="dashboard-confirm-button"
                        disabled={updatingId === booking.id}
                        onClick={() =>
                          handleStatusChange(booking.id, "confirmed")
                        }
                      >
                        Confirm
                      </button>
                    )}

                    {booking.status !== "cancelled" && (
                      <button
                        className="dashboard-cancel-button"
                        disabled={updatingId === booking.id}
                        onClick={() =>
                          handleStatusChange(booking.id, "cancelled")
                        }
                      >
                        Cancel
                      </button>
                    )}

                    {updatingId === booking.id && (
                      <span className="dashboard-muted">Saving...</span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}


      {/* Owner dashboard navigation */}
      <section className="owner-quick-links">
        <a href="/owner/cars" className="owner-quick-link">
          <span className="owner-quick-icon"></span>
          <span>
            <strong>My Cars</strong>
            <small>Add, view and edit your cars</small>
          </span>
          <span className="owner-quick-arrow">→</span>
        </a>

        <a href="/owner/bookings" className="owner-quick-link">
          <span className="owner-quick-icon">📅</span>
          <span>
            <strong>Bookings</strong>
            <small>Manage booking requests</small>
          </span>
          <span className="owner-quick-arrow">→</span>
        </a>

        <a href="/owner/earnings" className="owner-quick-link">
          <span className="owner-quick-icon">💰</span>
          <span>
            <strong>Earnings</strong>
            <small>View estimated booking value</small>
          </span>
          <span className="owner-quick-arrow">→</span>
        </a>

        <a href="/owner/reviews" className="owner-quick-link">
          <span className="owner-quick-icon">⭐</span>
          <span>
            <strong>Reviews</strong>
            <small>Customer reviews</small>
          </span>
          <span className="owner-quick-arrow">→</span>
        </a>
      </section>

    </main>
  );
}
