import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";

import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { successfulPaymentOn } from "../../store/payment/payment.action";
import { clearCart } from "../../store/cart/cart.action";

import { BUTTON_TYPE_CLASSES } from "../button/button.componnet";

import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
  Hint,
  PaymentWrapper,
} from "./payment-form.styles";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const cartItems = useSelector(selectCartItems);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const dispatch = useDispatch();
  const paymentDetails = {
    paidProducts: cartItems,
    paidTotal: amount,
  };

  const paymentHandler = async e => {
    e.preventDefault();

    if (!stripe || !elements || !amount) return;

    try {
      setIsProcessingPayment(true);

      const response = await fetch(
        "/.netlify/functions/create-payment-intent",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: amount * 100 }),
        }
      ).then(res => res.json());

      const {
        paymentIntent: { client_secret, created },
      } = response;

      const paymentResult = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: currentUser ? currentUser.email : "Guest",
          },
        },
      });

      setIsProcessingPayment(false);

      if (paymentResult.error) {
        alert(paymentResult.error.message);
      } else {
        if (paymentResult.paymentIntent.status === "succeeded") {
          dispatch(clearCart());
          dispatch(
            successfulPaymentOn({ ...paymentDetails, paymentNumber: created })
          );
        }
      }
    } catch (error) {
      console.log(error);
      setIsProcessingPayment(false);
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <Hint>
          You are in test mode. Use 4242 4242 4242 4242 number to pay.
        </Hint>
        <PaymentWrapper>
          <CardElement />
          <PaymentButton
            isLoading={isProcessingPayment}
            buttonType={BUTTON_TYPE_CLASSES.inverted}
          >
            Pay Now
          </PaymentButton>
        </PaymentWrapper>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
