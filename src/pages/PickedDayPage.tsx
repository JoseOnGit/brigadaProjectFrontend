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
import { PickedDayType, RequestType } from "../types/requestTypes";
import Alert from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  addPickedDay,
  changePickedDay,
  userPickedDaysSelector,
  removeRequest,
  userRequestsSelector,
} from "../slices/userRequest";
import { getDateInFormat } from "../utils/commonUtils";
import { storeRequestsSelector } from "../slices/storeRequest";
import { RequestByStoreList } from "../components/RequestByStoreList";
import { ROLE } from "../constants/commonConstants";
import { userSelector } from "../slices/user";
import { RequestByUserList } from "../components/RequestByUserList";
import { Loader } from "../components/Loader";

type Props = {};

const PickedDayPage: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const { date: currentlySelectedDate } = params;

  const currentUser = useAppSelector(userSelector);
  const isStore = currentUser && currentUser?.roles?.includes(ROLE.MODERATOR);

  const pickedDays = useAppSelector(userPickedDaysSelector);
  const userRequests = useAppSelector(userRequestsSelector);
  const storeRequests = useAppSelector(storeRequestsSelector);

  const currentDateIsPartOf = (requests: RequestType[]) =>
    requests.find((request) => request.day === currentlySelectedDate);

  const isPicked = currentDateIsPartOf(pickedDays);
  const isRequested = isStore
    ? currentDateIsPartOf(storeRequests)
    : currentDateIsPartOf(userRequests);
  const isRequestedBySomeone = isStore
    ? userRequests.filter((request) => request.day === currentlySelectedDate)
    : storeRequests.filter((request) => request.day === currentlySelectedDate);

  const initialTimeStart =
    isRequested && !isRequested.wholeDay
      ? dayjs(isRequested?.timeStart)
      : isPicked && !isPicked.wholeDay
      ? dayjs(isPicked?.timeStart)
      : null;

  const initialTimeEnd =
    isRequested && !isRequested.wholeDay
      ? dayjs(isRequested?.timeEnd)
      : isPicked && !isPicked.wholeDay
      ? dayjs(isPicked?.timeEnd)
      : null;

  const initialWholeDay = isRequested
    ? isRequested.wholeDay
    : isPicked
    ? isPicked.wholeDay
    : false;

  const initialMessageUser = isRequested
    ? TXT.pickedDayPage.user.message.alreadyRequested
    : isPicked
    ? TXT.pickedDayPage.user.message.alreadyPicked
    : "";

  const initialMessageStore = isRequested
    ? TXT.pickedDayPage.store.message.alreadyRequested
    : isPicked
    ? TXT.pickedDayPage.store.message.alreadyPicked
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
      day: currentlySelectedDate || "",
      timeStart: isWholeDaySelected ? "" : selectedTimeStart || "",
      timeEnd: isWholeDaySelected ? "" : selectedTimeEnd || "",
      wholeDay: isWholeDaySelected,
      byStore: isStore,
      level: 0,
    };

    const changeRequestToPicked = () => {
      if (isRequested) {
        dispatch(addPickedDay(pickedDay));
        dispatch(removeRequest(isRequested));
      }
    };

    isRequested
      ? changeRequestToPicked()
      : isPicked
      ? dispatch(changePickedDay(pickedDay))
      : dispatch(addPickedDay(pickedDay));

    navigate(getPickedDaysConfirmRoutePath());
  };

  if (!currentUser.id) {
    return <Loader />;
  }

  return (
    <>
      <PageHeadline
        headline={getDateInFormat(params.date || "")}
        hasBackButton
      />

      {(isPicked || isRequested) && (
        <Alert
          variant="standard"
          severity="warning"
          sx={{ marginBottom: "1rem", padding: "0.75rem 1rem" }}
        >
          {isStore ? initialMessageStore : initialMessageUser}
        </Alert>
      )}

      {isRequestedBySomeone[0] && (
        <>
          <Typography
            paragraph
            sx={{
              marginBottom: "1rem",
              fontWeight: "bold",
            }}
          >
            {isStore
              ? TXT.pickedDayPage.store.message.alreadyRequestedByStore
              : TXT.pickedDayPage.user.message.alreadyRequestedByStore}
          </Typography>

          {isStore ? (
            <RequestByUserList requests={isRequestedBySomeone} noHeader />
          ) : (
            <RequestByStoreList requests={isRequestedBySomeone} noHeader />
          )}
        </>
      )}

      <Typography
        paragraph
        sx={{
          marginBottom: "1rem",
        }}
      >
        {isStore
          ? TXT.pickedDayPage.store.chooseTime
          : TXT.pickedDayPage.user.chooseTime}
      </Typography>

      <MobileTimePicker
        label={
          isStore
            ? TXT.pickedDayPage.store.label.timeStart
            : TXT.pickedDayPage.user.label.timeStart
        }
        value={selectedTimeStart}
        onChange={handleTimeStartSelect}
        disabled={isWholeDaySelected}
        sx={{
          marginBottom: "1rem",
          marginRight: "1rem",
        }}
      />

      <MobileTimePicker
        label={
          isStore
            ? TXT.pickedDayPage.store.label.timeEnd
            : TXT.pickedDayPage.user.label.timeEnd
        }
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
        label={
          isStore
            ? TXT.pickedDayPage.store.label.wholeDay
            : TXT.pickedDayPage.user.label.wholeDay
        }
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
