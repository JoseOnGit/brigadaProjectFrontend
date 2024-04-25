import React, { FC } from "react";
import TXT from "../contexts/texts.json";
import { PickedDayType } from "../types/brigadaTypes";
import dayjs from "dayjs";
import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";
import { getTimePickRoutePath } from "../routes/routePaths";
import { removeFromStorageList } from "../utils/storageUtils";

type PickedDayVariant = "selected" | "confirmed";

type Props = {
  pickedDay: PickedDayType;
  type: PickedDayVariant;
};

const PickedDay: FC<Props> = ({ pickedDay, type }) => {
  const PickedDayWrapper = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "2rem",
    width: "100%",
    padding: "0.5rem",
    background: type === "confirmed" ? "green" : "#F8FFA7",
    marginBottom: "0.5rem",
    borderTop: "1px solid #898989",
    borderBottom: "1px solid #898989",
    fontSize: "0.8rem",
  });

  const handleRemove = () => {
    removeFromStorageList("pickedDays", pickedDay, true);
  };

  return (
    <PickedDayWrapper>
      <div>
        <strong>{dayjs(pickedDay.day).format("D. MMMM YYYY")}</strong>
      </div>
      <div>
        {" "}
        {pickedDay.wholeDay
          ? TXT.pickedDaysPage.wholeDay
          : `${dayjs(pickedDay.timeStart).format("H:MM")} - ${dayjs(
              pickedDay.timeEnd
            ).format("HH:MM")}`}
      </div>
      <div>
        <IconButton
          href={getTimePickRoutePath(pickedDay.day)}
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
