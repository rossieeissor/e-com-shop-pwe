import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartItem } from "./cart.types";

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[];
};

const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: CART_INITIAL_STATE,
  reducers: {
    setIsCartOpen(state, action: PayloadAction<boolean>) {
      state.isCartOpen = action.payload;
    },

    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.cartItems = action.payload;
    },

    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const { setIsCartOpen, setCartItems, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
