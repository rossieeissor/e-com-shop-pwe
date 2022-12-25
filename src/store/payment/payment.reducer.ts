import { AnyAction } from "redux";
import {
  paymentReset,
  paymentSuccessful,
  paymentFailed,
  paymentStart,
} from "./payment.action";
import { CartItem } from "../cart/cart.types";

export type PaymentState = {
  readonly isPaymentSuccessful: boolean;
  readonly paymentNumber: number | string;
  readonly paidProducts: CartItem[];
  readonly paidTotal: number;
  readonly error: Error | null;
  readonly isProcessingPayment: boolean;
};

const PAYMENT_INITIAL_STATE: PaymentState = {
  isPaymentSuccessful: false,
  paymentNumber: "",
  paidProducts: [],
  paidTotal: 0,
  error: null,
  isProcessingPayment: false,
};

export const paymentReducer = (
  state = PAYMENT_INITIAL_STATE,
  action: AnyAction
) => {
  if (paymentStart.match(action)) {
    return {
      ...state,
      isProcessingPayment: true,
    };
  }

  if (paymentSuccessful.match(action)) {
    return {
      ...state,
      isPaymentSuccessful: true,
      ...action.payload,
      isProcessingPayment: false,
    };
  }

  if (paymentFailed.match(action)) {
    return {
      ...state,
      error: action.payload,
      isProcessingPayment: false,
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
