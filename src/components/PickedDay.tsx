import React, { FC } from "react";
import { PickedDayType } from "../types/brigadaTypes";
import dayjs from "dayjs";
import styled from "@emotion/styled";

type PickedDayVariant = "selected" | "confirmed";

type Props = {
  pickedDay: PickedDayType;
  type: PickedDayVariant;
};

const PickedDay: FC<Props> = ({ pickedDay, type }) => {
  const PickedDayWrapper = styled("div")({
    display: "flex",
    gap: "2rem",
    width: "100%",
    padding: "1rem",
    background: type === "confirmed" ? "green" : "yellow",
    marginBottom: "0.5rem",
    borderTop: "0.25rem solid black",
    borderBottom: "0.25rem solid black",
  });

  return (
    <PickedDayWrapper>
      <div>
        <strong>{dayjs(pickedDay.day).format("D. MMMM YYYY")}</strong>
      </div>
      <div>
        {" "}
        {pickedDay.wholeDay
          ? "Celyyy den"
          : `${dayjs(pickedDay.timeStart).format("H:MM")} - ${dayjs(
              pickedDay.timeEnd
            ).format("HH:MM")}`}
      </div>
    </PickedDayWrapper>
  );
};

export { PickedDay };
