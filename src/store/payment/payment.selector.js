export const selectIsPaymentSuccessful = state =>
  state.payment.isPaymentSuccessful;

export const selectPaymentNumber = state => state.payment.paymentNumber;

export const selectPaidProducts = state => state.payment.paidProducts;

export const selectPaidTotal = state => state.payment.paidTotal;
