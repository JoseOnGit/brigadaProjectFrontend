import { SelectOptionsType } from "../types/commonTypes";
import { StoreApiType } from "../types/storesTypes";

export const getStoresOptions = (stores: StoreApiType[]): SelectOptionsType =>
  stores.map((store) => ({
    id: store.id,
    label: store.name,
  }));

export const getDateFormatForURL = (value: any) => {
  return value.format("MM.DD.YYYY");
};
