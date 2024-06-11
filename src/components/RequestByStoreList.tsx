import React, { FC } from "react";
import TXT from "../contexts/texts.json";
import { RequestType } from "../types/requestTypes";
import { useAppSelector } from "../redux/hooks";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { Loader } from "./Loader";
import {
  storeRequestsLoadingSelector,
  storeRequestsStoresSelector,
} from "../slices/storeRequest";
import { RequestByStore } from "./RequestByStore";
import { StoreApiType } from "../types/storesTypes";
import { getDateInFormat } from "../utils/commonUtils";

type Props = {
  requests: RequestType[];
};

// < STYLED COMPONENTS
const RequestByUserListWrapper = styled("div")({
  width: "100%",
  padding: "0rem 0 1rem 0",
});
const DateWrapper = styled("div")({
  width: "100%",
  textAlign: "left",
  padding: "0.5rem 0 0.5rem 0",
  fontWeight: "bold",
});
// STYLED COMPONENTS >

const RequestByStoreList: FC<Props> = ({ requests }) => {
  const requestsStores = useAppSelector(storeRequestsStoresSelector);
  const requestsLoading = useAppSelector(storeRequestsLoadingSelector);

  // we can't sort origin array 'requests' - it runs TypeScript error
  const newReqests = [...requests];
  const sortedRequests = newReqests.sort((a, b) => a.day.localeCompare(b.day));

  const groupedObjects = new Map<string, RequestType[]>();

  sortedRequests.forEach((obj) => {
    const category = obj.day;
    groupedObjects.set(
      category,
      (groupedObjects.get(category) || []).concat(obj)
    );
  });

  const grouped = Object.fromEntries(groupedObjects);

  const renderRequests = () => {
    const requestsDates = Object.keys(grouped);

    return requestsDates.map((date) => {
      return (
        <div key={date}>
          <DateWrapper>{getDateInFormat(date)}</DateWrapper>
          {grouped[date].map((request, index) => {
            const user =
              requestsStores.find((user) => user.id === request.userId) ||
              ({} as StoreApiType);

            return (
              <RequestByStore
                key={index}
                request={request}
                requestStore={user}
              />
            );
          })}
        </div>
      );
    });
  };

  return (
    <RequestByUserListWrapper>
      <Typography
        paragraph
        sx={{
          marginBottom: "1rem",
          fontWeight: "bold",
        }}
      >
        {TXT.dashboardPage.user.storeList.label}
      </Typography>

      {requestsLoading === "loading" ? (
        <Loader />
      ) : (
        <div>{renderRequests()}</div>
      )}
    </RequestByUserListWrapper>
  );
};

export { RequestByStoreList };
