import React, { FC } from "react";
import TXT from "../contexts/texts.json";
import { PickedDayType } from "../types/brigadaTypes";
import { PickedDay } from "./PickedDay";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

type Props = {
  pickedDays: PickedDayType[];
};

// < STYLED COMPONENTS
const PickedDaysListWrapper = styled("div")({
  width: "100%",
  padding: "0rem 0 1rem 0",
});
// STYLED COMPONENTS >

const PickedDaysList: FC<Props> = ({ pickedDays }) => {
  return (
    <PickedDaysListWrapper>
      <Typography
        paragraph
        sx={{
          marginBottom: "1rem",
        }}
      >
        {TXT.pickedDaysConfirmPage.label}
      </Typography>
      {pickedDays
        .sort((a, b) => dayjs(a.day).valueOf() - dayjs(b.day).valueOf())
        .map((day, index) => (
          <PickedDay key={index} pickedDay={day} type="selected" />
        ))}
    </PickedDaysListWrapper>
  );
};

export { PickedDaysList };
