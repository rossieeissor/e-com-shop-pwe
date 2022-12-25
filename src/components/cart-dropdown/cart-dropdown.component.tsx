import { useCallback } from "react";
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
  EmptyMessage,
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

  const goToCheckoutHandler = useCallback(() => {
    toggleIsCartOpen();
    navigate("/checkout");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) 

  return (
    <CartDropdownContainer>
      {cartItems.length ? <CartItems>
        {cartItems.map(item => (
          <CartItem cartItem={item} key={item.id} />
        ))} 
      </CartItems> : <EmptyMessage>Your cart is epmty</EmptyMessage>  }
      
      
      <Button onClick={goToCheckoutHandler}>Go to Checkout</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
