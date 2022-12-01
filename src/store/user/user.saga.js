import { all, call, takeLatest, put } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";

import { signInSuccess, signInFailed } from "./user.action";

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithUserEmailandPassword,
  createNewUserWithEmailAndPassword,
  signOutUser,
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

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInWithGoogle() {
  try {
    const response = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, response.user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInWithEmailAndPassword({ payload }) {
  const { email, password } = payload;
  try {
    const response = yield call(
      signInWithUserEmailandPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, response.user);
  } catch (error) {
    yield put(signInFailed(error));
    if (error.code === "auth/user-not-found") {
      alert("email not found");
    } else if (error.code === "auth/wrong-password") {
      alert("wrong password");
    } else {
      alert("something goes wrong");
      console.log("something wrong with login", error);
    }
  }
}

export function* signUpWithEmailAndPassword({ payload }) {
  const { email, password, additionalInfo } = payload;
  try {
    const { user } = yield call(
      createNewUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user, additionalInfo);
  } catch (error) {
    yield put(signInFailed(error));
    if (error.code === "auth/email-already-in-use") {
      alert("email already in use");
    } else if (error.code === "auth/weak-password") {
      alert("password is too weak");
    } else {
      console.log("something wrong with creating new user:", error);
    }
  }
}

export function* signOutAuth() {
  try {
    yield call(signOutUser);
    yield call(isUserAuthenticated);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onSignOut() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT, signOutAuth);
}

export function* onSignUpWithEmailAndPassword() {
  yield takeLatest(
    USER_ACTION_TYPES.EMAIL_SIGN_UP_START,
    signUpWithEmailAndPassword
  );
}

export function* onsSignInWithEmailAndPassword() {
  yield takeLatest(
    USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
    signInWithEmailAndPassword
  );
}

export function* onSignInWithGoogle() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onSignInWithGoogle),
    call(onsSignInWithEmailAndPassword),
    call(onSignUpWithEmailAndPassword),
    call(onSignOut),
  ]);
}
