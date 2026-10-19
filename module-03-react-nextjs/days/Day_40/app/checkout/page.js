import CheckoutForm from "../../components/CheckoutForm";

export default function CheckoutPage() {
  return (
    <div className="page narrow-page">
      <div className="page-heading">
        <h1>Checkout</h1>

        <p>Enter your delivery information.</p>
      </div>

      <CheckoutForm />
    </div>
  );
}