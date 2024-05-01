import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CurrentUserType, RegistrationUserType } from "../types/userTypes";
import { RootState } from "../redux/store";
import AuthService from "../services/authService";
import RequestService from "../services/requestService";
import { NameType } from "../types/commonTypes";
import { PickedDayType, RequestType } from "../types/brigadaTypes";
import { Dayjs } from "dayjs";

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
export interface RequestBodyRequest {
  id?: number;
  userId: number;
  day: string;
  timeStart: Dayjs | string;
  timeEnd: Dayjs | string;
  wholeDay: string;
}
export interface UserState {
  userDetail: {
    user: CurrentUserType;
    status: "init" | "loading" | "success" | "failed";
    error: string | null;
  };
  requestsDetail: {
    requests: RequestType[];
    status: "init" | "loading" | "success" | "failed";
    loaded?: number | null;
    error: string | null;
  };
  pickedDays: PickedDayType[];
}

const initialState: UserState = {
  userDetail: {
    user: {} as CurrentUserType,
    status: "init",
    error: null,
  },
  requestsDetail: {
    requests: [],
    status: "init",
    loaded: null,
    error: null,
  },
  pickedDays: [],
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

export const addRequest = createAsyncThunk(
  "request/addReqest",
  async (request: RequestType) => {
    try {
      const response = await RequestService.createNewRequest(request);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getAllRequests = createAsyncThunk(
  "request/getAllReqests",
  async () => {
    try {
      const response = await RequestService.getAllRequests();
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getUserRequests = createAsyncThunk(
  "request/getUserRequests",
  async (userId: number) => {
    try {
      const response = await RequestService.getUserRequests(userId);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const removeRequest = createAsyncThunk(
  "request/removeRequest",
  async (request: RequestType) => {
    try {
      const response = await RequestService.removeRequest(request);
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
    addPickedDay(state, action) {
      state.pickedDays = [...state.pickedDays, action.payload];
    },
    changePickedDay(state, action) {
      state.pickedDays = state.pickedDays.map((pickedDay) => {
        if (pickedDay.day === action.payload.day) {
          return action.payload;
        }
        return pickedDay;
      });
    },
    removePickedDay(state, action) {
      state.pickedDays = state.pickedDays.filter(
        (pickedDay) => pickedDay.day !== action.payload.day
      );
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
        if (action.payload.response?.data?.message) {
          state.userDetail.user = {} as CurrentUserType;
          state.userDetail.status = "failed";
          state.userDetail.error =
            action.payload.response?.data?.message || null;
        } else {
          state.userDetail = action.payload;
          state.userDetail.status = "success";
          state.userDetail.error = null;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.userDetail.status = "failed";
        state.userDetail.error = action.error.message || null;
      })

      // GET USER
      .addCase(getUser.pending, (state) => {
        state.userDetail.status = "loading";
        state.userDetail.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        if (action.payload.response?.data?.message) {
          state.userDetail.user = {} as CurrentUserType;
          state.userDetail.status = "failed";
          state.userDetail.error =
            action.payload.response?.data?.message || null;
        } else {
          state.userDetail.user = action.payload;
          state.userDetail.status = "success";
          state.userDetail.error = null;
        }
      })
      .addCase(getUser.rejected, (state, action) => {
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

      // ADD REQUEST
      .addCase(addRequest.pending, (state) => {
        state.requestsDetail.status = "loading";
        state.requestsDetail.error = null;
      })
      .addCase(addRequest.fulfilled, (state, action) => {
        if (action.payload.response?.data?.message) {
          state.requestsDetail.status = "failed";
          state.requestsDetail.requests = [];
          state.requestsDetail.error =
            action.payload.response?.data?.message || null;
        } else {
          state.requestsDetail.status = "success";
          state.requestsDetail.requests = [
            ...state.requestsDetail.requests,
            action.payload,
          ];
          state.pickedDays = state.pickedDays.filter(
            (pickedDay) => pickedDay.day !== action.payload.day
          );
          state.requestsDetail.error = null;
        }
      })
      .addCase(addRequest.rejected, (state, action) => {
        state.requestsDetail.status = "failed";
        state.requestsDetail.error = action.error.message || null;
      })

      // GET ALL REQUEST
      .addCase(getAllRequests.pending, (state) => {
        state.requestsDetail.status = "loading";
        state.requestsDetail.error = null;
      })
      .addCase(getAllRequests.fulfilled, (state, action) => {
        if (action.payload.response?.data?.message) {
          state.requestsDetail.status = "failed";
          state.requestsDetail.requests = [];
          state.requestsDetail.error =
            action.payload.response?.data?.message || null;
        } else {
          state.requestsDetail.status = "success";
          state.requestsDetail.requests = action.payload.map(
            (request: RequestBodyRequest): RequestType => ({
              id: request.id,
              userId: request.userId,
              day: request.day,
              timeStart: request.timeStart,
              timeEnd: request.timeEnd,
              wholeDay: request.wholeDay === "1" ? true : false,
            })
          );
          state.requestsDetail.error = null;
        }
      })
      .addCase(getAllRequests.rejected, (state, action) => {
        state.requestsDetail.status = "failed";
        state.requestsDetail.error = action.error.message || null;
      })

      // GET USER REQUEST
      .addCase(getUserRequests.pending, (state) => {
        state.requestsDetail.status = "loading";
        state.requestsDetail.error = null;
      })
      .addCase(getUserRequests.fulfilled, (state, action) => {
        if (action.payload.response?.data?.message) {
          state.requestsDetail.requests = [];
          state.requestsDetail.status = "failed";
          state.requestsDetail.error =
            action.payload.response?.data?.message || null;
        } else {
          state.requestsDetail.requests = action.payload.map(
            (request: RequestBodyRequest): RequestType => ({
              id: request.id,
              userId: request.userId,
              day: request.day,
              timeStart: request.timeStart,
              timeEnd: request.timeEnd,
              wholeDay: request.wholeDay === "1" ? true : false,
            })
          );
          state.requestsDetail.status = "success";
        }
        state.requestsDetail.error = null;
      })
      .addCase(getUserRequests.rejected, (state, action) => {
        state.requestsDetail.status = "failed";
        state.requestsDetail.error = action.error.message || null;
      })

      // REMOVE REQUEST
      .addCase(removeRequest.pending, (state, action) => {
        state.requestsDetail.status = "loading";
        state.requestsDetail.loaded = action.meta.arg.id;
        state.requestsDetail.error = null;
      })
      .addCase(removeRequest.fulfilled, (state, action) => {
        if (action.payload.response?.data?.message) {
          state.requestsDetail.status = "failed";
          state.requestsDetail.error =
            action.payload.response?.data?.message || null;
          state.requestsDetail.loaded = null;
        } else {
          state.requestsDetail.requests = state.requestsDetail.requests.filter(
            (request: any) => request.id !== action.meta.arg.id
          );
          state.requestsDetail.status = "success";
          state.requestsDetail.error = null;
          state.requestsDetail.loaded = null;
        }
      })
      .addCase(removeRequest.rejected, (state, action) => {
        state.requestsDetail.status = "failed";
        state.requestsDetail.error = action.error.message || null;
        state.requestsDetail.loaded = null;
      });
  },
});

export const {
  removeOnLogout,
  addPickedDay,
  changePickedDay,
  removePickedDay,
} = userSlice.actions;

export const userSelector = (state: RootState): CurrentUserType =>
  state.user?.userDetail.user;

export const userLoadingSelector = (state: RootState): string =>
  state.user?.userDetail.status;

export const userErrorSelector = (state: RootState): string | null =>
  state.user?.userDetail.error;

export const pickedDaysSelector = (state: RootState): PickedDayType[] =>
  state.user?.pickedDays;

export const requestsSelector = (state: RootState): RequestType[] =>
  state.user?.requestsDetail.requests;

export const requestsLoadingSelector = (state: RootState): string =>
  state.user?.requestsDetail.status;

export const requestsLoadedIdSelector = (state: RootState): number | null =>
  state.user?.requestsDetail.loaded || null;

export const requestsErrorSelector = (state: RootState): string | null =>
  state.user?.requestsDetail.error;

export default userSlice.reducer;
