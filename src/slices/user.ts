import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CurrentUserType, RegistrationUserType } from "../types/userTypes";
import { RootState } from "../redux/store";
import AuthService from "../services/authService";
import StoreService from "../services/storeService";
import { StoreApiType } from "../types/storesTypes";
import { NameType, ReduxStatusType } from "../types/commonTypes";
export interface RequestBodyLogin {
  email: string;
  password: string;
}
export interface RequestBodyUser {
  email: string;
  token: string;
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

export interface UserState {
  userDetail: {
    user: CurrentUserType;
    status: ReduxStatusType;
    error: string | null;
  };
  storeDetail: {
    store: StoreApiType | null;
    status: ReduxStatusType;
    error: string | null;
  };
}

const initialState: UserState = {
  userDetail: {
    user: {} as CurrentUserType,
    status: "init",
    error: null,
  },
  storeDetail: {
    store: null,
    status: "init",
    error: null,
  },
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

export const getStore = createAsyncThunk(
  "user/getStore",
  async (id: number) => {
    try {
      const response = await StoreService.getStore(id);
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
      if (state.userDetail.user.id) {
        state.userDetail.user = {} as CurrentUserType;
        localStorage.clear();
      }
    },
  },
  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(login.pending, (state) => {
        state.userDetail.status = "loading";
        state.userDetail.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        // for some reason we get 'fulfilled' state even when there's error
        // in that case error is returned in payload, so we check if there's error message
        if (action.payload.id) {
          state.userDetail.user = action.payload;
          state.userDetail.status = "success";
          state.userDetail.error = null;
        } else {
          state.userDetail.user = {} as CurrentUserType;
          state.userDetail.status = "failed";
          state.userDetail.error =
            action.payload.response?.data?.message ||
            action.payload.message ||
            null;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.userDetail.user = {} as CurrentUserType;
        state.userDetail.status = "failed";
        state.userDetail.error = action.error.message || null;
      })

      // GET USER
      .addCase(getUser.pending, (state) => {
        state.userDetail.status = "loading";
        state.userDetail.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        if (action.payload.id) {
          state.userDetail.user = action.payload;
          state.userDetail.status = "success";
          state.userDetail.error = null;
        } else {
          state.userDetail.user = {} as CurrentUserType;
          state.userDetail.status = "failed";
          state.userDetail.error =
            action.payload.response?.data?.message ||
            action.payload.message ||
            null;
        }
      })
      .addCase(getUser.rejected, (state, action) => {
        state.userDetail.user = {} as CurrentUserType;
        state.userDetail.status = "failed";
        state.userDetail.error = action.error.message || null;
      })

      // REGISTER
      .addCase(register.pending, (state) => {
        state.userDetail.status = "loading";
        state.userDetail.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.userDetail.status = "success";
        state.userDetail.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.userDetail.status = "failed";
        state.userDetail.error = action.error.message || null;
      })

      // GET STORE
      .addCase(getStore.pending, (state, action) => {
        state.storeDetail.status = "loading";
        state.storeDetail.error = null;
      })
      .addCase(getStore.fulfilled, (state, action) => {
        if (action.payload.response?.data?.message) {
          state.storeDetail.status = "failed";
          state.storeDetail.error =
            action.payload.response?.data?.message || null;
        } else {
          state.storeDetail.store = action.payload;
          state.storeDetail.status = "success";
          state.storeDetail.error = null;
        }
      })
      .addCase(getStore.rejected, (state, action) => {
        state.storeDetail.status = "failed";
        state.storeDetail.error = action.error.message || null;
      });
  },
});

export const { removeOnLogout } = userSlice.actions;

export const userSelector = (state: RootState): CurrentUserType =>
  state.user?.userDetail.user;
export const userLoadingSelector = (state: RootState): string =>
  state.user?.userDetail.status;
export const userErrorSelector = (state: RootState): string | null =>
  state.user?.userDetail.error;

export const userStoreSelector = (state: RootState): StoreApiType | null =>
  state.user?.storeDetail.store || null;
export const userStoreLoadingSelector = (state: RootState): string =>
  state.user?.storeDetail.status;
export const userStoreErrorSelector = (state: RootState): string | null =>
  state.user?.storeDetail.error;

export default userSlice.reducer;
