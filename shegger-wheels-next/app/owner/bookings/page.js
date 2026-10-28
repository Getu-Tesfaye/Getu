"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function OwnerBookingsPage() {
  const router = useRouter();

  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    setLoading(true);
    setError("");

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;

      if (!user) {
        router.replace("/signin");
        return;
      }

      const { data: assignments, error: assignmentError } =
        await supabase
          .from("car_owners")
          .select("car_id")
          .eq("owner_id", user.id);

      if (assignmentError) throw assignmentError;

      const carIds = (assignments || []).map(
        (item) => item.car_id
      );

      if (carIds.length === 0) {
        setBookings([]);
        return;
      }

      const { data: carRows, error: carError } = await supabase
        .from("cars")
        .select("id, name")
        .in("id", carIds);

      if (carError) throw carError;

      const carNames = Object.fromEntries(
        (carRows || []).map((car) => [car.id, car.name])
      );

      const { data: bookingRows, error: bookingError } =
        await supabase
          .from("bookings")
          .select(
            "id, user_id, customer_name, car_id, start_date, end_date, status, created_at"
          )
          .in("car_id", carIds)
          .order("created_at", { ascending: false });

      if (bookingError) throw bookingError;

      setBookings(
        (bookingRows || []).map((booking) => ({
          ...booking,
          car_name: carNames[booking.car_id] || `Car ${booking.car_id}`,
        }))
      );
    } catch (err) {
      setError(err.message || "Unable to load bookings.");
    } finally {
      setLoading(false);
    }
  }

  async function updateBookingStatus(bookingId, newStatus) {
    setUpdatingId(bookingId);
    setError("");
    setMessage("");

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;

      if (!user) {
        throw new Error("Please sign in again.");
      }

      // Confirm that this booking belongs to one of this owner's cars.
      const { data: assignments, error: assignmentError } =
        await supabase
          .from("car_owners")
          .select("car_id")
          .eq("owner_id", user.id);

      if (assignmentError) throw assignmentError;

      const carIds = (assignments || []).map(
        (assignment) => assignment.car_id
      );

      const booking = bookings.find(
        (item) => item.id === bookingId
      );

      if (!booking || !carIds.includes(booking.car_id)) {
        throw new Error("You cannot update this booking.");
      }

      if (
        !["confirmed", "cancelled"].includes(newStatus)
      ) {
        throw new Error("Invalid booking status.");
      }

      if (booking.status !== "pending") {
        throw new Error(
          "Only pending bookings can be approved or cancelled."
        );
      }

      const { data: updatedBooking, error: updateError } =
        await supabase
          .from("bookings")
          .update({ status: newStatus })
          .eq("id", bookingId)
          .eq("status", "pending")
          .select("id, status")
          .maybeSingle();

      if (updateError) throw updateError;

      if (!updatedBooking) {
        throw new Error(
          "The booking was not updated. It may already have changed."
        );
      }

      setBookings((previous) =>
        previous.map((item) =>
          item.id === bookingId
            ? { ...item, status: updatedBooking.status }
            : item
        )
      );

      setMessage(
        newStatus === "confirmed"
          ? "Booking approved successfully."
          : "Booking cancelled successfully."
      );
    } catch (err) {
      setError(err.message || "Unable to update booking.");
    } finally {
      setUpdatingId(null);
    }
  }

  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === filter);

  function formatDate(value) {
    if (!value) return "Not provided";

    const date = new Date(`${value}T00:00:00`);

    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleDateString();
  }

  if (loading) {
    return (
      <main className="owner-bookings-page">
        <p className="owner-bookings-loading">
          Loading bookings...
        </p>
      </main>
    );
  }

  return (
    <main className="owner-bookings-page">
      <header className="owner-bookings-header">
        <div>
          <h1>Car Bookings</h1>
          <p>Review and manage bookings for your vehicles.</p>
        </div>

        <div className="owner-bookings-header-actions">
          <Link href="/owner-dashboard">
            Dashboard
          </Link>

          <button type="button" onClick={loadBookings}>
            Refresh
          </button>
        </div>
      </header>

      {error && (
        <div className="owner-error" role="alert">
          {error}
        </div>
      )}

      {message && (
        <div className="owner-success" role="status">
          {message}
        </div>
      )}

      <section className="owner-booking-summary">
        <div>
          <span>Total Bookings</span>
          <strong>{bookings.length}</strong>
        </div>

        <div>
          <span>Pending</span>
          <strong>
            {
              bookings.filter(
                (booking) => booking.status === "pending"
              ).length
            }
          </strong>
        </div>

        <div>
          <span>Confirmed</span>
          <strong>
            {
              bookings.filter(
                (booking) => booking.status === "confirmed"
              ).length
            }
          </strong>
        </div>

        <div>
          <span>Cancelled</span>
          <strong>
            {
              bookings.filter(
                (booking) => booking.status === "cancelled"
              ).length
            }
          </strong>
        </div>
      </section>

      <nav className="owner-booking-filters" aria-label="Filter bookings">
        {["all", "pending", "confirmed", "cancelled"].map(
          (status) => (
            <button
              key={status}
              type="button"
              className={filter === status ? "active" : ""}
              onClick={() => setFilter(status)}
            >
              {status === "all"
                ? "All Bookings"
                : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          )
        )}
      </nav>

      {filteredBookings.length === 0 ? (
        <section className="owner-bookings-empty">
          <h2>No bookings found</h2>
          <p>
            {filter === "all"
              ? "There are no bookings for your cars yet."
              : `There are no ${filter} bookings.`}
          </p>
        </section>
      ) : (
        <section className="owner-bookings-list">
          {filteredBookings.map((booking) => (
            <article
              key={booking.id}
              className="owner-booking-card"
            >
              <div className="owner-booking-card-header">
                <div>
                  <h2>{booking.car_name}</h2>
                  <p>
                    Booking ID: {booking.id}
                  </p>
                </div>

                <span
                  className={`owner-booking-status owner-booking-status-${String(
                    booking.status || "pending"
                  ).toLowerCase()}`}
                >
                  {booking.status || "pending"}
                </span>
              </div>

              <div className="owner-booking-details">
                <p>
                  <strong>Customer:</strong>{" "}
                  {booking.customer_name || "Not provided"}
                </p>

                <p>
                  <strong>Start date:</strong>{" "}
                  {formatDate(booking.start_date)}
                </p>

                <p>
                  <strong>End date:</strong>{" "}
                  {formatDate(booking.end_date)}
                </p>

                <p>
                  <strong>Requested:</strong>{" "}
                  {booking.created_at
                    ? new Date(booking.created_at).toLocaleString()
                    : "Not available"}
                </p>
              </div>

              {booking.status === "pending" && (
                <div className="owner-booking-actions">
                  <button
                    type="button"
                    disabled={updatingId === booking.id}
                    onClick={() =>
                      updateBookingStatus(
                        booking.id,
                        "confirmed"
                      )
                    }
                  >
                    {updatingId === booking.id
                      ? "Updating..."
                      : "Approve Booking"}
                  </button>

                  <button
                    type="button"
                    className="owner-booking-cancel-button"
                    disabled={updatingId === booking.id}
                    onClick={() =>
                      updateBookingStatus(
                        booking.id,
                        "cancelled"
                      )
                    }
                  >
                    Cancel Booking
                  </button>
                </div>
              )}
            </article>
          ))}
        </section>
      )}
    </main>
  );
}