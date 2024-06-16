import dayjs from "dayjs";
import { SelectOptionType } from "../types/commonTypes";
import { StoreApiType } from "../types/storesTypes";
import { PickedDayType, RequestType } from "../types/requestTypes";
import TXT from "../contexts/texts.json";
import { getAllUsersRequests, getUserRequests } from "../slices/userRequest";
import { getAllStoresRequests, getStoreRequests } from "../slices/storeRequest";

export const getStoresOptions = (stores: StoreApiType[]): SelectOptionType[] =>
  stores.map((store) => ({
    id: store.id,
    label: store.name,
  }));

export const getDateFormatForURL = (value: any) => {
  return value.format("MM.DD.YYYY");
};

export const getWorkTime = (request: PickedDayType | RequestType) => {
  return request.wholeDay
    ? TXT.common.wholeDay
    : `${dayjs(request.timeStart).format("H:MM")} - ${dayjs(
        request.timeEnd
      ).format("HH:MM")}`;
};

export const getDateInFormat = (date: string) => {
  return dayjs(date).format("D. MMMM YYYY");
};

export const fetchDataForUser = (dispatch: any, id: number) => {
  dispatch(getUserRequests(id));
  dispatch(getAllStoresRequests());
};

export const fetchDataForStore = (dispatch: any, id: number) => {
  dispatch(getStoreRequests(id));
  dispatch(getAllUsersRequests());
};
