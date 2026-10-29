
"use client";

export const dynamic = "force-dynamic";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import { supabase } from "../../lib/supabase";
import { downloadCsv } from "@/lib/csv";
import { when, relative } from "@/lib/format";


const DeliveryMap = dynamic(
  () => import("../track/[id]/DeliveryMap"),
  {
    ssr: false,
    loading: () => (
      <div className="admin-map-loading">
        Loading map...
      </div>
    ),
  }
);

const adminLinks = [
  { label: "Car Listings", href: "/admin/cars" },
  { label: "Users", href: "/admin/users" },
  { label: "Bookings", href: "/admin/bookings" },
  { label: "Disputes", href: "/admin/disputes" },
  { label: "Reports", href: "/admin/reports" },
  { label: "Announcements", href: "/admin/announcements" },
];

const DEFAULT_COURIER = [9.03, 38.74];
const DEFAULT_DELIVERY = [9.02, 38.75];

export default function AdminPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [connection, setConnection] = useState("Connecting");
  const [errorMessage, setErrorMessage] = useState("");

  const courier = DEFAULT_COURIER;
  const delivery = DEFAULT_DELIVERY;
  const deliveryAddress = "Addis Ababa, Ethiopia";

  const stats = {
    cars: cars.length,
    pendingCars: cars.filter(
      (car) =>
        String(car.status).toLowerCase() === "pending"
    ).length,
    bookings: bookings.length,
    pendingBookings: bookings.filter(
      (booking) =>
        String(booking.status).toLowerCase() === "pending"
    ).length,
  };

  const loadData = useCallback(async () => {
    setLoading(true);

    try {
      const [carsResult, bookingsResult] = await Promise.all([
        supabase.from("cars").select("*"),

        supabase
          .from("bookings")
          .select("*")
          .order("created_at", { ascending: false }),
      ]);

      if (carsResult.error) {
        throw new Error(carsResult.error.message);
      }

      if (bookingsResult.error) {
        throw new Error(bookingsResult.error.message);
      }

      const carRows = Array.isArray(carsResult.data)
        ? carsResult.data
        : [];

      const bookingRows = Array.isArray(bookingsResult.data)
        ? bookingsResult.data
        : [];

      setCars(carRows);
      setBookings(bookingRows);
      setErrorMessage("");
      setConnection("Connected");

      console.log(
        "Admin dashboard bookings:",
        bookingRows.length
      );
    } catch (error) {
      console.error("Admin dashboard loading error:", error);

      setErrorMessage(
        error.message || "Could not load dashboard data."
      );

      setConnection("Check connection");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let channel;
    let cancelled = false;

    async function startDashboard() {
      const { data, error } = await supabase.auth.getUser();

      if (cancelled) return;

      if (error || !data?.user) {
        router.replace("/admin-login");
        return;
      }

      await loadData();

      if (cancelled) return;

      channel = supabase
        .channel("admin-dashboard-live")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "cars",
          },
          () => loadData()
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "bookings",
          },
          () => loadData()
        );

      channel.subscribe((status) => {
        if (cancelled) return;

        setConnection(
          status === "SUBSCRIBED"
            ? "Connected"
            : status
        );
      });
    }

    startDashboard();

    // Fallback refresh in case a realtime event is missed.
    const refreshInterval = setInterval(() => {
      if (!cancelled) loadData();
    }, 30000);

    return () => {
      cancelled = true;
      clearInterval(refreshInterval);

      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [router, loadData]);

  useEffect(() => {
    if (!selectedBooking) return;

    const latestBooking = bookings.find(
      (booking) => booking.id === selectedBooking.id
    );

    if (latestBooking !== selectedBooking) {
      setSelectedBooking(latestBooking ?? null);
    }
  }, [bookings, selectedBooking]);

  function getCar(booking) {
    return cars.find(
      (car) =>
        String(car.id) === String(booking.car_id)
    );
  }

  function getCoordinates(booking) {
    const car = getCar(booking);

    const latitude = Number(
      car?.latitude ?? car?.lat ?? booking.latitude
    );

    const longitude = Number(
      car?.longitude ?? car?.lng ?? booking.longitude
    );

    if (
      Number.isFinite(latitude) &&
      Number.isFinite(longitude) &&
      latitude >= -90 &&
      latitude <= 90 &&
      longitude >= -180 &&
      longitude <= 180
    ) {
      return [latitude, longitude];
    }

    return DEFAULT_DELIVERY;
  }

  const selectedCar = selectedBooking
    ? getCar(selectedBooking)
    : null;

  const deliveryCoordinates = selectedBooking
    ? getCoordinates(selectedBooking)
    : DEFAULT_DELIVERY;

  async function exportBookingHistory() {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
  console.error("CSV booking query error:", error);
  alert("Booking query failed: " + error.message);
  return;
}

