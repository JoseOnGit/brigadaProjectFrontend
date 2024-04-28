import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CurrentUserType } from "../types/userTypes";
import { RootState } from "../redux/store";
import AuthService from "../services/authService";

export interface RequestBodyUser {
  email: string;
  token: string;
}
export interface RequestBodyLogin {
  email: string;
  password: string;
}
export interface UserState {
  userDetail: CurrentUserType;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: UserState = {
  userDetail: {} as CurrentUserType,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk<CurrentUserType, RequestBodyLogin>(
  "user/login",
  async ({ email, password }) => {
    try {
      const response = await AuthService.login(email, password);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getUser = createAsyncThunk<CurrentUserType, RequestBodyUser>(
  "user/getUser",
  async ({ email, token }) => {
    try {
      const response = await AuthService.getuser(email, token);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeOnLogout(state) {
      if (state.userDetail.id) {
        state.userDetail = {} as CurrentUserType;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "idle";
        state.userDetail = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.userDetail = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { removeOnLogout } = userSlice.actions;

export const userSelector = (state: RootState): CurrentUserType =>
  state.user?.userDetail;

export const userLoadingSelector = (state: RootState): string =>
  state.user?.status;

export const userErrorSelector = (state: RootState): string | null =>
  state.user?.error;

export default userSlice.reducer;
