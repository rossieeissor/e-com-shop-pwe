import { useContext } from "react";
import { useNavigate } from "react-router";

import Button from "../button/button.componnet";
import { CartContext } from "../../context/cart.context";

import CartItem from "../cart-item/cart-item.component";

import {
  CartDropdownContainer,
  // EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  const { cartItems, setIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    setIsCartOpen(prevIsCartOpen => !prevIsCartOpen);
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
