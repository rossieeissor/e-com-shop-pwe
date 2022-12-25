import { memo } from "react";
import { useDispatch } from "react-redux";
import {
  clearItemFromCart,
  removeItemFromCart,
  addItemToCart
} from "../../store/cart/cart.action";
import { CartItem } from "../../store/cart/cart.types";

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

type CheckoutItemProps = {
  cartItem: CartItem
}

const CheckoutItem = memo(({ cartItem }: CheckoutItemProps) => {
  const { imageUrl, name, price, quantity } = cartItem;
  const dispatch = useDispatch();

  const addProductToCart = () => dispatch(addItemToCart(cartItem));

  const removeProductFromCart = () =>
    dispatch(removeItemFromCart(cartItem));

  const clearProductFromCart = () =>
    dispatch(clearItemFromCart(cartItem));


  return (
    <CheckoutItemContainer>
      <Image>
        <img src={imageUrl} alt={name} />
      </Image>
      <Name>{name}</Name>
      <Quantity>
        <Arrow onClick={removeProductFromCart}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addProductToCart}>&#10095;</Arrow>
      </Quantity>
      <Price>$ {price}</Price>
      <RemoveButton onClick={clearProductFromCart}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
});

export default CheckoutItem;
