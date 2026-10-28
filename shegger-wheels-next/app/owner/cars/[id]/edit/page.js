"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../../../lib/supabase";

export default function EditOwnerCarPage() {
  const params = useParams();
  const router = useRouter();
  const carId = params.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    price: "",
    daily_price: "",
    category: "Sedan",
    description: "",
    image: "",
    is_available: true,
  });

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
          throw new Error("Please sign in before editing a car.");
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
          throw new Error("You do not have permission to edit this car.");
        }

        const { data: car, error: carError } = await supabase
          .from("cars")
          .select("*")
          .eq("id", carId)
          .single();

        if (carError) throw carError;

        setForm({
          name: car.name || "",
          price: String(car.price ?? ""),
          daily_price: String(car.daily_price ?? ""),
          category: car.category || "Sedan",
          description: car.description || "",
          image: car.image || "",
          is_available: car.is_available ?? true,
        });
      } catch (err) {
        setError(err.message || "Unable to load car.");
      } finally {
        setLoading(false);
      }
    }

    if (carId) loadCar();
  }, [carId]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const dailyPrice = Number(form.daily_price);

      if (!form.name.trim() || !form.price.trim()) {
        throw new Error("Car name and selling price are required.");
      }

      if (!Number.isFinite(dailyPrice) || dailyPrice <= 0) {
        throw new Error("Enter a valid daily rental price.");
      }

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error("Your session has expired. Please sign in again.");
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
        throw new Error("You do not have permission to edit this car.");
      }

      const { error: updateError } = await supabase
        .from("cars")
        .update({
          name: form.name.trim(),
          price: form.price.trim(),
          daily_price: dailyPrice,
          category: form.category,
          description: form.description.trim(),
          image: form.image.trim(),
          is_available: form.is_available,
        })
        .eq("id", carId);

      if (updateError) throw updateError;

      router.push(`/owner/cars/${carId}`);
      router.refresh();
    } catch (err) {
      setError(err.message || "Unable to update car.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <main className="owner-form-page">Loading car...</main>;
  }

  return (
    <main className="owner-form-page">
      <div className="owner-form-card">
        <h1>Edit Car</h1>

        {error && <p className="owner-error">{error}</p>}

        <form onSubmit={handleSubmit} className="owner-car-form">
          <label htmlFor="name">Car Name</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="price">Selling Price</label>
          <input
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <label htmlFor="daily_price">
            Daily Rental Price (ETB/day)
          </label>
          <input
            id="daily_price"
            name="daily_price"
            type="number"
            min="1"
            step="0.01"
            value={form.daily_price}
            onChange={handleChange}
            required
          />

          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Luxury">Luxury</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Pickup">Pickup</option>
            <option value="Van">Van</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
          />

          <label htmlFor="image">Image Path or URL</label>
          <input
            id="image"
            name="image"
            value={form.image}
            onChange={handleChange}
          />

          <label className="owner-checkbox">
            <input
              type="checkbox"
              name="is_available"
              checked={form.is_available}
              onChange={handleChange}
            />
            Available for booking
          </label>

          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            className="owner-secondary-button"
            onClick={() => router.push(`/owner/cars/${carId}`)}
          >
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
}