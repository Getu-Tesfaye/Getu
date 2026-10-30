
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function AdminCarsPage() {
  const router = useRouter();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("all");

  const loadCars = useCallback(async () => {
    setLoading(true);
    setError("");
    setMessage("");

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

      let query = supabase
        .from("cars")
        .select(
          "id, name, price, daily_price, category, description, image, approval_status, is_available, created_at"
        )
        .order("created_at", { ascending: false });

      if (filter !== "all") {
        query = query.eq("approval_status", filter);
      }

      const { data, error: carsError } = await query;

      if (carsError) throw carsError;

      setCars(data || []);
    } catch (err) {
      console.error("Admin car listings error:", err);
      setError(
        err.message ||
          "Could not load car listings. Check your database permissions."
      );
    } finally {
      setLoading(false);
    }
  }, [filter, router]);

  useEffect(() => {
    loadCars();
  }, [loadCars]);

  async function changeApproval(car, newStatus) {
    const action = newStatus === "approved" ? "approve" : "reject";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} "${car.name}"?`
    );

    if (!confirmed) return;

    setUpdatingId(car.id);
    setError("");
    setMessage("");

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

      const { data, error: updateError } = await supabase
        .from("cars")
        .update({ approval_status: newStatus })
        .eq("id", car.id)
        .eq("approval_status", "pending")
        .select("id, approval_status");

      if (updateError) throw updateError;

      if (!data || data.length === 0) {
        throw new Error(
          "No listing was changed. It may already have been reviewed, or your account may not have permission."
        );
      }

      setMessage(
        `"${car.name}" was ${newStatus === "approved" ? "approved" : "rejected"}.`
      );

      await loadCars();
    } catch (err) {
      console.error("Car approval update error:", err);
      setError(
        err.message ||
          "Could not update this listing. Check your administrator permissions and RLS policies."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  function formatPrice(value) {
    if (value === null || value === undefined || value === "") {
      return "Not provided";
    }

    return `${Number(value).toLocaleString()} ETB`;
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">ADMINISTRATION</p>
          <h1>Car Listings</h1>
          <p className="admin-subtitle">
            Review vehicle listings before they are published.
          </p>
        </div>

        <div className="admin-header-actions">
          <button
            className="admin-button admin-button-secondary"
            type="button"
            onClick={loadCars}
            disabled={loading}
          >
            Refresh
          </button>

          <button
            className="admin-button admin-button-secondary"
            type="button"
            onClick={() => router.push("/admin")}
          >
            Admin Dashboard
          </button>
        </div>
      </header>

      <section className="admin-cars-panel">
        <div className="admin-cars-toolbar">
          <div>
            <h2>Listing review</h2>
            <p>Choose a status to view matching listings.</p>
          </div>

          <label className="admin-cars-filter">
            <span>Filter</span>
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="all">All statuses</option>
            </select>
          </label>
        </div>

        {error && (
          <div className="admin-error" role="alert">
            <strong>Problem:</strong> {error}
          </div>
        )}

        {message && (
          <div className="admin-cars-success" role="status">
            {message}
          </div>
        )}

        {loading ? (
          <p className="admin-cars-state">Loading car listings...</p>
        ) : cars.length === 0 ? (
          <div className="admin-cars-empty">
            <span>🚘</span>
            <h3>No listings found</h3>
            <p>
              There are no visible listings matching this filter.
            </p>
          </div>
        ) : (
          <div className="admin-cars-grid">
            {cars.map((car) => (
              <article className="admin-car-card" key={car.id}>
                {car.image ? (
                  <img
                    className="admin-car-image"
                    src={car.image}
                    alt={car.name || "Car listing"}
                  />
                ) : (
                  <div className="admin-car-image-placeholder">
                    No car image
                  </div>
                )}

                <div className="admin-car-content">
                  <div className="admin-car-title-row">
                    <h3>{car.name || `Car #${car.id}`}</h3>

                    <span
                      className={`admin-car-status admin-car-status-${car.approval_status || "unknown"}`}
                    >
                      {car.approval_status || "Unknown"}
                    </span>
                  </div>

                  <p className="admin-car-category">
                    {car.category || "Uncategorized"}
                  </p>

                  <p className="admin-car-description">
                    {car.description || "No description provided."}
                  </p>

                  <div className="admin-car-prices">
                    <div>
                      <span>Rental price</span>
                      <strong>
                        {formatPrice(car.daily_price)}
                        <small>/day</small>
                      </strong>
                    </div>

                    <div>
                      <span>Listed price</span>
                      <strong>{car.price || "Not provided"}</strong>
                    </div>
                  </div>

                  {car.approval_status === "pending" ? (
                    <div className="admin-car-actions">
                      <button
                        type="button"
                        className="admin-car-approve"
                        disabled={updatingId === car.id}
                        onClick={() => changeApproval(car, "approved")}
                      >
                        {updatingId === car.id
                          ? "Updating..."
                          : "Approve"}
                      </button>

                      <button
                        type="button"
                        className="admin-car-reject"
                        disabled={updatingId === car.id}
                        onClick={() => changeApproval(car, "rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <p className="admin-car-reviewed">
                      This listing is {car.approval_status || "unreviewed"}.
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
