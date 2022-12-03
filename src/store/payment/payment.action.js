import { createAction } from "../../utils/reducer/reducer.utils";
import { PAYMENT_ACTION_TYPES } from "./payment.types";

export const successfulPaymentOn = paymentDetails =>
  createAction(PAYMENT_ACTION_TYPES.SUCCESSFUL_PAYMENT_ON, paymentDetails);

export const successfulPaymentOff = () =>
  createAction(PAYMENT_ACTION_TYPES.SUCCESSFUL_PAYMENT_OFF);
