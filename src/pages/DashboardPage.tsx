import React, { FC } from "react";
// import TXT from "../contexts/texts.json";
import AuthService from "../services/auth.service";
import { DashboardProfile } from "../components/DashboardProfile";
import { FormSubmitButton } from "../components/FormSubmitButton";
import { useNavigate } from "react-router-dom";
import TXT from "../contexts/texts.json";
import {
  getCalendarRoutePath,
  getPickedDayRoutePath,
} from "../routes/routePaths";
import { PickedDaysList } from "../components/PickedDaysList";
import { getFromStorage } from "../utils/storageUtils";
import { PickedDayType } from "../types/brigadaTypes";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { getDateFormatForURL } from "../utils/commonUtils";

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

      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        sx={{ marginTop: "1rem", padding: "1rem 0rem" }}
        onClick={() => {
          const today = getDateFormatForURL(dayjs());
          navigate(getPickedDayRoutePath(today));
        }}
      >
        {TXT.dashboardPage.todayButton}
      </Button>

      <FormSubmitButton
        onClick={() => navigate(getCalendarRoutePath())}
        label={TXT.dashboardPage.calendarButton}
      />
    </Dashboard>
  );
};

export { DashboardPage };
