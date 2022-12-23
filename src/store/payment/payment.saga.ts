import { all, call, takeLatest, put } from "typed-redux-saga/macro";

import { CardElement } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";

import { PAYMENT_ACTION_TYPES } from "./payment.types";
import {
  paymentFailed,
  PaymentStart,
  paymentSuccessful,
} from "./payment.action";
import { clearCart } from "../cart/cart.action";

import { stripeFetch, paymentConfirm } from "../../utils/stripe/stripe.utils";

const ifValidCardElement = (
  card: StripeCardElement | null
): card is StripeCardElement => card !== null;
const ifValidClientSecret = (
  clientSecret: string | null
): clientSecret is string => clientSecret !== null;

export function* startPayment({ payload }: PaymentStart) {
  const { stripe, elements, amount, currentUser, paymentDetails } = payload;
  if (!stripe || !elements || !amount) return;
  try {
    const response = yield* call(stripeFetch, amount);

    const {
      paymentIntent: { client_secret, created },
    } = response;

    const cardDetails = elements.getElement(CardElement);

    if (!ifValidCardElement(cardDetails) || !ifValidClientSecret(client_secret))
      return;

    const paymentResult = yield* call(
      paymentConfirm,
      stripe,
      client_secret,
      cardDetails,
      currentUser
    );

    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        yield* put(clearCart());
        yield* put(
          paymentSuccessful({ ...paymentDetails, paymentNumber: created })
        );
      }
    }
  } catch (error) {
    put(paymentFailed(error as Error));
  }
}

export function* onPaymentStart() {
  yield* takeLatest(PAYMENT_ACTION_TYPES.PAYMENT_START, startPayment);
}

export function* paymentSaga() {
  yield* all([call(onPaymentStart)]);
}
