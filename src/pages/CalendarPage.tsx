import React, { FC } from "react";
import { PageHeadline } from "../components/PageHeadline";
import TXT from "../contexts/texts.json";
import Typography from "@mui/material/Typography";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useNavigate } from "react-router-dom";
import { getTimePickRoutePath } from "../routes/routePaths";

const CalendarPage: FC = () => {
  const navigate = useNavigate();
  // const alreadyPicked: PickedDayType[] = getFromStorage("pickedDays");

  // const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  // const [isDateSelected, setIsDateSelected] = useState<boolean>(false);

  // const [error, setError] = useState<boolean>(false);

  const handleDateSelect = (newValue: any) => {
    // const dayIsAlreadyPicked = alreadyPicked.find(
    //   (pickedDay) => pickedDay.day === newValue.format("MM.DD.YYYY")
    // );

    // if (dayIsAlreadyPicked) {
    //   setError(true);
    //   return;
    // }

    navigate(getTimePickRoutePath(newValue.format("MM.DD.YYYY")));
  };

  return (
    <>
      <PageHeadline headline={TXT.calendarPage.headline} hasBackButton />
      {/* {error && (
        <Alert
          variant="filled"
          severity="error"
          sx={{ marginBottom: "1rem", padding: "0.75rem 1rem" }}
        >
          chyyyyyba
        </Alert>
      )} */}
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
