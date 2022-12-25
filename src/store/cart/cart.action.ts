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

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export type AddItemToCart = ActionWithPayload<
  CART_ACTION_TYPES.ADD_CART_ITEM,
  CategoryItem
>;

export const addItemToCart = (productToAdd: CategoryItem): AddItemToCart =>
  createAction(CART_ACTION_TYPES.ADD_CART_ITEM, productToAdd);

export type RmoveItemFromCart = ActionWithPayload<
  CART_ACTION_TYPES.REMOVE_CART_ITEM,
  CartItem
>;

export const removeItemFromCart = (
  productToRemove: CartItem
): RmoveItemFromCart =>
  createAction(CART_ACTION_TYPES.REMOVE_CART_ITEM, productToRemove);

export type ClearItemFromCart = ActionWithPayload<
  CART_ACTION_TYPES.CLEAR_CART_ITEM,
  CartItem
>;

export const clearItemFromCart = (
  productToClear: CartItem
): ClearItemFromCart =>
  createAction(CART_ACTION_TYPES.CLEAR_CART_ITEM, productToClear);

export type ClearCart = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, []>;

export const clearCart = (): ClearCart =>
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, []);
