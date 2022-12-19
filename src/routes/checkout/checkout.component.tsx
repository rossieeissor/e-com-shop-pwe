import { useSelector } from "react-redux";

import PaymentConfirmation from "../../components/payment-confirmation/payment-confirmation.component";
import CheckoutCart from "../../components/checkout-cart/checkout-cart.component";
import { selectIsPaymentSuccessful } from "../../store/payment/payment.selector";

const Checkout = () => {
  const isPaymentSuccessful = useSelector(selectIsPaymentSuccessful);
  return isPaymentSuccessful ? <PaymentConfirmation /> : <CheckoutCart />;
};

export default Checkout;
