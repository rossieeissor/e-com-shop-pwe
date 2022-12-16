import styled from "styled-components/macro";

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`;

export const Image = styled.div`
  width: 23%;
  padding-right: 15px;
  height: 100%;
  display: flex;
  justify-content: center;

  img {
    height: 100%;
  }
`;

export const Name = styled.span`
  width: 23%;
`;

export const Quantity = styled.span`
  width: 23%;
  display: flex;
`;

export const Price = styled.span`
  width: 23%;
`;

export const Arrow = styled.div`
  cursor: pointer;
`;

export const Value = styled.span`
  margin: 0 10px;
`;

export const RemoveButton = styled.div`
  padding-left: 12px;
  cursor: pointer;
`;
