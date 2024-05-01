import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "../slices/user";
// import pickedDaysReducer from "../slices/pickedDays";

const reducer = {
  user: userReducer,
  // pickedDays: pickedDaysReducer,
  // requestsUser: userReducer,
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
