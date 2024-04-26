import React, { FC } from "react";
import TXT from "../contexts/texts.json";
import { PickedDayType } from "../types/brigadaTypes";
import { PickedDay } from "./PickedDay";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { PickedDayVariant } from "../types/commonTypes";

type Props = {
  pickedDays: PickedDayType[];
  type: PickedDayVariant;
};

// < STYLED COMPONENTS
const PickedDaysListWrapper = styled("div")({
  width: "100%",
  padding: "0rem 0 1rem 0",
});
// STYLED COMPONENTS >

const PickedDaysList: FC<Props> = ({ pickedDays, type }) => {
  console.log("%c⧭ pickedDays", "color: #408059", pickedDays);

  return (
    <PickedDaysListWrapper>
      <Typography
        paragraph
        sx={{
          marginBottom: "1rem",
          fontWeight: "bold",
        }}
      >
        {type === "selected"
          ? TXT.pickedDaysConfirmPage.labelPicked
          : TXT.pickedDaysConfirmPage.labelRequest}
      </Typography>

      {pickedDays
        .sort((a, b) => dayjs(a.day).valueOf() - dayjs(b.day).valueOf())
        .map((day, index) => (
          <PickedDay key={index} pickedDay={day} type={type} />
        ))}
    </PickedDaysListWrapper>
  );
};

export { PickedDaysList };
