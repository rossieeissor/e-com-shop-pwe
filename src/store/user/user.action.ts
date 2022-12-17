import { USER_ACTION_TYPES, EmailAndPassword } from "./user.types";
import { createAction } from "../../utils/reducer/reducer.utils";
import {
  ActionWithPayload,
  Action,
  withMatcher,
} from "../../utils/reducer/reducer.utils";

import { UserData, AdditionlInfo } from "../../utils/firebase/firebase.utils";

type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;

export const checkUserSession = (): CheckUserSession =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;

export const googleSignInStart = (): GoogleSignInStart =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

type EmailSignInStart = ActionWithPayload<
  USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
  EmailAndPassword
>;

export const emailSignInStart = (
  email: string,
  password: string
): EmailSignInStart =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });

export type EmailSignUpStart = ActionWithPayload<
  USER_ACTION_TYPES.EMAIL_SIGN_UP_START,
  EmailAndPassword & AdditionlInfo
>;

export const emailSignUpStart = (
  email: string,
  password: string,
  additionalInfo: AdditionlInfo
): EmailSignUpStart =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_UP_START, {
    email,
    password,
    additionalInfo,
  });

export type SignInSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_SUCCESS,
  UserData
>;

export const signInSuccess = withMatcher(
  (user: UserData): SignInSuccess =>
    createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
);

export type SignFailed = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_FAILED,
  Error
>;

export const signFailed = withMatcher(
  (error: Error): SignFailed =>
    createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error)
);

export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT>;

export const signOutstart = withMatcher(
  (): SignOutStart => createAction(USER_ACTION_TYPES.SIGN_OUT)
);
