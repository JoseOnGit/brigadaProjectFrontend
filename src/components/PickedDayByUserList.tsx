import React, { FC } from "react";
import TXT from "../contexts/texts.json";
import { PickedDayType } from "../types/requestTypes";
import { PickedDayByUser } from "./PickedDayByUser";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { PickedDayVariant } from "../types/commonTypes";
import { useAppSelector } from "../redux/hooks";
import { Loader } from "./Loader";
import {
  userRequestsLoadedIdSelector,
  userRequestsLoadingSelector,
} from "../slices/userRequest";

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

const PickedDayByUserList: FC<Props> = ({ pickedDays, type }) => {
  const requestsLoading = useAppSelector(userRequestsLoadingSelector);
  const requestsLoaded = useAppSelector(userRequestsLoadedIdSelector);

  // we can't sort origin array 'pickedDays' - it runs TypeScript error
  const newPickedDays = [...pickedDays];

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
        newPickedDays
          .sort((a: PickedDayType, b: PickedDayType) =>
            a.day.localeCompare(b.day)
          )
          .map((day, index) => (
            <PickedDayByUser key={index} pickedDay={day} type={type} />
          ))
      )}
    </PickedDaysListWrapper>
  );
};

export { PickedDayByUserList };
