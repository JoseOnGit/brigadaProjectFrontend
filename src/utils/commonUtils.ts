import { SelectOptionsType } from "../types/commonTypes";
import { StoreApiType } from "../types/storesTypes";

export const getStoresOptions = (stores: StoreApiType[]): SelectOptionsType =>
  stores.map((store) => ({
    id: store.ID,
    label: store.Name,
  }));
