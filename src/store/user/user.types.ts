export enum USER_ACTION_TYPES {
  SET_CURRENT_USER = "user/SET_CURRENT_USER",
  CHECK_USER_SESSION = "user/CHECK_USER_SESSION",
  GOOGLE_SIGN_IN_START = "user/GOOGLE_SIGN_IN_START",
  EMAIL_SIGN_IN_START = "user/EMAIL_SIGN_IN_START",
  EMAIL_SIGN_UP_START = "user/EMAIL_SIGN_UP_START",
}

export type EmailAndPassword = {
  email: string;
  password: string;
};
