import React, { FC } from "react";
import { PageHeadline } from "../components/PageHeadline";
import TXT from "../contexts/texts.json";
import Typography from "@mui/material/Typography";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useNavigate } from "react-router-dom";
import { getTimePickRoutePath } from "../routes/routePaths";
import { getFromStorage } from "../utils/storageUtils";
import { PickedDayType } from "../types/brigadaTypes";
import { PickedDaysList } from "../components/PickedDaysList";

const CalendarPage: FC = () => {
  const navigate = useNavigate();

  const pickedDays: PickedDayType[] = getFromStorage("pickedDays");

  const handleDateSelect = (newValue: any) => {
    navigate(getTimePickRoutePath(newValue.format("MM.DD.YYYY")));
  };

  return (
    <>
      <PageHeadline
        headline={TXT.calendarPage.headline}
        hasBackButton
        bottomSpace="3rem"
      />

      {pickedDays.length !== 0 && <PickedDaysList pickedDays={pickedDays} />}

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
