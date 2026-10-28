"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function OwnerCarsPage() {
  const router = useRouter();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCars();
  }, []);

  async function loadCars() {
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
        (assignment) => assignment.car_id
      );

      if (carIds.length === 0) {
        setCars([]);
        return;
      }

      const { data: ownedCars, error: carsError } =
        await supabase
          .from("cars")
          .select("*")
          .in("id", carIds)
          .order("id", { ascending: true });

      if (carsError) throw carsError;

      setCars(ownedCars || []);
    } catch (err) {
      setError(err.message || "Unable to load your cars.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      setError(signOutError.message);
      return;
    }

    router.replace("/signin");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="owner-cars-page">
        <p className="owner-cars-loading">Loading your cars...</p>
      </main>
    );
  }

  return (
    <main className="owner-cars-page">
      <header className="owner-cars-header">
        <div>
          <h1>My Cars</h1>
          <p>Manage your vehicles and rental prices.</p>
        </div>

        <div className="owner-cars-header-actions">
          <Link
            href="/owner/cars/new"
            className="owner-cars-primary-link"
          >
            + Add New Car
          </Link>

          <button
            type="button"
            className="owner-cars-secondary-button"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </header>

      {error && (
        <div className="owner-error" role="alert">
          {error}
          <button
            type="button"
            className="owner-cars-retry-button"
            onClick={loadCars}
          >
            Try Again
          </button>
        </div>
      )}

      {!error && cars.length === 0 && (
        <section className="owner-cars-empty">
          <h2>No cars yet</h2>
          <p>
            Add your first car to start managing your vehicles.
          </p>
          <Link
            href="/owner/cars/new"
            className="owner-cars-primary-link"
          >
            Add Your First Car
          </Link>
        </section>
      )}

      {cars.length > 0 && (
        <>
          <div className="owner-cars-summary">
            <div className="owner-cars-summary-card">
              <span>Total Cars</span>
              <strong>{cars.length}</strong>
            </div>

            <div className="owner-cars-summary-card">
              <span>Available</span>
              <strong>
                {cars.filter((car) => car.is_available).length}
              </strong>
            </div>

            <div className="owner-cars-summary-card">
              <span>Pending Approval</span>
              <strong>
                {
                  cars.filter(
                    (car) => car.approval_status === "pending"
                  ).length
                }
              </strong>
            </div>
          </div>

          <section className="owner-cars-grid">
            {cars.map((car) => (
              <article className="owner-car-card" key={car.id}>
                <div className="owner-car-card-image">
                  {car.image ? (
                    <img src={car.image} alt={car.name} />
                  ) : (
                    <div className="owner-car-no-image">
                      No image available
                    </div>
                  )}
                </div>

                <div className="owner-car-card-content">
                  <div className="owner-car-title-row">
                    <h2>{car.name}</h2>

                    <span
                      className={`owner-car-status ${
                        car.is_available
                          ? "owner-car-status-available"
                          : "owner-car-status-unavailable"
                      }`}
                    >
                      {car.is_available
                        ? "Available"
                        : "Unavailable"}
                    </span>
                  </div>

                  <p className="owner-car-category">
                    {car.category || "Other"}
                  </p>

                  <p className="owner-car-rental-price">
                    {Number(car.daily_price || 0).toLocaleString()} ETB
                    <span> / day</span>
                  </p>

                  <p className="owner-car-selling-price">
                    Selling price: {car.price || "Not provided"}
                  </p>

                  <p className="owner-car-approval">
                    Approval:{" "}
                    <span>
                      {car.approval_status || "Pending"}
                    </span>
                  </p>

                  <div className="owner-car-card-actions">
                    <Link href={`/owner/cars/${car.id}`}>
                      View Details
                    </Link>

                    <Link href={`/owner/cars/${car.id}/edit`}>
                      Edit Car
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </>
      )}
    </main>
  );
}