import { all, call, takeLatest, put, select } from "typed-redux-saga/macro";
import { AuthError, AuthErrorCodes, User } from "@firebase/auth";

import { RootState } from "../store";
import { signInSuccess, signFailed, signOutstart } from "./user.reducer";
import { clearCart, setCartItems } from "../cart/cart.reducer";
import {
  EmailSignInStart,
  EmailSignUpStart,
  CheckUserSession,
} from "./user.action";
import { USER_ACTION_TYPES } from "./user.types";

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithUserEmailandPassword,
  createNewUserWithEmailAndPassword,
  signOutUser,
  AdditionlInfo,
  addCartItemsToFirestore,
  getCartItemsFromFirestore,
} from "../../utils/firebase/firebase.utils";
import { CartItem } from "../cart/cart.types";

const selectCartItems = (state: RootState) => state.cart.cartItems;

function mergeCarts(storeCart: CartItem[], firestoreCart: CartItem[]) {
  const mergedArray = [...firestoreCart];
  storeCart.forEach(item2 => {
    const index = mergedArray.findIndex(item1 => item1.id === item2.id);
    if (index !== -1) {
      mergedArray[index].quantity += item2.quantity;
    } else {
      mergedArray.push(item2);
    }
  });
  return mergedArray;
}

export function* signInSuccessCartFetch(currentUserId: string) {
  const cartItems = yield* select(selectCartItems);
  let newCartItems = [...cartItems];
  try {
    const firestoreCart = yield* call(getCartItemsFromFirestore, currentUserId);
    newCartItems = yield* call(mergeCarts, newCartItems, firestoreCart);
    yield* call(addCartItemsToFirestore, newCartItems, currentUserId);
  } catch (error) {
    console.log(error);
  }
  yield* put(setCartItems(newCartItems));
}

export function* getSnapshotFromUserAuth(
  userAuth: User,
  additionalInfo?: AdditionlInfo,
  actionType?: string | null
) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalInfo
    );

    if (userSnapshot) {
      if (actionType !== USER_ACTION_TYPES.CHECK_USER_SESSION) {
        yield* call(signInSuccessCartFetch, userSnapshot.id);
      }
      yield* put(
        signInSuccess({
          ...userSnapshot.data(),
          id: userSnapshot.id,
        })
      );
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    yield* put(signFailed(errorMessage));
  }
}

export function* isUserAuthenticated(action?: CheckUserSession) {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(
      getSnapshotFromUserAuth,
      userAuth,
      undefined,
      action ? action.type : undefined
    );
  } catch (error) {
    const errorMessage = (error as Error).message;
    yield* put(signFailed(errorMessage));
  }
}

export function* signInWithGoogle() {
  try {
    const response = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, response.user);
  } catch (error) {
    const errorMessage = (error as Error).message;
    yield* put(signFailed(errorMessage));
  }
}

export function* signInWithEmailAndPassword({ payload }: EmailSignInStart) {
  const { email, password } = payload;
  try {
    const response = yield* call(
      signInWithUserEmailandPassword,
      email,
      password
    );
    if (response) yield* call(getSnapshotFromUserAuth, response.user);
  } catch (error) {
    const errorMessage = (error as Error).message;
    yield* put(signFailed(errorMessage));
    if ((error as AuthError).code === AuthErrorCodes.USER_DELETED) {
      alert("email not found");
    } else if ((error as AuthError).code === AuthErrorCodes.INVALID_PASSWORD) {
      alert("wrong password");
    } else {
      alert("something goes wrong");
      console.log("something wrong with login", error);
    }
  }
}

export function* signUpWithEmailAndPassword({ payload }: EmailSignUpStart) {
  const { email, password, additionalInfo } = payload;
  try {
    const response = yield* call(
      createNewUserWithEmailAndPassword,
      email,
      password
    );
    if (response) {
      yield* call(getSnapshotFromUserAuth, response.user, additionalInfo);
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    yield* put(signFailed(errorMessage));

    if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
      alert("email already in use");
    } else if ((error as AuthError).code === AuthErrorCodes.WEAK_PASSWORD) {
      alert("password is too weak");
    } else {
      console.log("something wrong with creating new user:", error);
    }
  }
}

export function* signOutAuth() {
  try {
    yield* call(signOutUser);
    yield put(clearCart());
    yield* call(isUserAuthenticated);
  } catch (error) {
    const errorMessage = (error as Error).message;
    yield* put(signFailed(errorMessage));
  }
}

export function* onSignOut() {
  yield* takeLatest(signOutstart.type, signOutAuth);
}

export function* onSignUpWithEmailAndPassword() {
  yield* takeLatest(
    USER_ACTION_TYPES.EMAIL_SIGN_UP_START,
    signUpWithEmailAndPassword
  );
}

export function* onsSignInWithEmailAndPassword() {
  yield* takeLatest(
    USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
    signInWithEmailAndPassword
  );
}

export function* onSignInWithGoogle() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSaga() {
  yield* all([
    call(onCheckUserSession),
    call(onSignInWithGoogle),
    call(onsSignInWithEmailAndPassword),
    call(onSignUpWithEmailAndPassword),
    call(onSignOut),
  ]);
}
