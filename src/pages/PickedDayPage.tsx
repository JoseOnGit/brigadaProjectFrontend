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
  changeDayInStorageList,
  removeFromStorageList,
} from "../utils/storageUtils";
import Alert from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  addPickedDay,
  pickedDaysSelector,
  requestsSelector,
} from "../slices/user";

type Props = {};

const PickedDayPage: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { date: selectedDate } = params;

  const pickedDays = useAppSelector(pickedDaysSelector);
  const reqestsUser = useAppSelector(requestsSelector);

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
      dispatch(addPickedDay(pickedDay));
      removeFromStorageList("reqestsUser", pickedDay);
    };

    alreadyRequested
      ? changeRequestToPicked()
      : alreadyPicked
      ? changeDayInStorageList("pickedDays", pickedDay)
      : dispatch(addPickedDay(pickedDay));

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
