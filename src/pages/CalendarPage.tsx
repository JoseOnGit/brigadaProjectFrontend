import React, { FC } from "react";
import { PageHeadline } from "../components/PageHeadline";
import TXT from "../contexts/texts.json";
import Typography from "@mui/material/Typography";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useNavigate } from "react-router-dom";
import { getPickedDayRoutePath } from "../routes/routePaths";
import { getDateFormatForURL } from "../utils/commonUtils";

const CalendarPage: FC = () => {
  const navigate = useNavigate();

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
