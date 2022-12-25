import { createSelector } from "reselect";

import { RootState } from "../store";
import { PaymentState } from "./payment.reducer";

export const paymentReducer = (state: RootState): PaymentState => state.payment;

export const selectIsPaymentSuccessful = createSelector(
  [paymentReducer],
  paymentSlice => paymentSlice.isPaymentSuccessful
);

export const selectPaymentNumber = createSelector(
  [paymentReducer],
  paymentSlice => paymentSlice.paymentNumber
);

export const selectPaidProducts = createSelector(
  [paymentReducer],
  paymentSlice => paymentSlice.paidProducts
);

export const selectPaidTotal = createSelector(
  [paymentReducer],
  paymentSlice => paymentSlice.paidTotal
);

export const selectIsProcessingPayment = createSelector(
  [paymentReducer],
  paymentSlice => paymentSlice.isProcessingPayment
);
