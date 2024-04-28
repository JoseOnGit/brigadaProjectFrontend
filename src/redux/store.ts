import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "../slices/user";

const reducer = {
  user: userReducer,
  // pickedDays: userReducer,
  // requestsUser: userReducer,
};

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
