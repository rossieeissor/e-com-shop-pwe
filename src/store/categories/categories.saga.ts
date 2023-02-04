import { takeLatest, all, call, put } from "typed-redux-saga/macro";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./categories.reducer";

import { fetchCategoriesStart } from "./categories.reducer";

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield* call(
      getCategoriesAndDocuments,
      "categories"
    );
    yield* put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield* put(fetchCategoriesFailed(error as Error));
  }
}

export function* onFetchCategories() {
  yield* takeLatest(fetchCategoriesStart.type, fetchCategoriesAsync);
}

export function* categoriesSaga() {
  yield* all([call(onFetchCategories)]);
}
