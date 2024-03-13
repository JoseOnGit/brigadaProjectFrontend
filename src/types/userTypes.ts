import { NameType } from "./commonTypes";

export type CurrentUserType = {
  id: number;
  name: string;
  surname: string;
  phone: string;
  email: string;
  base: NameType;
  level: number;
  onboardDate: string;
  roles: string[];
  accessToken: string;
};

export type RegistrationUserType = {
  name: string;
  surname: string;
  phone: string;
  email: string;
  baseId?: NameType;
  level: number;
  onboardDate: string;
  password: string;
};
