import { combineReducers, configureStore } from "@reduxjs/toolkit";

import placeholderApi from "./placeholderApi";
import appSlice from "./appSlice";

const reducer = combineReducers({
  [placeholderApi.reducerPath]: placeholderApi.reducer,
  appSlice: appSlice.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(placeholderApi.middleware),
});
