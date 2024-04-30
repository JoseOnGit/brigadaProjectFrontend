import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CurrentUserType, RegistrationUserType } from "../types/userTypes";
import { RootState } from "../redux/store";
import AuthService from "../services/authService";
import { NameType } from "../types/commonTypes";
import { PickedDayType } from "../types/brigadaTypes";

export interface RequestBodyUser {
  email: string;
  token: string;
}
export interface RequestBodyLogin {
  email: string;
  password: string;
}
export interface RequestBodyRegister {
  name: string;
  surname: string;
  phone: string;
  email: string;
  baseId?: NameType | undefined;
  level: number;
  onboardDate: string;
  password: string;
}
export type ErrorPayload = {
  register: {
    data: {
      message: string;
    };
  };
};
export interface UserState {
  userDetail: CurrentUserType;
  pickedDays: PickedDayType[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: UserState = {
  userDetail: {} as CurrentUserType,
  pickedDays: [],
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "user/login",
  async (data: RequestBodyLogin) => {
    const { email, password } = data;
    try {
      const response = await AuthService.login(email, password);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (data: RegistrationUserType) => {
    const {
      name,
      surname,
      email,
      phone,
      baseId,
      onboardDate,
      level,
      password,
    } = data;

    try {
      const response = await AuthService.register(
        name,
        surname,
        email,
        phone,
        baseId,
        onboardDate,
        level,
        password
      );
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (data: RequestBodyUser) => {
    const { email, token } = data;
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
        localStorage.clear();
      }
    },
    addPickedDay(state, action) {
      state.pickedDays = [...state.pickedDays, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        // for some reason we get 'fulfilled' state even when there's error
        // in that case error is returned in payload, so we check if there's error message
        if (action.payload.response?.data?.message) {
          state.userDetail = {} as CurrentUserType;
          state.status = "failed";
          state.error = action.payload.response?.data?.message || null;
        } else {
          state.userDetail = action.payload;
          state.status = "idle";
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })

      // GET USER
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
      })

      // REGISTER
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "idle";
        // state.userDetail = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { removeOnLogout, addPickedDay } = userSlice.actions;

export const userSelector = (state: RootState): CurrentUserType =>
  state.user?.userDetail;

export const pickedDaysSelector = (state: RootState): PickedDayType[] =>
  state.user?.pickedDays;

export const userLoadingSelector = (state: RootState): string =>
  state.user?.status;

export const userErrorSelector = (state: RootState): string | null =>
  state.user?.error;

export default userSlice.reducer;
