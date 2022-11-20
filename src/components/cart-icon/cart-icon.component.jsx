import { useContext } from "react";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../context/cart.context";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleCartDropdown = () => {
    setIsCartOpen(prevCartOpen => !prevCartOpen);
  };

  return (
    <div className="cart-icon-container" onClick={toggleCartDropdown}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
