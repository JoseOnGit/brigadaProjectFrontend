import React, { FC, ReactNode, createContext } from "react";

type Props = {
  children: ReactNode;
};

export type AuthContextType = {
  // user: LoggedUser;
  isAuthenticated: boolean;
  isNew: boolean;
  login: (token: string, isNew: boolean) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

const AuthProvider: FC<Props> = ({ children }) => {
  // const [user, setUser] = useState(() => getDecodedUserAndSetupToken());
  // const [isNew, setIsNew] = useState(false);

  return <div>AuthProvider</div>;
};

export { AuthProvider };
