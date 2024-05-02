import React, { FC, useEffect, useMemo } from "react";
import { FormSubmitButton } from "./FormSubmitButton";
import { useNavigate } from "react-router-dom";
import TXT from "../contexts/texts.json";
import {
  getCalendarRoutePath,
  getPickedDayRoutePath,
} from "../routes/routePaths";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { getDateFormatForURL } from "../utils/commonUtils";
import { DashboardStoreProfile } from "./DashboardStoreProfile";
import { CurrentUserType } from "../types/userTypes";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  getUserInfo,
  requestsSelector,
  requestsUsersSelector,
} from "../slices/user";
import { RequestByUserList } from "./RequestByUserList";

type Props = {
  currentUser: CurrentUserType;
};

const DashboardStore: FC<Props> = ({ currentUser }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const requests = useAppSelector(requestsSelector);
  const requestsUsers = useAppSelector(requestsUsersSelector);

  const uniqueUsers = useMemo(() => {
    return requests
      .map((request) => request.userId)
      .filter((value, index, self) => self.indexOf(value) === index);
  }, [requests]);

  useEffect(() => {
    if (uniqueUsers)
      uniqueUsers.map((uniqueUser) => {
        const alreadyFetchedUser =
          requestsUsers.find(
            (requestsUser) => requestsUser.id === uniqueUser
          ) || ({} as CurrentUserType);

        if (!alreadyFetchedUser.id) {
          dispatch(getUserInfo(uniqueUser || 0));
        }

        return null;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniqueUsers]);

  const today = getDateFormatForURL(dayjs());

  return (
    <div>
      <DashboardStoreProfile currentUser={currentUser} />

      {requests.length !== 0 && <RequestByUserList requests={requests} />}

      <Typography
        paragraph
        sx={{
          maxWidth: "15rem",
          margin: "3rem auto 3rem auto",
        }}
      >
        {TXT.dashboardPage.store.callToAction1}
        <br />
        <br />
        {TXT.dashboardPage.store.callToAction2}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        sx={{ marginTop: "1rem", padding: "1rem 0rem" }}
        // disabled={isPickedToday || isReqestedToday}
        onClick={() => {
          navigate(getPickedDayRoutePath(today));
        }}
      >
        {TXT.dashboardPage.store.todayButton}
      </Button>

      <FormSubmitButton
        onClick={() => navigate(getCalendarRoutePath())}
        label={TXT.dashboardPage.calendarButton}
      />
    </div>
  );
};

export { DashboardStore };
