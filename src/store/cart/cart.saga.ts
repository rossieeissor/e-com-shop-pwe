import { takeLatest, put, call, all, select } from "typed-redux-saga/macro";

import { CartItem, CART_ACTION_TYPES } from "./cart.types";
import {
  AddItemToCart,
  RmoveItemFromCart,
  ClearItemFromCart,
  clearItemFromCart,
} from "./cart.action";
import { setCartItems } from "./cart.reducer";

import { RootState } from "../store";

import {
  addCartItemsToFirestore,
  getCartItemsFromFirestore,
  UserData,
} from "../../utils/firebase/firebase.utils";

const selectCartItems = (state: RootState) => state.cart.cartItems;
const selectCurrentUser = (state: RootState) => state.user.currentUser;

const fetchCartToFirestore = async (
  newCartItems: CartItem[],
  currentUser: UserData | null
): Promise<CartItem[]> => {
  if (!currentUser) {
    return newCartItems;
  }
  await addCartItemsToFirestore(newCartItems, currentUser.id);
  return await getCartItemsFromFirestore(currentUser.id);
};

export function* addCartItem({ payload }: AddItemToCart) {
  const productToAdd = payload;
  const cartItems = yield* select(selectCartItems);
  const currentUser = yield* select(selectCurrentUser);
  let newCartItems: CartItem[];
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    newCartItems = cartItems.map(cartItem =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  } else {
    newCartItems = [...cartItems, { ...productToAdd, quantity: 1 }];
  }
  try {
    newCartItems = yield* call(fetchCartToFirestore, newCartItems, currentUser);
  } catch (error) {
    console.log(error);
  }

  yield* put(setCartItems(newCartItems));
}

export function* removeCartItem({ payload }: RmoveItemFromCart) {
  const productToRemove = payload;
  const cartItems = yield* select(selectCartItems);
  const currentUser = yield* select(selectCurrentUser);
  if (productToRemove.quantity === 1) {
    yield* put(clearItemFromCart(productToRemove));
  } else {
    let newCartItems = cartItems.map(cartItem =>
      cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    try {
      newCartItems = yield* call(
        fetchCartToFirestore,
        newCartItems,
        currentUser
      );
    } catch (error) {
      console.log(error);
    }
    yield* put(setCartItems(newCartItems));
  }
}

export function* clearCartItem({ payload }: ClearItemFromCart) {
  const productToRemove = payload;
  const cartItems = yield* select(selectCartItems);
  const currentUser = yield* select(selectCurrentUser);
  let newCartItems = cartItems.filter(
    cartItem => cartItem.id !== productToRemove.id
  );
  try {
    newCartItems = yield* call(fetchCartToFirestore, newCartItems, currentUser);
  } catch (error) {
    console.log(error);
  }
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
