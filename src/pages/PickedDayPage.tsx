import React, { FC, useState } from "react";
import TXT from "../contexts/texts.json";
import Typography from "@mui/material/Typography";
import dayjs, { Dayjs } from "dayjs";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FormSubmitButton } from "../components/FormSubmitButton";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeadline } from "../components/PageHeadline";
import { getPickedDaysConfirmRoutePath } from "../routes/routePaths";
import { PickedDayType } from "../types/brigadaTypes";
import {
  addToStorageList,
  changeDayInStorageList,
  getFromStorage,
} from "../utils/storageUtils";
import Alert from "@mui/material/Alert";

type Props = {};

const PickedDayPage: FC<Props> = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { date: selectedDate } = params;

  const pickedDays: PickedDayType[] = getFromStorage("pickedDays");

  console.log("%c⧭ pickedDays ", "color: #731d6d", pickedDays);
  console.log("%c⧭ selectedDate ", "color: #731d6d", selectedDate);

  const alreadyPicked = pickedDays.find(
    (pickedDay) => pickedDay.day === selectedDate
  );

  console.log("%c⧭ alreadyPicked ", "color: #006dcc", alreadyPicked);

  const [selectedTimeStart, setSelectedTimeStart] = useState<Dayjs | null>(
    alreadyPicked && !alreadyPicked.wholeDay
      ? dayjs(alreadyPicked?.timeStart)
      : null
  );
  const [selectedTimeEnd, setSelectedTimeEnd] = useState<Dayjs | null>(
    alreadyPicked && !alreadyPicked.wholeDay
      ? dayjs(alreadyPicked?.timeEnd)
      : null
  );
  const [isWholeDaySelected, setIsWholeDaySelected] = useState<boolean>(
    alreadyPicked ? alreadyPicked.wholeDay : false
  );
  console.log("%c⧭ selectedTimeStart ", "color: #e57373", selectedTimeStart);
  console.log("%c⧭ selectedTimeEnd ", "color: #e57373", selectedTimeEnd);
  console.log("%c⧭ isWholeDaySelected ", "color: #e57373", isWholeDaySelected);

  const enableButton =
    (selectedTimeStart && selectedTimeEnd) || isWholeDaySelected;

  console.log("%c⧭ enableButton ", "color: #997326", enableButton);

  const handleTimeStartSelect = (value: any) => {
    setSelectedTimeStart(value);
  };

  const handleTimeEndSelect = (value: any) => {
    setSelectedTimeEnd(value);
  };

  const handleSubmit = () => {
    const pickedDay: PickedDayType = {
      day: selectedDate || "",
      timeStart: isWholeDaySelected ? "" : selectedTimeStart || "",
      timeEnd: isWholeDaySelected ? "" : selectedTimeEnd || "",
      wholeDay: isWholeDaySelected,
    };

    alreadyPicked
      ? changeDayInStorageList("pickedDays", pickedDay)
      : addToStorageList("pickedDays", pickedDay);

    navigate(getPickedDaysConfirmRoutePath());
  };

  return (
    <>
      <PageHeadline
        headline={dayjs(params.date).format("D. MMMM YYYY") || ""}
        hasBackButton
      />

      {alreadyPicked && (
        <Alert
          variant="standard"
          severity="warning"
          sx={{ marginBottom: "1rem", padding: "0.75rem 1rem" }}
        >
          {TXT.timePickPage.message.alreadyPicked}
        </Alert>
      )}

      <Typography
        paragraph
        sx={{
          marginBottom: "1rem",
        }}
      >
        {TXT.timePickPage.chooseTime}
      </Typography>

      <MobileTimePicker
        label={TXT.timePickPage.label.timeStart}
        value={selectedTimeStart}
        onChange={handleTimeStartSelect}
        disabled={isWholeDaySelected}
        sx={{
          marginBottom: "1rem",
          marginRight: "1rem",
        }}
      />

      <MobileTimePicker
        label={TXT.timePickPage.label.timeEnd}
        value={selectedTimeEnd}
        onChange={handleTimeEndSelect}
        disabled={isWholeDaySelected}
        sx={{
          marginBottom: "1rem",
          marginRight: "1rem",
        }}
      />

      <br />

      <FormControlLabel
        control={
          <Checkbox
            checked={isWholeDaySelected}
            onChange={() => setIsWholeDaySelected(!isWholeDaySelected)}
          />
        }
        label={TXT.timePickPage.label.wholeDay}
        sx={{
          marginTop: "1rem",
        }}
      />

      <FormSubmitButton
        onClick={handleSubmit}
        label={TXT.timePickPage.submitButton}
        disabled={!enableButton}
      />
    </>
  );
};

export { PickedDayPage };
