import React, { FC, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { role } from "../constants/commonConstants";
import { DashboardStore } from "../components/DashboardStore";
import { DashboardUser } from "../components/DashboardUser";
import { useAppSelector } from "../redux/hooks";
import { userSelector } from "../slices/user";

type Props = {};

// < STYLED COMPONENTS
const Dashboard = styled("div")({
  width: "100%",
  textAlign: "center",
});
// STYLED COMPONENTS >

const DashboardPage: FC<Props> = () => {
  const userStatus = useAppSelector(userSelector);
  const [currentUser, setCurrentUser] = useState(userStatus);

  useEffect(() => {
    setCurrentUser(userStatus);
  }, [userStatus]);

  return (
    <Dashboard>
      {currentUser.roles.includes(role.MODERATOR) ? (
        <DashboardStore currentUser={currentUser} />
      ) : (
        <DashboardUser currentUser={currentUser} />
      )}
    </Dashboard>
  );
};

export { DashboardPage };
