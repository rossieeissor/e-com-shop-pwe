import { all, call, takeLatest, put } from "typed-redux-saga/macro";

import { PayloadAction } from "@reduxjs/toolkit";
import { CardElement } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";

import { DataForPayment } from "./payment.types";

import {
  paymentStart,
  paymentFailed,
  paymentSuccessful,
} from "./payment.reducer";
import { clearCart } from "../cart/cart.reducer";

import { stripeFetch, paymentConfirm } from "../../utils/stripe/stripe.utils";
import { addCartItemsToFirestore } from "../../utils/firebase/firebase.utils";

const ifValidCardElement = (
  card: StripeCardElement | null
): card is StripeCardElement => card !== null;
const ifValidClientSecret = (
  clientSecret: string | null
): clientSecret is string => clientSecret !== null;

export function* startPayment({ payload }: PayloadAction<DataForPayment>) {
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
      yield* put(paymentFailed(paymentResult.error));
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        yield* put(clearCart());
        if (currentUser) {
          yield* call(addCartItemsToFirestore, [], currentUser.id);
        }
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
  yield* takeLatest(paymentStart.type, startPayment);
}

export function* paymentSaga() {
  yield* all([call(onPaymentStart)]);
}
