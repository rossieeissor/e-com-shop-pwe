import styled from "styled-components/macro";

export const ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;

  button {
    width: 80%;
    opacity: 0.7;
    position: absolute;
    top: 255px;
    display: none;

    @media screen and (max-width: 800px) {
      display: block;
      opacity: 0.9;
      min-width: unset;
      padding: 0 10px;
    }
  }

  &:hover {
    img {
      opacity: 0.8;
    }

    button {
      opacity: 0.85;
      display: flex;
    }
  }

  @media screen and (max-width: 800px) {
    &:hover {
      img {
        opacity: unset;
      }

      button {
        opacity: unset;
      }
    }
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  border: 1px solid black;
  border-radius: 3px;
  height: 95%;
  display: flex;
  justify-content: center;
  padding: 5px;
  

  img {
    height: 95%;
    max-width: 90%;
    object-fit: contain;
    margin-bottom: 5px;

  }
`

export const Footer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  padding: 0 3px;
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;

export const Name = styled.span`
  margin-bottom: 15px;
`;