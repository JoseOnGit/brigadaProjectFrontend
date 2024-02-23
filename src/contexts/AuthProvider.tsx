import React, { FC, ReactNode, createContext, useState } from "react";
import { getEmployeeApiCall } from "../api/apiCalls";
import { EmployeeApiType } from "../types/employeeTypes";

type Props = {
  children: ReactNode;
};

export type AuthContextType = {
  user: EmployeeApiType | undefined;
  isAuthenticated: boolean;
  // isNew: boolean;
  login: (id: number, token?: string, isNew?: boolean) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider: FC<Props> = ({ children }) => {
  // const [user, setUser] = useState(() => getDecodedUserAndSetupToken());
  const [user, setUser] = useState<EmployeeApiType>();
  const [userLoading, setUserLoading] = useState<boolean>(false);
  const [userError, setUserError] = useState<string>("");
  // const [isNew, setIsNew] = useState(false);

  console.log("%c⧭ AuthProvider - user", "color: #807160", user);

  // when 'login()' is called, we fetch employee data according to ID prop
  const login = (id: number) => {
    if (user === undefined && !userLoading && !userError) {
      getEmployeeApiCall(id, setUser, setUserLoading, setUserError);
    }
  };

  const logout = () => {};

  const isAuthenticated = true;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
