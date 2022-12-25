import { Stripe, StripeElements, StripeError } from "@stripe/stripe-js";
import { createAction } from "../../utils/reducer/reducer.utils";
import { PAYMENT_ACTION_TYPES, PaymentDetails } from "./payment.types";
import { CartItem } from "../cart/cart.types";

import {
  ActionWithPayload,
  Action,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { UserData } from "../../utils/firebase/firebase.utils";

export type DataForPayment = {
  stripe: Stripe | null;
  elements: StripeElements | null;
  amount: number;
  currentUser: UserData | null;
  paymentDetails: {
    paidProducts: CartItem[];
    paidTotal: number;
  };
};

export type PaymentStart = ActionWithPayload<
  PAYMENT_ACTION_TYPES.PAYMENT_START,
  DataForPayment
>;

export const paymentStart = withMatcher(
  (dataForPayment: DataForPayment): PaymentStart =>
    createAction(PAYMENT_ACTION_TYPES.PAYMENT_START, dataForPayment)
);

export type PaymentSuccessful = ActionWithPayload<
  PAYMENT_ACTION_TYPES.PAYMENT_SUCCESSFUL,
  PaymentDetails
>;

export const paymentSuccessful = withMatcher(
  (paymentDetails: PaymentDetails): PaymentSuccessful =>
    createAction(PAYMENT_ACTION_TYPES.PAYMENT_SUCCESSFUL, paymentDetails)
);

export type PaymentFailed = ActionWithPayload<
  PAYMENT_ACTION_TYPES.PAYMENT_FAILED,
  Error
>;

export const paymentFailed = withMatcher((error: Error | StripeError) =>
  createAction(PAYMENT_ACTION_TYPES.PAYMENT_FAILED, error)
);

export type PaymentReset = Action<PAYMENT_ACTION_TYPES.PAYMENT_RESET>;

export const paymentReset = withMatcher(
  (): PaymentReset => createAction(PAYMENT_ACTION_TYPES.PAYMENT_RESET)
);
