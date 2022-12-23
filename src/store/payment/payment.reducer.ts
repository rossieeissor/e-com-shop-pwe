import { AnyAction } from "redux";
import {
  paymentReset,
  paymentSuccessful,
  paymentFailed,
} from "./payment.action";
import { CartItem } from "../cart/cart.types";

export type PaymentState = {
  readonly isPaymentSuccessful: boolean;
  readonly paymentNumber: number | string;
  readonly paidProducts: CartItem[];
  readonly paidTotal: number;
  error: Error | null;
};

const PAYMENT_INITIAL_STATE: PaymentState = {
  isPaymentSuccessful: false,
  paymentNumber: "",
  paidProducts: [],
  paidTotal: 0,
  error: null,
};

export const paymentReducer = (
  state = PAYMENT_INITIAL_STATE,
  action: AnyAction
) => {
  if (paymentSuccessful.match(action)) {
    return {
      ...state,
      isPaymentSuccessful: true,
      ...action.payload,
    };
  }

  if (paymentFailed.match(action)) {
    return {
      ...state,
      error: action.payload,
    };
  }

  if (paymentReset.match(action)) {
    return {
      ...state,
      ...PAYMENT_INITIAL_STATE,
    };
  }

  return state;
};
