import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => null,
  removeItemFromCart: () => null,
  clearItemFromCart: () => null,
  cartCount: 0,
  cartTotal: 0,
});

const CART_ACTION_TYPES = {
  TOGGLE_CART_IS_OPEN: "TOGGLE_IS_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTION_TYPES.TOGGLE_CART_IS_OPEN:
      return { ...state, isCartOpen: action.payload };

    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      throw new Error(`error type ${action.type} in reducer`);
  }
};

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const clearCartItem = (cartItems, productToRemove) => {
  return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
};

const removeCartItem = (cartItems, productToRemove) => {
  if (productToRemove.quantity === 1) {
    return clearCartItem(cartItems, productToRemove);
  }

  return cartItems.map(cartItem =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpen, cartItems, cartCount, cartTotal } = state;

  const toggleIsCartOpen = () => {
    dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART_IS_OPEN, !isCartOpen));
  };

  const addItemToCart = productToAdd => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = cartItemToRemove => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = productToClear => {
    const newCartItems = clearCartItem(cartItems, productToClear);
    updateCartItemsReducer(newCartItems);
  };

  const updateCartItemsReducer = newCartItems => {
    const newCartCount = newCartItems.reduce(
      (summ, currentCartItem) => summ + currentCartItem.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (summ, currentCartItem) =>
        summ + currentCartItem.price * currentCartItem.quantity,
      0
    );
    console.log(newCartItems);
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };

  let value = {
    isCartOpen,
    toggleIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
