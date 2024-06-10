import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "../slices/user";
import userRequestReducer from "../slices/userRequest";
import storeRequestReducer from "../slices/storeRequest";

const reducer = {
  user: userReducer,
  userRequest: userRequestReducer,
  storeRequest: storeRequestReducer,
};

export const store = configureStore({
  reducer: reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
