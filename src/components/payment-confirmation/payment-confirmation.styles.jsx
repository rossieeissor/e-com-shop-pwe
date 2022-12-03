import styled from "styled-components/macro";
import Button from "../button/button.componnet";

export const PaymentConfirmationContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
`;

export const YourNumberNext = styled.span`
  font-weight: 600;
  font-size: 18px;
`;

export const OrderNumber = styled.span`
  font-size: 18px;
`;

export const ProductItemsContainer = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  margin: 20px 0px;
`;

export const Total = styled.span`
  font-size: 30px;
  margin-left: 20%;
  align-items: center;
`;

export const ContinueShoppingButton = styled(Button)`
  margin-top: 25px;
`;
