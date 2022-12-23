import { useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { paymentStart } from "../../store/payment/payment.action";

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
  const dataForPayment = {
    stripe: stripe,
    elements: elements,
    amount: amount,
    currentUser: currentUser,
    paymentDetails: {
      paidProducts: cartItems,
      paidTotal: amount,
    }
  }

  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setIsProcessingPayment(true);
   
    dispatch(paymentStart(dataForPayment))
    // setIsProcessingPayment(false);
  }
    
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <Hint>
          You are in test mode. Use 4242 4242 4242 4242 card number to pay.
        </Hint>
        <PaymentWrapper>
          <CardElement />
          <PaymentButton
            isLoading={isProcessingPayment}
            buttonType={BUTTON_TYPE_CLASSES.inverted}>
            Pay Now
          </PaymentButton>
        </PaymentWrapper>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
