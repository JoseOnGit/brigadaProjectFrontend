import React, { FC } from "react";
import TXT from "../contexts/texts.json";
import { PickedDayType } from "../types/requestTypes";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { PickedDayVariant } from "../types/commonTypes";
import { useAppSelector } from "../redux/hooks";
import { Loader } from "./Loader";
import {
  storeRequestsLoadedIdSelector,
  storeRequestsLoadingSelector,
} from "../slices/storeRequest";
import { PickedDayByStore } from "./PickedDayByStore";

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

const PickedDayByStoreList: FC<Props> = ({ pickedDays, type }) => {
  const requestsLoading = useAppSelector(storeRequestsLoadingSelector);
  const requestsLoaded = useAppSelector(storeRequestsLoadedIdSelector);

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
          ? TXT.pickedDaysByStoreConfirmPage.labelPicked
          : TXT.pickedDaysByStoreConfirmPage.labelRequest}
      </Typography>

      {requestsLoading === "loading" && !requestsLoaded ? (
        <Loader />
      ) : (
        newPickedDays
          .sort((a: PickedDayType, b: PickedDayType) =>
            a.day.localeCompare(b.day)
          )
          .map((day, index) => (
            <PickedDayByStore key={index} pickedDay={day} type={type} />
          ))
      )}
    </PickedDaysListWrapper>
  );
};

export { PickedDayByStoreList };
