"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabase";

export default function NewCarPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    price: "",
    daily_price: "",
    category: "Sedan",
    description: "",
    image: "",
    is_available: true,
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // 1. Check the signed-in user.
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;

      if (!user) {
        throw new Error("Please sign in before adding a car.");
      }

      // 2. Validate the form.
      if (!form.name.trim() || !form.price.trim()) {
        throw new Error(
          "Please enter the car name and selling price."
        );
      }

      const dailyPrice = Number(form.daily_price);

      if (!Number.isFinite(dailyPrice) || dailyPrice <= 0) {
        throw new Error(
          "Daily rental price must be greater than zero."
        );
      }

      // 3. Find the next car ID.
      const { data: latestCars, error: latestError } =
        await supabase
          .from("cars")
          .select("id")
          .order("id", { ascending: false })
          .limit(1);

      if (latestError) throw latestError;

      const nextId = (latestCars?.[0]?.id ?? 0) + 1;

      // 4. Create the car as pending approval.
      const { data: newCar, error: insertError } =
        await supabase
          .from("cars")
          .insert({
            id: nextId,
            name: form.name.trim(),
            price: form.price.trim(),
            daily_price: dailyPrice,
            category: form.category,
            description: form.description.trim(),
            image: form.image.trim(),
            is_available: form.is_available,
            approval_status: "pending",
          })
          .select("id")
          .single();

      if (insertError) throw insertError;

      // 5. Assign the new car to the signed-in owner.
      const { error: ownerError } = await supabase
        .from("car_owners")
        .insert({
          owner_id: user.id,
          car_id: newCar.id,
        });

      if (ownerError) {
        throw new Error(
          "The car was created, but owner assignment failed. " +
            ownerError.message
        );
      }

      // 6. Show success and return to the car list.
      setSuccess("Car created successfully!");
      router.push("/owner/cars");
      router.refresh();
    } catch (err) {
      setError(err.message || "Unable to create the car.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="owner-form-page">
      <section className="owner-form-card">
        <header className="owner-form-header">
          <h1>Add a New Car</h1>
          <p>
            Add your vehicle details and rental price.
          </p>
        </header>

        {error && (
          <div className="owner-error" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="owner-success" role="status">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="owner-car-form"
        >
          <div className="owner-field">
            <label htmlFor="name">Car Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Toyota Corolla"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="owner-field">
            <label htmlFor="price">
              Selling Price
            </label>
            <input
              id="price"
              name="price"
              type="text"
              placeholder="4.5M"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="owner-field">
            <label htmlFor="daily_price">
              Daily Rental Price (ETB/day)
            </label>
            <input
              id="daily_price"
              name="daily_price"
              type="number"
              min="1"
              step="0.01"
              placeholder="2500"
              value={form.daily_price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="owner-field">
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
          </div>

          <div className="owner-field">
            <label htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Describe the vehicle..."
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="owner-field">
            <label htmlFor="image">
              Image Path or URL
            </label>
            <input
              id="image"
              name="image"
              type="text"
              placeholder="/cars/toyota.jpg"
              value={form.image}
              onChange={handleChange}
            />
          </div>

          <label className="owner-checkbox">
            <input
              type="checkbox"
              name="is_available"
              checked={form.is_available}
              onChange={handleChange}
            />
            <span>Available for booking</span>
          </label>

          <div className="owner-form-actions">
            <button
              type="submit"
              disabled={loading}
            >
              {loading ? "Saving Car..." : "Add Car"}
            </button>

            <button
              type="button"
              className="owner-secondary-button"
              disabled={loading}
              onClick={() => router.push("/owner/cars")}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}