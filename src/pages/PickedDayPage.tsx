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
import { PickedDayType, RequestType } from "../types/brigadaTypes";
import {
  addToStorageList,
  changeDayInStorageList,
  getFromStorage,
  removeFromStorageList,
} from "../utils/storageUtils";
import Alert from "@mui/material/Alert";

type Props = {};

const PickedDayPage: FC<Props> = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { date: selectedDate } = params;

  const pickedDays: PickedDayType[] = getFromStorage("pickedDays");
  const reqestsUser: RequestType[] = getFromStorage("reqestsUser");

  const alreadyPicked = pickedDays.find(
    (pickedDay) => pickedDay.day === selectedDate
  );
  const alreadyRequested = reqestsUser.find(
    (pickedDay) => pickedDay.day === selectedDate
  );

  const initialTimeStart =
    alreadyRequested && !alreadyRequested.wholeDay
      ? dayjs(alreadyRequested?.timeStart)
      : alreadyPicked && !alreadyPicked.wholeDay
      ? dayjs(alreadyPicked?.timeStart)
      : null;

  const initialTimeEnd =
    alreadyRequested && !alreadyRequested.wholeDay
      ? dayjs(alreadyRequested?.timeEnd)
      : alreadyPicked && !alreadyPicked.wholeDay
      ? dayjs(alreadyPicked?.timeEnd)
      : null;

  const initialWholeDay = alreadyRequested
    ? alreadyRequested.wholeDay
    : alreadyPicked
    ? alreadyPicked.wholeDay
    : false;

  const initialMessage = alreadyRequested
    ? TXT.pickedDayPage.message.alreadyRequested
    : alreadyPicked
    ? TXT.pickedDayPage.message.alreadyPicked
    : "";

  const [selectedTimeStart, setSelectedTimeStart] = useState<Dayjs | null>(
    initialTimeStart
  );
  const [selectedTimeEnd, setSelectedTimeEnd] = useState<Dayjs | null>(
    initialTimeEnd
  );
  const [isWholeDaySelected, setIsWholeDaySelected] =
    useState<boolean>(initialWholeDay);

  const enableButton =
    (selectedTimeStart && selectedTimeEnd) || isWholeDaySelected;

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

    const changeRequestToPicked = () => {
      addToStorageList("pickedDays", pickedDay);
      removeFromStorageList("reqestsUser", pickedDay);
    };

    alreadyRequested
      ? changeRequestToPicked()
      : alreadyPicked
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

      {(alreadyPicked || alreadyRequested) && (
        <Alert
          variant="standard"
          severity="warning"
          sx={{ marginBottom: "1rem", padding: "0.75rem 1rem" }}
        >
          {initialMessage}
        </Alert>
      )}

      <Typography
        paragraph
        sx={{
          marginBottom: "1rem",
        }}
      >
        {TXT.pickedDayPage.chooseTime}
      </Typography>

      <MobileTimePicker
        label={TXT.pickedDayPage.label.timeStart}
        value={selectedTimeStart}
        onChange={handleTimeStartSelect}
        disabled={isWholeDaySelected}
        sx={{
          marginBottom: "1rem",
          marginRight: "1rem",
        }}
      />

      <MobileTimePicker
        label={TXT.pickedDayPage.label.timeEnd}
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
        label={TXT.pickedDayPage.label.wholeDay}
        sx={{
          marginTop: "1rem",
        }}
      />

      <FormSubmitButton
        onClick={handleSubmit}
        label={TXT.pickedDayPage.submitButton}
        disabled={!enableButton}
      />
    </>
  );
};

export { PickedDayPage };
