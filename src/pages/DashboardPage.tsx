import React, { FC } from "react";
import AuthService from "../services/auth.service";
import styled from "@emotion/styled";
import { role } from "../constants/commonConstants";
import { DashboardStore } from "../components/DashboardStore";
import { DashboardUser } from "../components/DashboardUser";

type Props = {};

// < STYLED COMPONENTS
const Dashboard = styled("div")({
  width: "100%",
  textAlign: "center",
});
// STYLED COMPONENTS >

const DashboardPage: FC<Props> = () => {
  const currentUser = AuthService.getCurrentUser();

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
