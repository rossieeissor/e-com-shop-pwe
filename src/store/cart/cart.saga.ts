import { takeLatest, put, call, all, select } from "typed-redux-saga/macro";

import { CART_ACTION_TYPES } from "./cart.types";
import {
  AddItemToCart,
  RmoveItemFromCart,
  ClearItemFromCart,
  clearItemFromCart,
} from "./cart.action";
import { setCartItems } from "./cart.reducer";

import { RootState } from "../store";

const selectCartItems = (state: RootState) => state.cart.cartItems;

export function* addCartItem({ payload }: AddItemToCart) {
  const productToAdd = payload;
  const cartItems = yield* select(selectCartItems);
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    const newCartItems = cartItems.map(cartItem =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    yield* put(setCartItems(newCartItems));
  } else {
    yield* put(setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]));
  }
}

export function* removeCartItem({ payload }: RmoveItemFromCart) {
  const productToRemove = payload;
  const cartItems = yield* select(selectCartItems);
  if (productToRemove.quantity === 1) {
    yield* put(clearItemFromCart(productToRemove));
  } else {
    const newCartItems = cartItems.map(cartItem =>
      cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    yield* put(setCartItems(newCartItems));
  }
}

export function* clearCartItem({ payload }: ClearItemFromCart) {
  const productToRemove = payload;
  const cartItems = yield* select(selectCartItems);
  const newCartItems = cartItems.filter(
    cartItem => cartItem.id !== productToRemove.id
  );
  yield* put(setCartItems(newCartItems));
}

export function* onAddItemToCart() {
  yield* takeLatest(CART_ACTION_TYPES.ADD_CART_ITEM, addCartItem);
}

export function* onRemoveItemFromCart() {
  yield* takeLatest(CART_ACTION_TYPES.REMOVE_CART_ITEM, removeCartItem);
}

export function* onClearItemFromCart() {
  yield* takeLatest(CART_ACTION_TYPES.CLEAR_CART_ITEM, clearCartItem);
}

export function* cartSaga() {
  yield* all([
    call(onAddItemToCart),
    call(onRemoveItemFromCart),
    call(onClearItemFromCart),
  ]);
}
