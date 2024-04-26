export type PickedDayVariant = "selected" | "confirmed";

export type DirectionType = "row" | "column";

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

export type SelectOptionsType = SelectOptionType[];

export type ApiCallResponse = {
  message: string;
};
