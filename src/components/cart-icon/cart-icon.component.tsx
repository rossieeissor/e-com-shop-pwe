import { useDispatch, useSelector } from "react-redux";

import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";
import { setIsCartOpen } from "../../store/cart/cart.reducer";
import {
  selectIsCartOpen,
  selectCartCount,
} from "../../store/cart/cart.selector";

const CartIcon = () => {
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();
  const toggleCartIsOpen = () => {
    dispatch(setIsCartOpen(!isCartOpen));
  };

  return (
    <CartIconContainer onClick={toggleCartIsOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;