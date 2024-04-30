import React, { FC } from "react";
import { DashboardUserProfile } from "./DashboardUserProfile";
import { FormSubmitButton } from "./FormSubmitButton";
import { useNavigate } from "react-router-dom";
import TXT from "../contexts/texts.json";
import {
  getCalendarRoutePath,
  getPickedDayRoutePath,
} from "../routes/routePaths";
import { PickedDaysList } from "./PickedDaysList";
import { getFromStorage } from "../utils/storageUtils";
import { RequestType } from "../types/brigadaTypes";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { getDateFormatForURL } from "../utils/commonUtils";
import { CurrentUserType } from "../types/userTypes";
import { useAppSelector } from "../redux/hooks";
import { pickedDaysSelector } from "../slices/user";

type Props = {
  currentUser: CurrentUserType;
};

const DashboardUser: FC<Props> = ({ currentUser }) => {
  const navigate = useNavigate();

  const pickedDays = useAppSelector(pickedDaysSelector);
  const reqestsUser: RequestType[] = getFromStorage("reqestsUser");

  const today = getDateFormatForURL(dayjs());

  const isPickedToday = !!pickedDays.find(
    (pickedDay) => pickedDay.day === today
  );
  const isReqestedToday = !!reqestsUser.find(
    (pickedDay) => pickedDay.day === today
  );

  return (
    <div>
      <DashboardUserProfile currentUser={currentUser} />

      {reqestsUser.length !== 0 && (
        <PickedDaysList pickedDays={reqestsUser} type="confirmed" />
      )}
      {pickedDays.length !== 0 && (
        <PickedDaysList pickedDays={pickedDays} type="selected" />
      )}

      <Typography
        paragraph
        sx={{
          maxWidth: "15rem",
          margin: "3rem auto 3rem auto",
        }}
      >
        {TXT.dashboardPage.user.callToAction1}
        <br />
        <br />
        {TXT.dashboardPage.user.callToAction2}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        sx={{ marginTop: "1rem", padding: "1rem 0rem" }}
        disabled={isPickedToday || isReqestedToday}
        onClick={() => {
          navigate(getPickedDayRoutePath(today));
        }}
      >
        {TXT.dashboardPage.user.todayButton}
      </Button>

      <FormSubmitButton
        onClick={() => navigate(getCalendarRoutePath())}
        label={TXT.dashboardPage.calendarButton}
      />
    </div>
  );
};

export { DashboardUser };
