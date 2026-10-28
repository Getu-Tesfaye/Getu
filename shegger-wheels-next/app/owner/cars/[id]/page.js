"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../../lib/supabase";

export default function OwnerCarDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const carId = params.id;

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCar() {
      setLoading(true);
      setError("");

      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          throw new Error("Please sign in to view this car.");
        }

        const { data: assignment, error: assignmentError } =
          await supabase
            .from("car_owners")
            .select("car_id")
            .eq("owner_id", user.id)
            .eq("car_id", carId)
            .maybeSingle();

        if (assignmentError) throw assignmentError;

        if (!assignment) {
          throw new Error("You do not have access to this car.");
        }

        const { data, error: carError } = await supabase
          .from("cars")
          .select("*")
          .eq("id", carId)
          .single();

        if (carError) throw carError;

        setCar(data);
      } catch (err) {
        setError(err.message || "Unable to load car.");
      } finally {
        setLoading(false);
      }
    }

    if (carId) loadCar();
  }, [carId]);

  async function toggleAvailability() {
    if (!car) return;

    setError("");

    const { data, error: updateError } = await supabase
      .from("cars")
      .update({ is_available: !car.is_available })
      .eq("id", car.id)
      .select("*")
      .single();

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setCar(data);
  }

  if (loading) {
    return <main className="owner-form-page">Loading car...</main>;
  }

  if (error && !car) {
    return (
      <main className="owner-form-page">
        <p className="owner-error">{error}</p>
        <button onClick={() => router.push("/owner/cars")}>
          Back to My Cars
        </button>
      </main>
    );
  }

  if (!car) return null;

  return (
    <main className="owner-form-page">
      <div className="owner-form-card">
        <h1>{car.name}</h1>

        {car.image && (
          <img
            src={car.image}
            alt={car.name}
            className="owner-car-image"
          />
        )}

        <p>
          <strong>Category:</strong> {car.category || "Other"}
        </p>

        <p>
          <strong>Selling Price:</strong> {car.price}
        </p>

        <p>
          <strong>Daily Rental Price:</strong>{" "}
          {Number(car.daily_price).toLocaleString()} ETB/day
        </p>

        <p>
          <strong>Description:</strong>{" "}
          {car.description || "No description provided."}
        </p>

        <p>
          <strong>Availability:</strong>{" "}
          {car.is_available ? "Available" : "Unavailable"}
        </p>

        <p>
          <strong>Approval Status:</strong>{" "}
          {car.approval_status || "Pending"}
        </p>

        {error && <p className="owner-error">{error}</p>}

        <div className="owner-actions">
          <Link
            href={`/owner/cars/${car.id}/edit`}
            className="owner-link-button"
          >
            Edit Car
          </Link>

          <button onClick={toggleAvailability}>
            {car.is_available
              ? "Mark Unavailable"
              : "Mark Available"}
          </button>

          <button
            className="owner-secondary-button"
            onClick={() => router.push("/owner/cars")}
          >
            Back to My Cars
          </button>
        </div>
      </div>
    </main>
  );
}