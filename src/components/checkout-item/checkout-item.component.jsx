import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

import "./checkout-item.styles.scss";

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
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={decrementCartItem}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={incrementCartItem}>
          &#10095;
        </div>
      </span>

      <span className="price">$ {price} </span>
      <div className="remove-button" onClick={clearCartItem}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
