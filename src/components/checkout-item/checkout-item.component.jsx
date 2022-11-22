import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

import {
  CheckoutItemContainer,
  Image,
  Name,
  Quantity,
  Price,
  RemoveButton,
  Value,
  Arrow,
} from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {
  const { imageUrl, name, price, quantity } = cartItem;

  const { addItemToCart, removeItemFromCart, clearItemFromCart } =
    useContext(CartContext);

  const incrementCartItem = () => {
    addItemToCart(cartItem);
  };
  const decrementCartItem = () => {
    removeItemFromCart(cartItem);
  };
  const clearCartItem = () => {
    clearItemFromCart(cartItem);
  };

  return (
    <CheckoutItemContainer>
      <Image>
        <img src={imageUrl} alt={name} />
      </Image>
      <Name>{name}</Name>
      <Quantity>
        <Arrow onClick={decrementCartItem}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={incrementCartItem}>&#10095;</Arrow>
      </Quantity>

      <Price>$ {price}</Price>
      <RemoveButton onClick={clearCartItem}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
