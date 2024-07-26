import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userRedux from "./userRedux";
import ordersRedux from "./ordersRedux";
import menuRedux from "./menuRedux";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

const persistedReducer = persistReducer(persistConfig, combineReducers({admin: userRedux, order: ordersRedux, menu: menuRedux}))

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

let persistor = persistStore(store)

export default persistor