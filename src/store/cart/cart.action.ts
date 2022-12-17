import { CART_ACTION_TYPES } from "./cart.types";
import { CartItem } from "./cart.types";
import { CategoryItem } from "../categories/categories.types";

import {
  createAction,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";

type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.TOGGLE_CART_IS_OPEN,
  boolean
>;

export const setIsCartOpen = withMatcher(
  (boolean: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.TOGGLE_CART_IS_OPEN, boolean)
);

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem) => {
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

const clearCartItem = (cartItems: CartItem[], productToRemove: CartItem) => {
  return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
};

const removeCartItem = (cartItems: CartItem[], productToRemove: CartItem) => {
  if (productToRemove.quantity === 1) {
    return clearCartItem(cartItems, productToRemove);
  }

  return cartItems.map(cartItem =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): SetCartItems => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
): SetCartItems => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (
  cartItems: CartItem[],
  productToClear: CartItem
): SetCartItems => {
  const newCartItems = clearCartItem(cartItems, productToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export type ClearCart = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, []>;

export const clearCart = (): ClearCart =>
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, []);
