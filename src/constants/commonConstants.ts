import { TextFieldPropsType } from "../types/commonTypes";

export const MAX_CONTENT_WIDTH = "50rem";
export const DEFAULT_EMPLOYEE_LEVEL_GROUP_PADDING = "0rem";
export const TEXT_FIELD_COMMON_PROPS: TextFieldPropsType = {
  margin: "normal",
  fullWidth: true,
  required: true,
};

export enum AUTH_MESSAGE {
  invalidPassword = "invalid_password",
  userNotFound = "user_not_found",
  phoneIsInUse = "phone_is_in_use",
  emailIsInUse = "email_is_in_use",
  networkError = "Network Error",
  userRegisteredSuccessfully = "user_registered_successfully",
}

export enum ROLE {
  USER = "ROLE_USER",
  MODERATOR = "ROLE_MODERATOR",
  ADMIN = "ROLE_ADMIN",
}
