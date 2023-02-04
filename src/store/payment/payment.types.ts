import { Stripe, StripeElements } from "@stripe/stripe-js";
import { CartItem } from "../cart/cart.types";
import { UserData } from "../../utils/firebase/firebase.utils";

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

export type DataForPayment = {
  stripe: Stripe | null;
  elements: StripeElements | null;
  amount: number;
  currentUser: UserData | null;
  paymentDetails: {
    paidProducts: CartItem[];
    paidTotal: number;
  };
};
