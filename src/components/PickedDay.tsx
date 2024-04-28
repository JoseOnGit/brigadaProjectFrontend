import React, { FC } from "react";
import TXT from "../contexts/texts.json";
import { PickedDayType } from "../types/brigadaTypes";
import dayjs from "dayjs";
import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";
import { getPickedDayRoutePath } from "../routes/routePaths";
import { removeFromStorageList } from "../utils/storageUtils";
import { PickedDayVariant } from "../types/commonTypes";
import { useNavigate } from "react-router-dom";

type Props = {
  pickedDay: PickedDayType;
  type: PickedDayVariant;
};

const PickedDay: FC<Props> = ({ pickedDay, type }) => {
  const navigate = useNavigate();

  // < STYLED COMPONENTS
  const PickedDayWrapper = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "2rem",
    width: "100%",
    padding: "0.5rem",
    background: type === "confirmed" ? "#A7FFB0" : "#F8FFA7",
    marginBottom: "0.5rem",
    borderTop: "1px solid #898989",
    borderBottom: "1px solid #898989",
    fontSize: "0.8rem",
  });
  //  STYLED COMPONENTS >

  const handleRemove = () => {
    const storageList = type === "selected" ? "pickedDays" : "reqestsUser";
    removeFromStorageList(storageList, pickedDay);
  };

  return (
    <PickedDayWrapper>
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
    </PickedDayWrapper>
  );
};

export { PickedDay };
