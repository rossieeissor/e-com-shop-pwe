import { AnyAction } from "redux";
import { successfulPaymentOn, successfulPaymentOff } from "./payment.action";
import { CartItem } from "../cart/cart.types";

export type PaymentState = {
  readonly isPaymentSuccessful: boolean;
  readonly paymentNumber: number | string;
  readonly paidProducts: CartItem[];
  readonly paidTotal: number;
};

const PAYMENT_INITIAL_STATE: PaymentState = {
  isPaymentSuccessful: false,
  paymentNumber: "",
  paidProducts: [],
  paidTotal: 0,
};

export const paymentReducer = (
  state = PAYMENT_INITIAL_STATE,
  action: AnyAction
) => {
  if (successfulPaymentOn.match(action)) {
    return {
      ...state,
      isPaymentSuccessful: true,
      ...action.payload,
    };
  }

  if (successfulPaymentOff.match(action)) {
    return {
      ...state,
      ...PAYMENT_INITIAL_STATE,
    };
  }

  return state;
};
