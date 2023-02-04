import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartItem } from "../cart/cart.types";
import { StripeError } from "@stripe/stripe-js";

import { PaymentDetails, DataForPayment } from "./payment.types";

export type PaymentState = {
  readonly isPaymentSuccessful: boolean;
  readonly paymentNumber: number | string;
  readonly paidProducts: CartItem[];
  readonly paidTotal: number;
  readonly error: Error | StripeError | null;
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

const paymentSlice = createSlice({
  name: "payment",
  initialState: PAYMENT_INITIAL_STATE,
  reducers: {
    paymentStart(state, action: PayloadAction<DataForPayment>) {
      state.isProcessingPayment = true;
    },

    paymentSuccessful(state, action: PayloadAction<PaymentDetails>) {
      return {
        ...state,
        isPaymentSuccessful: true,
        ...action.payload,
        isProcessingPayment: false,
      };
    },

    paymentFailed(state, action: PayloadAction<Error | StripeError>) {
      state.error = action.payload;
      state.isProcessingPayment = false;
    },

    paymentReset: () => PAYMENT_INITIAL_STATE,
  },
});

export const { paymentReset, paymentSuccessful, paymentFailed, paymentStart } =
  paymentSlice.actions;

export default paymentSlice.reducer;
