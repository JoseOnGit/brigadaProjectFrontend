import React, { FC } from "react";
import styled from "@emotion/styled";
import { ROLE } from "../constants/commonConstants";
import { DashboardStore } from "../components/DashboardStore";
import { DashboardUser } from "../components/DashboardUser";
import { useAppSelector } from "../redux/hooks";
import { userSelector } from "../slices/user";
import { Loader } from "../components/Loader";

// < STYLED COMPONENTS
const Dashboard = styled("div")({
  width: "100%",
  textAlign: "center",
});
// STYLED COMPONENTS >

const DashboardPage: FC = () => {
  const currentUser = useAppSelector(userSelector);

  // in case we refresh page we refetch user data,
  // untill it's done we show Loader
  if (!currentUser?.id) {
    return <Loader />;
  }

  return (
    <Dashboard>
      {currentUser?.roles?.includes(ROLE.MODERATOR) ? (
        <DashboardStore currentUser={currentUser} />
      ) : (
        <DashboardUser currentUser={currentUser} />
      )}
    </Dashboard>
  );
};

export { DashboardPage };
