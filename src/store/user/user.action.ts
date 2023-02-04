import { USER_ACTION_TYPES, EmailAndPassword } from "./user.types";
import {
  createAction,
  ActionWithPayload,
  Action,
} from "../../utils/reducer/reducer.utils";
import { AdditionlInfo } from "../../utils/firebase/firebase.utils";

type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;

export const checkUserSession = (): CheckUserSession =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;

export const googleSignInStart = (): GoogleSignInStart =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export type EmailSignInStart = ActionWithPayload<
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
  EmailAndPassword & { additionalInfo: AdditionlInfo }
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
