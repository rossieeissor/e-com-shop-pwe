import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CartItem from "../cart-item/cart-item.component";

import { successfulPaymentOff } from "../../store/payment/payment.action";

import {
  selectPaidProducts,
  selectPaidTotal,
  selectPaymentNumber,
} from "../../store/payment/payment.selector";

import {
  YourNumberNext,
  ProductItemsContainer,
  Total,
  PaymentConfirmationContainer,
  InfoWrap,
  ContinueShoppingButton,
} from "./payment-confirmation.styles";

const PaymentConfirmation = () => {
  const paymentNumber = useSelector(selectPaymentNumber);
  const paidProducts = useSelector(selectPaidProducts);
  const paidTotal = useSelector(selectPaidTotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const continueShipping = () => {
    dispatch(successfulPaymentOff());
    navigate("/");
  };

  return (
    <PaymentConfirmationContainer>
      <InfoWrap>
        <h2>Thank you for making the payment!</h2>
        <YourNumberNext>Your order number: </YourNumberNext>
        <span>{paymentNumber}</span>
        <ProductItemsContainer>
          {paidProducts.map(item => (
            <CartItem cartItem={item} key={item.id} />
          ))}
        </ProductItemsContainer>

        <Total>TOTAL: ${paidTotal}</Total>
      </InfoWrap>
      <ContinueShoppingButton onClick={continueShipping}>
        Continue Shopping
      </ContinueShoppingButton>
    </PaymentConfirmationContainer>
  );
};

export default PaymentConfirmation;
