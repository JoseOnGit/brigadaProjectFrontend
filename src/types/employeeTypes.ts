export type EmployeeType = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  avatar?: string;
  base: string;
  isAdult: boolean;
  isCassa: boolean;
  isMerch: boolean;
  password?: string;
  newPassword?: string;
  newPasswordRepeat?: string;
  registerDate?: string;
  version?: number;
};

export type EmployeeApiType = {
  ID: number;
  Name: string;
  Surname: string;
  Email: string;
  Phone: string;
  Avatar?: string;
  Base: string;
  isAdult: boolean;
  isCassa: boolean;
  isMerch: boolean;
  Password: string;
  RegisterDate?: string;
  Review?: string;
  Request?: EmployeeApiType;
  RequestDate?: string;
  isApproved: boolean;
  version?: number;
};
