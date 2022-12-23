import { all, call } from "typed-redux-saga/macro";

import { categoriesSaga } from "./categories/categories.saga";
import { userSaga } from "./user/user.saga";
import { paymentSaga } from "./payment/payment.saga";

export function* rootSaga() {
  yield* all([call(categoriesSaga), call(userSaga), call(paymentSaga)]);
}
