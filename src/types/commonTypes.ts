export type PickedDayVariant = "selected" | "confirmed";

export type DirectionType = "row" | "column";

export type SuccesPageTypes = "registration" | "login" | "confirmed";

export type ReduxStatusType = "init" | "loading" | "success" | "failed";

export type TextFieldPropsType = {
  margin: "normal" | "dense" | "none" | undefined;
  fullWidth: boolean;
  required: boolean;
};

export type SelectOptionType = {
  id: number;
  label: string;
};

export type NameType = {
  id: number;
  name: string;
};

export type ApiCallResponse = {
  message: string;
};
