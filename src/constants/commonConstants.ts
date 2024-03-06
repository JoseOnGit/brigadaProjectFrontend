import { TextFieldPropsType } from "../types/commonTypes";

export const textFieldBasicProps: TextFieldPropsType = {
  margin: "normal",
  fullWidth: true,
  required: true,
};

export enum authMessage {
  invalidPassword = "invalid_password",
  userNotFound = "user_not_found",
  usernameIsInUse = "username_is_in_use",
  emailIsInUse = "email_is_in_use",
  userRegisteredSuccessfully = "user_registered_successfully",
}

export enum role {
  USER = "ROLE_USER",
  MODERATOR = "ROLE_MODERATOR",
  ADMIN = "ROLE_ADMIN",
}
