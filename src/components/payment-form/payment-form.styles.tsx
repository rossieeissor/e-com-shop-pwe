import styled from "styled-components/macro";
import Button from "../button/button.componnet";

export const PaymentFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const FormContainer = styled.form`
  min-width: 500px;

  @media screen and (max-width: 800px) {
    min-width: unset;
  }
`;

export const PaymentButton = styled(Button)`
  margin-left: auto;
  margin-top: 30px;
`;

export const Hint = styled.p`
  margin-bottom: 20px;
  color: grey;
`;

export const PaymentWrapper = styled.div`
  border: 1px solid black;
  padding: 20px;
  border-radius: 5px;
`;
