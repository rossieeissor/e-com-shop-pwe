import { createAction } from "../../utils/reducer/reducer.utils";
import { PAYMENT_ACTION_TYPES, PaymentDetails } from "./payment.types";
import {
  ActionWithPayload,
  Action,
  withMatcher,
} from "../../utils/reducer/reducer.utils";

export type SuccessfulPaymentOn = ActionWithPayload<
  PAYMENT_ACTION_TYPES.SUCCESSFUL_PAYMENT_ON,
  PaymentDetails
>;

export const successfulPaymentOn = withMatcher(
  (paymentDetails: PaymentDetails): SuccessfulPaymentOn =>
    createAction(PAYMENT_ACTION_TYPES.SUCCESSFUL_PAYMENT_ON, paymentDetails)
);

export type SuccessfulPaymentOff =
  Action<PAYMENT_ACTION_TYPES.SUCCESSFUL_PAYMENT_OFF>;

export const successfulPaymentOff = withMatcher(
  (): SuccessfulPaymentOff =>
    createAction(PAYMENT_ACTION_TYPES.SUCCESSFUL_PAYMENT_OFF)
);
