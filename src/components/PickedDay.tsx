import React, { FC } from "react";
import TXT from "../contexts/texts.json";
import { PickedDayType, RequestType } from "../types/brigadaTypes";
import dayjs from "dayjs";
import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";
import { getPickedDayRoutePath } from "../routes/routePaths";
import { PickedDayVariant } from "../types/commonTypes";
import { useNavigate } from "react-router-dom";
import {
  removePickedDay,
  removeRequest,
  requestsLoadedIdSelector,
  requestsLoadingSelector,
} from "../slices/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Loader } from "./Loader";

type Props = {
  pickedDay: PickedDayType | RequestType;
  type: PickedDayVariant;
};

const PickedDay: FC<Props> = ({ pickedDay, type }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const requestsLoading = useAppSelector(requestsLoadingSelector);
  const requestsLoaded = useAppSelector(requestsLoadedIdSelector);

  // < STYLED COMPONENTS
  const PickedDayWrapper = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "2rem",
    width: "100%",
    minHeight: "3.6rem",
    padding: "0.5rem",
    background: type === "confirmed" ? "#A7FFB0" : "#F8FFA7",
    marginBottom: "0.5rem",
    borderTop: "1px solid #898989",
    borderBottom: "1px solid #898989",
    fontSize: "0.8rem",
  });
  //  STYLED COMPONENTS >

  const handleRemove = () => {
    type === "confirmed"
      ? dispatch(removeRequest(pickedDay))
      : dispatch(removePickedDay(pickedDay));
  };

  return (
    <PickedDayWrapper>
      {requestsLoading === "loading" && pickedDay.id === requestsLoaded ? (
        <Loader />
      ) : (
        <>
          <div>
            <strong>{dayjs(pickedDay.day).format("D. MMMM YYYY")}</strong>
          </div>

          <div>
            {" "}
            {pickedDay.wholeDay
              ? TXT.pickedDaysConfirmPage.wholeDay
              : `${dayjs(pickedDay.timeStart).format("H:MM")} - ${dayjs(
                  pickedDay.timeEnd
                ).format("HH:MM")}`}
          </div>

          <div>
            <IconButton
              onClick={() => navigate(getPickedDayRoutePath(pickedDay.day))}
              aria-label="edit picked day"
              color="primary"
            >
              <CreateIcon />
            </IconButton>
            <IconButton
              onClick={handleRemove}
              href={""}
              aria-label="remove picked day"
              color="primary"
            >
              <CloseIcon />
            </IconButton>
          </div>
        </>
      )}
    </PickedDayWrapper>
  );
};

export { PickedDay };
