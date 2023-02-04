import { CategoryItem } from "../categories/categories.types";

export enum CART_ACTION_TYPES {
  ADD_CART_ITEM = "cart/ADD_CART_ITEM",
  REMOVE_CART_ITEM = "cart/REMOVE_CART_ITEM",
  CLEAR_CART_ITEM = "cart/CLEAR_CART_ITEM",
}

export type CartItem = CategoryItem & { quantity: number };
