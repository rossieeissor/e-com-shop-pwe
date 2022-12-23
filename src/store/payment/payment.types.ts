import { CartItem } from "../cart/cart.types";

export enum PAYMENT_ACTION_TYPES {
  PAYMENT_START = "payment/PAYMENT_START",
  PAYMENT_SUCCESSFUL = "payment/PAYMENT_SUCCESSFUL",
  PAYMENT_FAILED = "payment/PAYMENT_FAILED",
  PAYMENT_RESET = "payment/PAYMENT_RESET",
}

export type PaymentDetails = {
  paidProducts: CartItem[];
  paidTotal: number;
  paymentNumber: number;
};
