import React, { FC } from "react";
import TXT from "../contexts/texts.json";
import { PickedDayType } from "../types/brigadaTypes";
import { PickedDay } from "./PickedDay";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { PickedDayVariant } from "../types/commonTypes";
import { useAppSelector } from "../redux/hooks";
import {
  requestsLoadedIdSelector,
  requestsLoadingSelector,
} from "../slices/user";
import { Loader } from "./Loader";

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
  const requestsLoading = useAppSelector(requestsLoadingSelector);
  const requestsLoaded = useAppSelector(requestsLoadedIdSelector);

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

      {requestsLoading === "loading" && !requestsLoaded ? (
        <Loader />
      ) : (
        pickedDays
          // .sort((a: PickedDayType, b: PickedDayType) => {
          //   return dayjs(a.day).valueOf() - dayjs(b.day).valueOf();
          // })
          .map((day, index) => (
            <PickedDay key={index} pickedDay={day} type={type} />
          ))
      )}
    </PickedDaysListWrapper>
  );
};

export { PickedDaysList };
