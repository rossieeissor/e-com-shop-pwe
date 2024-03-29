import { CART_ACTION_TYPES } from "./cart.types";
import { CartItem } from "./cart.types";
import { CategoryItem } from "../categories/categories.types";

import {
  createAction,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";

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
