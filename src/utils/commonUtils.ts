import dayjs from "dayjs";
import { SelectOptionType } from "../types/commonTypes";
import { StoreApiType } from "../types/storesTypes";
import { PickedDayType, RequestType } from "../types/brigadaTypes";
import TXT from "../contexts/texts.json";

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
