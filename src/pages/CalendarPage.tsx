import React, { FC } from "react";
import { PageHeadline } from "../components/PageHeadline";
import TXT from "../contexts/texts.json";
import Typography from "@mui/material/Typography";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useNavigate } from "react-router-dom";
import { getPickedDayRoutePath } from "../routes/routePaths";
import { PickedDaysList } from "../components/PickedDaysList";
import { getDateFormatForURL } from "../utils/commonUtils";
import { useAppSelector } from "../redux/hooks";
import { pickedDaysSelector, requestsSelector } from "../slices/user";

const CalendarPage: FC = () => {
  const navigate = useNavigate();

  const pickedDays = useAppSelector(pickedDaysSelector);
  const requests = useAppSelector(requestsSelector);

  const handleDateSelect = (value: any) => {
    const selectedDate = getDateFormatForURL(value);
    navigate(getPickedDayRoutePath(selectedDate));
  };

  return (
    <>
      <PageHeadline
        headline={TXT.calendarPage.headline}
        hasBackButton
        bottomSpace="3rem"
      />

      {requests.length !== 0 && (
        <PickedDaysList pickedDays={requests} type="confirmed" />
      )}
      {pickedDays.length !== 0 && (
        <PickedDaysList pickedDays={pickedDays} type="selected" />
      )}

      <Typography
        paragraph
        sx={{
          marginBottom: "1rem",
        }}
      >
        {TXT.calendarPage.chooseDate}
      </Typography>

      <DateCalendar
        // value={selectedDate}
        onChange={handleDateSelect}
        dayOfWeekFormatter={(weekday) => `${weekday}.`}
      />
    </>
  );
};

export { CalendarPage };
