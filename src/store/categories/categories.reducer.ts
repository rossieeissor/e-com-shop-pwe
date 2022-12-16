import { AnyAction } from "redux";
import { Category } from "./categories.types";
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./categories.action";

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

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {} as AnyAction
): CategoriesState => {
  if (fetchCategoriesStart.match(action)) {
    return {
      ...state,
      isLoading: true,
    };
  } else if (fetchCategoriesSuccess.match(action)) {
    return {
      ...state,
      isLoading: false,
      categories: action.payload,
    };
  } else if (fetchCategoriesFailed.match(action)) {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  } else {
    return state;
  }
  // return this old code instead of new code above and see if there are any changes in VScode tooltip in other components or other files. Because of here is absence of function predicate (narrowing the types), actions here have ANY type
  // switch (action.type) {
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
  //     return {
  //       ...state,
  //       isLoading: true,
  //     };
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
  //     return {
  //       ...state,
  //       isLoading: false,
  //       categories: action.payload,
  //     };
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
  //     return {
  //       ...state,
  //       isLoading: false,
  //       error: action.payload,
  //     };
  //     default:
  //       return state
  // // }
};
