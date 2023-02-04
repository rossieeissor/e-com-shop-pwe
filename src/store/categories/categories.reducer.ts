import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "./categories.types";

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState: CATEGORIES_INITIAL_STATE,
  reducers: {
    fetchCategoriesStart(state) {
      state.isLoading = true;
    },

    fetchCategoriesSuccess(state, action: PayloadAction<Category[]>) {
      state.isLoading = false;
      state.categories = action.payload;
    },

    fetchCategoriesFailed(state, action: PayloadAction<Error>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
