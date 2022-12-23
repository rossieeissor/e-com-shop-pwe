import {
  loadStripe,
  PaymentIntent,
  Stripe,
  StripeCardElement,
} from "@stripe/stripe-js";
import { UserData } from "../firebase/firebase.utils";

export const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string
);

export const stripeFetch = (
  amount: number
): Promise<{ paymentIntent: PaymentIntent }> =>
  fetch("/.netlify/functions/create-payment-intent", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount: amount * 100 }),
  }).then(res => res.json());

export const paymentConfirm = (
  stripe: Stripe,
  clientSecret: string,
  cardDetails: StripeCardElement,
  currentUser: UserData | null
) =>
  stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardDetails,
      billing_details: {
        name: currentUser ? currentUser.email : "Guest",
      },
    },
  });