console.log("CSV booking rows:", data?.length ?? 0);

    const rows = (data ?? []).map((booking) => ({
      booking_id: booking.id ?? "",
      customer_id: booking.user_id ?? "",
      customer_name: booking.customer_name ?? "",
      car_id: booking.car_id ?? "",
      start_date: booking.start_date ?? "",
      end_date: booking.end_date ?? "",
      status: booking.status ?? "",
      created_at: booking.created_at ?? "",
    }));

    downloadCsv(
      "sheggar-wheels-booking-history.csv",
      rows
    );
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace("/admin-login");
  }

  return (
    <main className="admin-page admin-dashboard-modern">
      <header className="admin-header admin-header-modern">
        <div>
          <p className="admin-eyebrow">SHEGGAR WHEELS</p>

          <h1>Admin Dashboard</h1>

          <p className="admin-subtitle">
            Manage cars, bookings, locations, and platform activity.
          </p>

          <div className="admin-connection">
            <span
              className={
                connection === "Connected"
                  ? "connection-dot connection-online"
                  : "connection-dot"
              }
            />
            <span>Live connection: {connection}</span>
          </div>
        </div>

        <div className="admin-header-actions">
          <button
            type="button"
            className="admin-button"
            onClick={loadData}
            disabled={loading}
          >
            {loading ? "Loading..." : "↻ Refresh"}
          </button>

          <button
            type="button"
            className="admin-button admin-export-button"
            onClick={exportBookingHistory}
          >
            ↓ Export Booking CSV
          </button>

          <button
            type="button"
            className="admin-button admin-signout-button"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </header>

      {errorMessage && (
        <div className="admin-error-message" role="alert">
          <strong>Could not load dashboard data</strong>
          <p>{errorMessage}</p>
          <button
            type="button"
            className="booking-action-button"
            onClick={loadData}
          >
            Try again
          </button>
        </div>
      )}

      <section className="admin-stats-grid">
        <article className="admin-stat-card">
          <span className="admin-stat-label">TOTAL CARS</span>
          <h2>Total Cars</h2>
          <p>{loading ? "..." : stats.cars}</p>
          <span className="admin-stat-note">
            Cars in the database
          </span>
        </article>

        <article className="admin-stat-card">
          <span className="admin-stat-label">NEEDS REVIEW</span>
          <h2>Pending Cars</h2>
          <p>{loading ? "..." : stats.pendingCars}</p>
          <span className="admin-stat-note">
            Awaiting review
          </span>
        </article>

        <article className="admin-stat-card">
          <span className="admin-stat-label">ALL BOOKINGS</span>
          <h2>Total Bookings</h2>
          <p>{loading ? "..." : stats.bookings}</p>
          <span className="admin-stat-note">
            All booking records returned
          </span>
        </article>

        <article className="admin-stat-card">
          <span className="admin-stat-label">NEEDS REVIEW</span>
          <h2>Pending Bookings</h2>
          <p>{loading ? "..." : stats.pendingBookings}</p>
          <span className="admin-stat-note">
            Awaiting confirmation
          </span>
        </article>
      </section>

      <section className="admin-tools-section admin-tools-modern">
        <div className="admin-section-heading">
          <div>
            <p className="booking-section-eyebrow">
              PLATFORM CONTROL
            </p>
            <h2>Administration</h2>
            <p>
              Manage users, vehicles, bookings, and reports.
            </p>
          </div>
        </div>

        <div className="admin-tools-grid">
          {adminLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              className="admin-tool-card"
              onClick={() => router.push(link.href)}
            >
              <span>{link.label}</span>
              <span aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      </section>

      <section className="admin-disputes-panel admin-map-panel">
        <div className="admin-panel-heading">
          <div>
            <p className="booking-section-eyebrow">
              LOCATION OVERVIEW
            </p>
            <h2>Live Booking Map</h2>
            <p>
              Sample courier and destination locations in Addis Ababa.
            </p>
          </div>
        </div>

        <DeliveryMap
          courier={courier}
          delivery={delivery}
          deliveryAddress={deliveryAddress}
        />

        <p className="admin-map-note">
          These are sample coordinates, not a live GPS feed.
        </p>
      </section>

      <section className="admin-disputes-panel admin-map-panel">
        <div className="admin-panel-heading">
          <div>
            <p className="booking-section-eyebrow">
              SELECT A BOOKING
            </p>
            <h2>Booking Location Map</h2>
            <p>
              Select a booking in the table to update the destination
              marker when coordinate fields are available.
            </p>
          </div>
        </div>

        <DeliveryMap
          courier={DEFAULT_COURIER}
          delivery={deliveryCoordinates}
          deliveryAddress={
            selectedCar?.location ||
            selectedCar?.address ||
            selectedCar?.name ||
            "Addis Ababa, Ethiopia"
          }
        />

        <div className="admin-location-details">
          <div>
            <span>Courier latitude</span>
            <strong>{DEFAULT_COURIER[0]}</strong>
          </div>

          <div>
            <span>Courier longitude</span>
            <strong>{DEFAULT_COURIER[1]}</strong>
          </div>

          <div>
            <span>Destination latitude</span>
            <strong>{deliveryCoordinates[0]}</strong>
          </div>

          <div>
            <span>Destination longitude</span>
            <strong>{deliveryCoordinates[1]}</strong>
          </div>
        </div>

        <p className="admin-map-note">
          If your database does not contain coordinates, the map
          displays the default sample destination.
        </p>
      </section>

      <section className="admin-disputes-panel booking-data-panel">
        <div className="booking-data-heading">
          <div>
            <p className="booking-section-eyebrow">
              BOOKING MANAGEMENT
            </p>
            <h2>Booking Data</h2>
            <p>
              Review customer bookings, dates, statuses, and tracking.
            </p>
          </div>

          <div className="booking-count">
            <span>{bookings.length}</span>
            <small>Total bookings</small>
          </div>
        </div>

        {loading ? (
          <div className="booking-empty-state">
            <span className="booking-loading-dot" />
            <p>Loading booking data...</p>
          </div>
        ) : errorMessage ? (
          <div className="booking-message booking-error">
            <strong>Unable to load bookings</strong>
            <p>{errorMessage}</p>
            <button
              type="button"
              className="booking-action-button"
              onClick={loadData}
            >
              Try again
            </button>
          </div>
        ) : bookings.length === 0 ? (
          <div className="booking-empty-state">
            <span className="booking-empty-icon">▤</span>
            <h3>No bookings found</h3>
            <p>
              No booking rows were returned. Refresh to check again.
            </p>
            <button
              type="button"
              className="booking-action-button"
              onClick={loadData}
            >
              Refresh bookings
            </button>
          </div>
        ) : (
          <div className="booking-table-wrapper">
            <table className="booking-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Car</th>
                  <th>Pickup date</th>
                  <th>Return date</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => {
                  const car = getCar(booking);

                  const status = String(
                    booking.status || "unknown"
                  ).toLowerCase();

                  const statusClass = status.replace(
                    /[^a-z0-9_-]/g,
                    ""
                  );

                  const customerName =
                    booking.customer_name || "Customer";

                  return (
                    <tr
                      key={booking.id}
                      className={
                        selectedBooking?.id === booking.id
                          ? "booking-row-selected"
                          : ""
                      }
                      onClick={() => setSelectedBooking(booking)}
                    >
                      <td>
                        <div className="booking-customer">
                          <span className="booking-avatar">
                            {customerName.charAt(0).toUpperCase()}
                          </span>

                          <div>
                            <strong>{customerName}</strong>
                            <small>
                              ID: {String(booking.id).slice(0, 8)}
                            </small>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="booking-car-name">
                          {car?.name ||
                            `Car #${booking.car_id ?? "N/A"}`}
                        </span>
                      </td>

                      <td>{when(booking.start_date)}</td>
                      <td>{when(booking.end_date)}</td>

                      <td>
                        <span
                          className={`booking-status status-${statusClass}`}
                        >
                          {status.charAt(0).toUpperCase() +
                            status.slice(1)}
                        </span>
                      </td>

                      <td>
                        <span
                          className="booking-created"
                          title={when(booking.created_at)}
                        >
                          {relative(booking.created_at)}
                        </span>
                      </td>

                      <td>
                        <Link
                          className="booking-track-link"
                          href={`/track/${encodeURIComponent(
                            booking.id
                          )}`}
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                        >
                          Track <span aria-hidden="true">→</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="booking-data-bottom">
          <p>
            Showing {bookings.length} booking
            {bookings.length === 1 ? "" : "s"}.
            Dates use <code>lib/format.js</code>.
          </p>

          <button
            type="button"
            className="booking-action-button"
            onClick={loadData}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh bookings"}
          </button>
        </div>
      </section>
    </main>
  );
}
