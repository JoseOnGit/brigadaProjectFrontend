import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  NotificationType,
  PickedDayType,
  RequestType,
} from "../types/requestTypes";
import { CurrentUserType } from "../types/userTypes";
import RequestService from "../services/requestService";
import UserService from "../services/userService";
import { ReduxStatusType } from "../types/commonTypes";
import { RootState } from "../redux/store";

export interface RequestBodyRequest {
  id?: number;
  userId: number;
  day: string;
  timeStart: string;
  timeEnd: string;
  wholeDay: string;
  byStore: boolean;
  level: number;
}
export interface RequestsState {
  requestsDetail: {
    requests: RequestType[];
    status: ReduxStatusType;
    loaded?: number | null;
    error: string | null;
  };
  uniqueUsers: {
    users: CurrentUserType[];
    status: ReduxStatusType;
    loaded?: number | null;
    error: string | null;
  };
  pickedDaysDetail: PickedDayType[];
}

const initialState: RequestsState = {
  requestsDetail: {
    requests: [],
    status: "init",
    loaded: null,
    error: null,
  },
  uniqueUsers: {
    users: [],
    status: "init",
    loaded: null,
    error: null,
  },
  pickedDaysDetail: [],
};

export const addUserRequest = createAsyncThunk(
  "userRequest/addReqest",
  async (request: RequestType) => {
    try {
      const response = await RequestService.createNewRequest(request);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const userRequestNotification = createAsyncThunk(
  "userRequest/reqestNotification",
  async (notification: NotificationType) => {
    try {
      const response = await RequestService.sendNotification(notification);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getAllUsersRequests = createAsyncThunk(
  "userRequest/getAllReqests",
  async () => {
    try {
      const response = await RequestService.getAllUserRequests();
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getUserRequests = createAsyncThunk(
  "userRequest/getUserRequests",
  async (userId: number) => {
    try {
      const response = await RequestService.getUserRequests(userId);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const removeUserRequest = createAsyncThunk(
  "userRequest/removeRequest",
  async (request: RequestType) => {
    try {
      const response = await RequestService.removeRequest(request);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "userRequest/getUserInfo",
  async (id: number) => {
    try {
      const response = await UserService.getUserInfo(id);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const userRequestSlice = createSlice({
  name: "userRequest",
  initialState,
  reducers: {
    addPickedDayByUser(state, action) {
      state.pickedDaysDetail = [...state.pickedDaysDetail, action.payload];
    },
    changePickedDayByUser(state, action) {
      state.pickedDaysDetail = state.pickedDaysDetail.map((pickedDay) => {
        if (pickedDay.day === action.payload.day) {
          return action.payload;
        }
        return pickedDay;
      });
    },
    removePickedDayByUser(state, action) {
      state.pickedDaysDetail = state.pickedDaysDetail.filter(
        (pickedDay) => pickedDay.day !== action.payload.day
      );
    },
  },
  extraReducers: (builder) =>
    builder

      // ADD REQUEST
      .addCase(addUserRequest.pending, (state) => {
        state.requestsDetail.status = "loading";
        state.requestsDetail.error = null;
      })
      .addCase(addUserRequest.fulfilled, (state, action) => {
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
          state.pickedDaysDetail = state.pickedDaysDetail.filter(
            (pickedDay) => pickedDay.day !== action.payload.day
          );
          state.requestsDetail.error = null;
        }
      })
      .addCase(addUserRequest.rejected, (state, action) => {
        state.requestsDetail.status = "failed";
        state.requestsDetail.error = action.error.message || null;
      })

      // GET ALL REQUEST
      .addCase(getAllUsersRequests.pending, (state) => {
        state.requestsDetail.status = "loading";
        state.requestsDetail.error = null;
      })
      .addCase(getAllUsersRequests.fulfilled, (state, action) => {
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
              byStore: request.byStore,
              level: request.level,
            })
          );
          state.requestsDetail.error = null;
        }
      })
      .addCase(getAllUsersRequests.rejected, (state, action) => {
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
              byStore: request.byStore,
              level: request.level,
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
      .addCase(removeUserRequest.pending, (state, action) => {
        state.requestsDetail.status = "loading";
        state.requestsDetail.loaded = action.meta.arg.id;
        state.requestsDetail.error = null;
      })
      .addCase(removeUserRequest.fulfilled, (state, action) => {
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
      .addCase(removeUserRequest.rejected, (state, action) => {
        state.requestsDetail.status = "failed";
        state.requestsDetail.error = action.error.message || null;
        state.requestsDetail.loaded = null;
      })

      // GET USER INFO
      .addCase(getUserInfo.pending, (state, action) => {
        state.uniqueUsers.status = "loading";
        state.uniqueUsers.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        if (action.payload.response?.data?.message) {
          state.uniqueUsers.status = "failed";
          state.uniqueUsers.users = [
            ...state.uniqueUsers.users,
            {
              id: action.meta.arg,
            } as CurrentUserType,
          ];
          state.uniqueUsers.error =
            action.payload.response?.data?.message || null;
        } else {
          state.uniqueUsers.users = [
            ...state.uniqueUsers.users,
            action.payload,
          ];
          state.uniqueUsers.status = "success";
          state.uniqueUsers.error = null;
        }
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.uniqueUsers.status = "failed";
        state.uniqueUsers.error = action.error.message || null;
      }),
});

export const {
  addPickedDayByUser,
  changePickedDayByUser,
  removePickedDayByUser,
} = userRequestSlice.actions;

export const userRequestsSelector = (state: RootState): RequestType[] =>
  state.userRequest.requestsDetail.requests;
export const userRequestsLoadingSelector = (state: RootState): string =>
  state.userRequest.requestsDetail.status;
export const userRequestsLoadedIdSelector = (state: RootState): number | null =>
  state.userRequest.requestsDetail.loaded || null;
export const userRequestsErrorSelector = (state: RootState): string | null =>
  state.userRequest.requestsDetail.error;

export const userRequestsUsersSelector = (
  state: RootState
): CurrentUserType[] => state.userRequest.uniqueUsers.users;
export const userRequestsUsersLoadingSelector = (state: RootState): string =>
  state.userRequest.requestsDetail.status;
export const userRequestsUsersLoadedIdSelector = (
  state: RootState
): number | null => state.userRequest.requestsDetail.loaded || null;
export const userRequestsUsersErrorSelector = (
  state: RootState
): string | null => state.userRequest.requestsDetail.error;

export const userPickedDaysSelector = (state: RootState): PickedDayType[] =>
  state.userRequest.pickedDaysDetail;

export default userRequestSlice.reducer;
