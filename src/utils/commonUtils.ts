import { SelectOptionsType } from "../types/commonTypes";
import { StoreApiType } from "../types/storesTypes";
import TXT from "../contexts/texts.json";
import { FieldError } from "react-hook-form-mui";
import { authMessage } from "../constants/commonConstants";

export const getStoresOptions = (stores: StoreApiType[]): SelectOptionsType =>
  stores.map((store) => ({
    id: store.ID,
    label: store.Name,
  }));

export const getServerMessage = (response: string) => {
  switch (response) {
    // possible LOGIN messages from backend
    case authMessage.invalidPassword:
      return TXT.common.message.invalidPasword;

    case authMessage.userNotFound:
      return TXT.common.message.userNotFound;

    // possible REGISTER messages from backend
    case authMessage.usernameIsInUse:
      return TXT.common.message.usernameIsInUse;

    case authMessage.emailIsInUse:
      return TXT.common.message.emailIsInUse;

    default:
      return response;
  }
};

export const getFormMessage = (error: FieldError) => {
  switch (error.type) {
    case "required":
      return TXT.common.message.required;

    case "pattern":
      return TXT.common.message.emailPattern;

    default:
      return error.message || "";
  }
};
