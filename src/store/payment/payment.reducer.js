import { PAYMENT_ACTION_TYPES } from "./payment.types";

const PAYMENT_INITIAL_STATE = {
  isPaymentSuccessful: false,
  paymentNumber: "",
  paidProducts: [],
  paidTotal: 0,
};

export const paymentReducer = (state = PAYMENT_INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case PAYMENT_ACTION_TYPES.SUCCESSFUL_PAYMENT_ON:
      return {
        ...state,
        isPaymentSuccessful: true,
        ...payload,
      };

    case PAYMENT_ACTION_TYPES.SUCCESSFUL_PAYMENT_OFF:
      return {
        ...state,
        ...PAYMENT_INITIAL_STATE,
      };
    default:
      return {
        ...state,
      };
  }
};
