import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./Stripe.css";
import { selectCurrentOrder } from "../features/order/orderSlice";
import { useSelector } from "react-redux";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51OQuAgSBxJ90nxsubQX9rgLdSgYXd3pJHetAU2fPnD8TPCg34L0Ys6R8OaX3B3U9omtwZP11IADfL9KyeF3HeV4n009F4qcRnK"
);

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const orderPlaced = useSelector(selectCurrentOrder);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:8080/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: orderPlaced.totalAmount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
