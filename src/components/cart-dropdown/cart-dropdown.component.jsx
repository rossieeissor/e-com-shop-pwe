import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setIsCartOpen } from "../../store/cart/cart.action";
import {
  selectCartItems,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";

import Button from "../button/button.componnet";

import CartItem from "../cart-item/cart-item.component";

import {
  CartDropdownContainer,
  // EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();
  const toggleIsCartOpen = () => {
    dispatch(setIsCartOpen(!isCartOpen));
  };
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    toggleIsCartOpen();
    navigate("/checkout");
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.map(item => (
          <CartItem cartItem={item} key={item.id} />
        ))}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>Go to Checkout</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
