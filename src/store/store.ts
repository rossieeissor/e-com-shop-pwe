import { configureStore, Middleware } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  PersistConfig,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { getPersistConfig } from "redux-deep-persist";
import storage from "redux-persist/lib/storage";
// import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";
import { paymentStart } from "./payment/payment.reducer";

export type RootState = ReturnType<typeof rootReducer>;

export type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist?: (keyof RootState)[];
};

const persistConfig = getPersistConfig({
  key: "root",
  storage,
  blacklist: ["user", "payment.isProcessingPayment"],
  rootReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

// If want to use logger uncomment the code below

const middleWares = [
  // process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter(/*(item): item is Middleware => */ Boolean /*(item)*/);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          paymentStart.type,
        ],
      },
    }).concat(middleWares),
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
