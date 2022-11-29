import { all, call, takeLatest, put } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";

import { signInSuccess, signInFailed } from "./user.action";

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalInfo) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalInfo
    );
    yield put(
      signInSuccess({
        ...userSnapshot.data(),
        id: userSnapshot.id,
      })
    );
  } catch (error) {
    yield put(signInFailed(error));
  }
}

/*
  create remaining sagas
  as well as the corresponding components in order to move all of the signIn and signUp from google from Email and pass into our sagas and flow everything appropriately through our new getSnapshotFromUserAuth saga as well as remainig components code with the appropriate action flow. You may even need action types to get everithing to works
 */

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* SignInWithGoogle() {
  try {
    const userAuth = yield call(signInWithGooglePopup);
    console.log(userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onSignInWithGoogle() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, SignInWithGoogle);
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSaga() {
  yield all([call(onCheckUserSession), call(onSignInWithGoogle)]);
}
