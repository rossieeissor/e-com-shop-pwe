import styled from "styled-components/macro";

export const SignInFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;

  h2 {
    margin: 10px 0;
  }

  @media screen and (max-width: 800px) {
    width: unset;
    margin-bottom: 30px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 20px;
`;
