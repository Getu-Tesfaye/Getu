
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

function formatDate(value) {
  if (!value) return "Not available";

  return new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BookingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.id;

  const [booking, setBooking] = useState(null);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadBooking() {
      setLoading(true);
      setError("");

      try {
        const { data: authData, error: authError } =
          await supabase.auth.getUser();

        if (authError) throw authError;

        if (!authData.user) {
          router.replace(
            `/signin?next=${encodeURIComponent(
              `/bookings/${bookingId}`
            )}`
          );
          return;
        }

        const { data, error: bookingError } = await supabase
          .from("bookings")
          .select(
            "id, user_id, customer_name, car_id, start_date, end_date, status, created_at"
          )
          .eq("id", bookingId)
          .eq("user_id", authData.user.id)
          .maybeSingle();

        if (bookingError) throw bookingError;

        if (!data) {
          throw new Error(
            "Booking not found, or you do not have permission to view it."
          );
        }

        const carsResponse = await fetch("/cars.json");

        if (!carsResponse.ok) {
          throw new Error("Could not load car information.");
        }

        const cars = await carsResponse.json();

        const selectedCar = cars.find(
          (item) => String(item.id) === String(data.car_id)
        );

        if (!active) return;

        setBooking(data);
        setCar(selectedCar || null);
      } catch (err) {
        if (active) {
          setError(err.message || "Could not load booking details.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    if (bookingId) {
      loadBooking();
    } else {
      setLoading(false);
      setError("Booking ID is missing.");
    }

    return () => {
      active = false;
    };
  }, [bookingId, router]);

  if (loading) {
    return (
      <main className="booking-details-page">
        <div className="booking-details-message">
          <div className="booking-details-spinner" />
          <h2>Loading booking details...</h2>
          <p>Please wait while we retrieve your booking.</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="booking-details-page">
        <div className="booking-details-message">
          <div className="booking-details-error-icon">!</div>
          <h1>Booking unavailable</h1>
          <p>{error}</p>
          <Link
            href="/my-bookings"
            className="booking-details-primary-button"
          >
            View My Bookings
          </Link>
        </div>
      </main>
    );
  }

  if (!booking) return null;

  const status = String(booking.status || "pending").toLowerCase();

  const statusClass = {
    pending: "booking-details-pending",
    confirmed: "booking-details-confirmed",
    cancelled: "booking-details-cancelled",
    declined: "booking-details-declined",
  }[status] || "booking-details-default-status";

  return (
    <main className="booking-details-page">
      <div className="booking-details-container">
        <Link
          href="/my-bookings"
          className="booking-details-back-link"
        >
          ← Back to My Bookings
        </Link>

        <header className="booking-details-header">
          <div>
            <p className="booking-details-eyebrow">SHEGGAR WHEELS</p>
            <h1>Booking Details</h1>
            <p className="booking-details-subtitle">
              Review the information for your car rental.
            </p>
          </div>

          <span className={`booking-details-status ${statusClass}`}>
            {status}
          </span>
        </header>

        <section className="booking-details-card">
          <div className="booking-details-car-section">
            {car?.image ? (
              <img
                src={car.image}
                alt={car.name || "Rental car"}
                className="booking-details-car-image"
              />
            ) : (
              <div className="booking-details-image-placeholder">
                Car image unavailable
              </div>
            )}

            <div className="booking-details-car-info">
              <p className="booking-details-eyebrow">YOUR RENTAL CAR</p>
              <h2>{car?.name || `Car #${booking.car_id}`}</h2>
              <p className="booking-details-category">
                {car?.category || "Rental vehicle"}
              </p>
              {car?.price && (
                <p className="booking-details-price">
                  Car price: {car.price} ETB
                </p>
              )}

              {car?.dailyPrice != null && (
                <p className="booking-details-daily-price">
                  Rental rate: {Number(car.dailyPrice).toLocaleString()} ETB / day
                </p>
              )}
            </div>
          </div>

          <div className="booking-details-divider" />

          <h2 className="booking-details-section-title">
            Rental information
          </h2>

          <div className="booking-details-grid">
            <div className="booking-details-item">
              <span className="booking-details-icon">▣</span>
              <div>
                <p className="booking-details-label">Pickup date</p>
                <p className="booking-details-value">
                  {formatDate(booking.start_date)}
                </p>
              </div>
            </div>

            <div className="booking-details-item">
              <span className="booking-details-icon">▣</span>
              <div>
                <p className="booking-details-label">Return date</p>
                <p className="booking-details-value">
                  {formatDate(booking.end_date)}
                </p>
              </div>
            </div>

            <div className="booking-details-item">
              <span className="booking-details-icon">♙</span>
              <div>
                <p className="booking-details-label">Customer</p>
                <p className="booking-details-value">
                  {booking.customer_name || "Not available"}
                </p>
              </div>
            </div>

            <div className="booking-details-item">
              <span className="booking-details-icon">#</span>
              <div>
                <p className="booking-details-label">Booking reference</p>
                <p className="booking-details-value">{booking.id}</p>
              </div>
            </div>

            <div className="booking-details-item">
              <span className="booking-details-icon">◷</span>
              <div>
                <p className="booking-details-label">Request created</p>
                <p className="booking-details-value">
                  {booking.created_at
                    ? new Date(booking.created_at).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )
                    : "Not available"}
                </p>
              </div>
            </div>
          </div>

          <div className="booking-details-notice">
            <strong>Booking status: </strong>
            {status === "pending"
              ? "Your request is waiting for the owner to respond."
              : status === "confirmed"
                ? "Your booking has been confirmed."
                : status === "cancelled"
                  ? "This booking has been cancelled."
                  : status === "declined"
                    ? "The owner declined this booking."
                    : `Your booking is ${status}.`}
          </div>

          {car?.description && (
            <div className="booking-details-description">
              <h3>About this car</h3>
              <p>{car.description}</p>
            </div>
          )}

          <div className="booking-details-actions">
            <Link
              href="/my-bookings"
              className="booking-details-primary-button"
            >
              My Bookings
            </Link>

            <Link
              href="/cars"
              className="booking-details-secondary-button"
            >
              Browse Cars
            </Link>
          </div>
        </section>

        <p className="booking-details-footer">
          Need help with your reservation? Contact the car owner through
          your available support channel.
        </p>
      </div>
    </main>
  );
}
