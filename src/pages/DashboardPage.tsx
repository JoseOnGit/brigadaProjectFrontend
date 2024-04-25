import React, { FC } from "react";
// import TXT from "../contexts/texts.json";
import AuthService from "../services/auth.service";
import { DashboardProfile } from "../components/DashboardProfile";
import { FormSubmitButton } from "../components/FormSubmitButton";
import { useNavigate } from "react-router-dom";
import TXT from "../contexts/texts.json";
import { getCalendarRoutePath } from "../routes/routePaths";
import { PickedDaysList } from "../components/PickedDaysList";
import { getFromStorage } from "../utils/storageUtils";
import { PickedDayType } from "../types/brigadaTypes";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

type Props = {};

// < STYLED COMPONENTS
const Dashboard = styled("div")({
  width: "100%",
  textAlign: "center",
});

// STYLED COMPONENTS >

const DashboardPage: FC<Props> = () => {
  const navigate = useNavigate();

  const pickedDays: PickedDayType[] = getFromStorage("pickedDays");

  const currentUser = AuthService.getCurrentUser();

  return (
    <Dashboard>
      <DashboardProfile currentUser={currentUser} />

      {pickedDays.length !== 0 && <PickedDaysList pickedDays={pickedDays} />}

      <Typography
        paragraph
        sx={{
          maxWidth: "15rem",
          margin: "2rem auto 3rem auto",
        }}
      >
        {TXT.dashboardPage.callToAction1}
        <br />
        <br />
        {TXT.dashboardPage.callToAction2}
      </Typography>

      <FormSubmitButton
        onClick={() => navigate(getCalendarRoutePath())}
        label={TXT.dashboardPage.calendarButton}
      />
    </Dashboard>
  );
};

export { DashboardPage };
