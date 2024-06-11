import React, { FC, useEffect, useMemo } from "react";
import TXT from "../contexts/texts.json";
import { RequestType } from "../types/requestTypes";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { Loader } from "./Loader";
import {
  getStoreInfo,
  storeRequestsLoadingSelector,
  storeRequestsStoresSelector,
} from "../slices/storeRequest";
import { RequestByStore } from "./RequestByStore";
import { StoreApiType } from "../types/storesTypes";
import { getDateInFormat } from "../utils/commonUtils";
import { CurrentUserType } from "../types/userTypes";

type Props = {
  requests: RequestType[];
  noHeader?: boolean;
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

const RequestByStoreList: FC<Props> = ({ requests, noHeader = false }) => {
  const dispatch = useAppDispatch();

  const requestsStores = useAppSelector(storeRequestsStoresSelector);
  const requestsLoading = useAppSelector(storeRequestsLoadingSelector);

  // first we fetch Stores data for requests
  const uniqueStores = useMemo(() => {
    return requests
      .map((request) => request.userId)
      .filter((value, index, self) => self.indexOf(value) === index);
  }, [requests]);

  useEffect(() => {
    if (uniqueStores)
      uniqueStores.map((uniqueStore) => {
        const alreadyFetchedStore =
          requestsStores.find(
            (requestsStore) => requestsStore.id === uniqueStore
          ) || ({} as CurrentUserType);

        if (!alreadyFetchedStore.id) {
          dispatch(getStoreInfo(uniqueStore || 0));
        }

        return null;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniqueStores]);

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
          {!noHeader && <DateWrapper>{getDateInFormat(date)}</DateWrapper>}
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
      {!noHeader && (
        <Typography
          paragraph
          sx={{
            marginBottom: "1rem",
            fontWeight: "bold",
          }}
        >
          {TXT.dashboardPage.user.storeList.label}
        </Typography>
      )}

      {requestsLoading === "loading" ? (
        <Loader />
      ) : (
        <div>{renderRequests()}</div>
      )}
    </RequestByUserListWrapper>
  );
};

export { RequestByStoreList };
