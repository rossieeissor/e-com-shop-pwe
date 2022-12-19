import { CartItem } from "../cart/cart.types";

export enum PAYMENT_ACTION_TYPES {
  SUCCESSFUL_PAYMENT_ON = "payment/SUCCESSFUL_PAYMENT_ON",
  SUCCESSFUL_PAYMENT_OFF = "payment/SUCCESSFUL_PAYMENT_OFF",
}

export type PaymentDetails = {
  paidProducts: CartItem[];
  paidTotal: number;
  paymentNumber: number;
};
