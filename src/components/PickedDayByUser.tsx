import React, { FC } from "react";
import { PickedDayType, RequestType } from "../types/requestTypes";
import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";
import { getPickedDayRoutePath } from "../routes/routePaths";
import { PickedDayVariant } from "../types/commonTypes";
import { useNavigate } from "react-router-dom";
import { removePickedDayByUser } from "../slices/userRequest";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Loader } from "./Loader";
import { getDateInFormat, getWorkTime } from "../utils/commonUtils";
import {
  removeUserRequest,
  userRequestsLoadedIdSelector,
  userRequestsLoadingSelector,
} from "../slices/userRequest";

type Props = {
  pickedDay: PickedDayType | RequestType;
  type: PickedDayVariant;
};

const PickedDayByUser: FC<Props> = ({ pickedDay, type }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const requestsLoading = useAppSelector(userRequestsLoadingSelector);
  const requestsLoaded = useAppSelector(userRequestsLoadedIdSelector);

  // < STYLED COMPONENTS
  const PickedDayWrapper = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "2rem",
    width: "100%",
    minHeight: "3.6rem",
    padding: "0.5rem",
    background: type === "confirmed" ? "#a7ffb0" : "#f8ffa7",
    marginBottom: "0.5rem",
    borderTop: "1px solid #898989",
    borderBottom: "1px solid #898989",
    fontSize: "0.8rem",
    borderRadius: "0.25rem",
  });
  //  STYLED COMPONENTS >

  const handleRemove = () => {
    type === "confirmed"
      ? dispatch(removeUserRequest(pickedDay))
      : dispatch(removePickedDayByUser(pickedDay));
  };

  return (
    <PickedDayWrapper>
      {requestsLoading === "loading" && pickedDay.id === requestsLoaded ? (
        <Loader />
      ) : (
        <>
          <div>
            <strong>{getDateInFormat(pickedDay.day)}</strong>
          </div>

          <div>{getWorkTime(pickedDay)}</div>

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

export { PickedDayByUser };
