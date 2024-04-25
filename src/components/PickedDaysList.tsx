import React, { FC, ReactNode } from "react";
import TXT from "../contexts/texts.json";
import { PickedDayType } from "../types/brigadaTypes";
import { PickedDay } from "./PickedDay";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

type Props = {
  pickedDays: PickedDayType[];
  children?: ReactNode;
};

// < STYLED COMPONENTS
const PickedDaysListWrapper = styled("div")({
  width: "100%",
  padding: "0rem 0 1rem 0",
});

// STYLED COMPONENTS >

const PickedDaysList: FC<Props> = ({ pickedDays, children }) => {
  // const handleSubmit = () => {
  //   console.log("%c⧭ pickedDays ", "color: #bfffc8");
  // };

  return (
    <PickedDaysListWrapper>
      <Typography
        paragraph
        sx={{
          marginBottom: "1rem",
        }}
      >
        {TXT.pickedDaysPage.label}
      </Typography>
      {pickedDays
        .sort((a, b) => dayjs(a.day).valueOf() - dayjs(b.day).valueOf())
        .map((day, index) => (
          <PickedDay key={index} pickedDay={day} type="selected" />
        ))}

      {children && children}

      {/* <FormSubmitButton
        onClick={handleSubmit}
        label={TXT.pickedDaysPage.submitButton}
      /> */}
    </PickedDaysListWrapper>
  );
};

export { PickedDaysList };
