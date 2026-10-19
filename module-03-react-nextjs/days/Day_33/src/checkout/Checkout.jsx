import { useState } from "react";
import Field from "./Field";
import { validate } from "./validate";
import { placeOrder } from "../api/Order";


function Checkout({ total = 250 }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
    notes: ""
  });

  const [touched, setTouched] = useState({});

  const [serverErrors, setServerErrors] = useState({});

  const [submitting, setSubmitting] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const errors = {
    ...validate(form),
    ...serverErrors
  };

  function handleChange(field, value) {
    setForm((previousForm) => ({
      ...previousForm,
      [field]: value
    }));

    setServerErrors((previousErrors) => ({
      ...previousErrors,
      [field]: ""
    }));

    setSuccessMessage("");
  }

  function handleBlur(field) {
    setTouched((previousTouched) => ({
      ...previousTouched,
      [field]: true
    }));
  }

  function focusFirstError(errorObject) {
    const firstErrorField = Object.keys(errorObject)[0];

    if (firstErrorField) {
      document.getElementById(firstErrorField)?.focus();
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSuccessMessage("");
    setServerErrors({});

    const validationErrors = validate(form);

    setTouched({
      name: true,
      phone: true,
      area: true,
      notes: true
    });

    if (Object.keys(validationErrors).length > 0) {
      focusFirstError(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      await placeOrder({
        name: form.name.trim(),
        phone: form.phone.trim(),
        area: form.area.trim(),
        notes: form.notes.trim(),
        total
      });

      setSuccessMessage("Your order was placed successfully.");

      setForm({
        name: "",
        phone: "",
        area: "",
        notes: ""
      });

      setTouched({});
    } catch (error) {
      if (error.status === 422 && error.fieldErrors) {
        setServerErrors(error.fieldErrors);
        setTouched((previousTouched) => ({
          ...previousTouched,
          ...Object.keys(error.fieldErrors).reduce(
            (result, field) => ({
              ...result,
              [field]: true
            }),
            {}
          )
        }));

        focusFirstError(error.fieldErrors);
      } else {
        setSuccessMessage(
          "Something went wrong. Please try again."
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="checkout-container">
      <div className="checkout-card">
        <h1>Checkout</h1>

        <p className="checkout-description">
          Enter your delivery information to complete your order.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <Field
            id="name"
            label="Full name"
            value={form.name}
            onChange={(value) => handleChange("name", value)}
            onBlur={() => handleBlur("name")}
            error={errors.name}
            touched={touched.name}
            placeholder="Enter your full name"
            required
          />

          <Field
            id="phone"
            label="TeleBirr phone number"
            value={form.phone}
            onChange={(value) => handleChange("phone", value)}
            onBlur={() => handleBlur("phone")}
            error={errors.phone}
            touched={touched.phone}
            placeholder="0912345678"
            type="tel"
            required
          />

          <Field
            id="area"
            label="Delivery area"
            value={form.area}
            onChange={(value) => handleChange("area", value)}
            onBlur={() => handleBlur("area")}
            error={errors.area}
            touched={touched.area}
            placeholder="Example: Bole"
            required
          />

          <div className="field">
            <label htmlFor="notes">Optional notes</label>

            <textarea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={(event) =>
                handleChange("notes", event.target.value)
              }
              onBlur={() => handleBlur("notes")}
              placeholder="Example: Please call when you arrive."
              rows="4"
            />
          </div>

          {successMessage && (
            <p className="success-message" role="status">
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            className="submit-button"
            disabled={submitting}
          >
            {submitting
              ? "Submitting..."
              : `Place Order — ${total} ETB`}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Checkout;