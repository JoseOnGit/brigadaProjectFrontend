import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PickedDayType, RequestType } from "../types/brigadaTypes";
import { StoreApiType } from "../types/storesTypes";
import RequestService from "../services/requestService";
import StoreService from "../services/storeService";
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
}
export interface RequestsState {
  requestsDetail: {
    requests: RequestType[];
    status: ReduxStatusType;
    loaded?: number | null;
    error: string | null;
  };
  uniqueStores: {
    stores: StoreApiType[];
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
  uniqueStores: {
    stores: [],
    status: "init",
    loaded: null,
    error: null,
  },
  pickedDaysDetail: [],
};

export const addRequest = createAsyncThunk(
  "storeRequest/addReqest",
  async (request: RequestType) => {
    try {
      const response = await RequestService.createNewRequest(request);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getAllStoresRequests = createAsyncThunk(
  "storeRequest/getAllReqests",
  async () => {
    try {
      const response = await RequestService.getAllStoresRequests();
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getStoreRequests = createAsyncThunk(
  "storeRequest/getStoreRequests",
  async (userId: number) => {
    try {
      const response = await RequestService.getStoreRequests(userId);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const removeRequest = createAsyncThunk(
  "storeRequest/removeRequest",
  async (request: RequestType) => {
    try {
      const response = await RequestService.removeRequest(request);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getStoreInfo = createAsyncThunk(
  "storeRequest/getStoreInfo",
  async (id: number) => {
    try {
      const response = await StoreService.getStore(id);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const storeRequestSlice = createSlice({
  name: "storeRequest",
  initialState,
  reducers: {
    addPickedDay(state, action) {
      state.pickedDaysDetail = [...state.pickedDaysDetail, action.payload];
    },
    changePickedDay(state, action) {
      state.pickedDaysDetail = state.pickedDaysDetail.map((pickedDay) => {
        if (pickedDay.day === action.payload.day) {
          return action.payload;
        }
        return pickedDay;
      });
    },
    removePickedDay(state, action) {
      state.pickedDaysDetail = state.pickedDaysDetail.filter(
        (pickedDay) => pickedDay.day !== action.payload.day
      );
    },
  },
  extraReducers: (builder) =>
    builder

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
          state.pickedDaysDetail = state.pickedDaysDetail.filter(
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
      .addCase(getAllStoresRequests.pending, (state) => {
        state.requestsDetail.status = "loading";
        state.requestsDetail.error = null;
      })
      .addCase(getAllStoresRequests.fulfilled, (state, action) => {
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
            })
          );
          state.requestsDetail.error = null;
        }
      })
      .addCase(getAllStoresRequests.rejected, (state, action) => {
        state.requestsDetail.status = "failed";
        state.requestsDetail.error = action.error.message || null;
      })

      // GET USER REQUEST
      .addCase(getStoreRequests.pending, (state) => {
        state.requestsDetail.status = "loading";
        state.requestsDetail.error = null;
      })
      .addCase(getStoreRequests.fulfilled, (state, action) => {
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
            })
          );
          state.requestsDetail.status = "success";
        }
        state.requestsDetail.error = null;
      })
      .addCase(getStoreRequests.rejected, (state, action) => {
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
      })

      // GET STORE INFO
      .addCase(getStoreInfo.pending, (state, action) => {
        state.uniqueStores.status = "loading";
        state.uniqueStores.error = null;
      })
      .addCase(getStoreInfo.fulfilled, (state, action) => {
        if (action.payload.response?.data?.message) {
          state.uniqueStores.status = "failed";
          state.uniqueStores.stores = [
            ...state.uniqueStores.stores,
            {
              id: action.meta.arg,
            } as StoreApiType,
          ];
          state.uniqueStores.error =
            action.payload.response?.data?.message || null;
        } else {
          state.uniqueStores.stores = [
            ...state.uniqueStores.stores,
            action.payload,
          ];
          state.uniqueStores.status = "success";
          state.uniqueStores.error = null;
        }
      })
      .addCase(getStoreInfo.rejected, (state, action) => {
        state.uniqueStores.status = "failed";
        state.uniqueStores.error = action.error.message || null;
      }),
});

export const { addPickedDay, changePickedDay, removePickedDay } =
  storeRequestSlice.actions;

export const storeRequestsSelector = (state: RootState): RequestType[] =>
  state.storeRequest.requestsDetail.requests;
export const storeRequestsLoadingSelector = (state: RootState): string =>
  state.storeRequest.requestsDetail.status;
export const storeRequestsLoadedIdSelector = (
  state: RootState
): number | null => state.storeRequest.requestsDetail.loaded || null;
export const storeRequestsErrorSelector = (state: RootState): string | null =>
  state.storeRequest.requestsDetail.error;

export const storeRequestsUsersSelector = (state: RootState): StoreApiType[] =>
  state.storeRequest.uniqueStores.stores;
export const storeRequestsUsersLoadingSelector = (state: RootState): string =>
  state.storeRequest.requestsDetail.status;
export const storeRequestsUsersLoadedIdSelector = (
  state: RootState
): number | null => state.storeRequest.requestsDetail.loaded || null;
export const storeRequestsUsersErrorSelector = (
  state: RootState
): string | null => state.storeRequest.requestsDetail.error;

export const storePickedDaysSelector = (state: RootState): PickedDayType[] =>
  state.storeRequest.pickedDaysDetail;

export default storeRequestSlice.reducer;
