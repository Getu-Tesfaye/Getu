
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import CheckoutForm from "../../components/CheckoutForm";

export default async function CheckoutPage() {

  const supabase = await createClient();

  const { data, error, } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (error || !claims?.sub) {
    redirect(
      "/customer-login?next=/checkout&message=Please%20sign%20in%20first%20to%20continue%20to%20checkout."
    );
  }

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
