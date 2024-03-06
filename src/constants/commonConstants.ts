import { TextFieldPropsType } from "../types/commonTypes";

export const textFieldBasicProps: TextFieldPropsType = {
  margin: "normal",
  fullWidth: true,
  required: true,
};

export enum authMessage {
  invalidPassword = "invalid_password",
  userNotFound = "user_not_found",
  userRegisteredSuccessfully = "user_registered_successfully",
  usernameIsInUse = "username_is_in_use",
  emailIsInUse = "email_is_in_use",
}
