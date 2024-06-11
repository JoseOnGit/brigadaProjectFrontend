import React, { FC, useEffect, useMemo } from "react";
import TXT from "../contexts/texts.json";
import { RequestType } from "../types/requestTypes";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { Loader } from "./Loader";
import { RequestByUser } from "./RequestByUser";
import { CurrentUserType } from "../types/userTypes";
import {
  getUserInfo,
  userRequestsLoadingSelector,
  userRequestsUsersSelector,
} from "../slices/userRequest";
import { getDateInFormat } from "../utils/commonUtils";

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

const RequestByUserList: FC<Props> = ({ requests, noHeader }) => {
  const dispatch = useAppDispatch();

  const requestsUsers = useAppSelector(userRequestsUsersSelector);
  const requestsLoading = useAppSelector(userRequestsLoadingSelector);

  // first we fetch Users data for requests
  const uniqueUsers = useMemo(() => {
    return requests
      .map((request) => request.userId)
      .filter((value, index, self) => self.indexOf(value) === index);
  }, [requests]);

  useEffect(() => {
    if (uniqueUsers)
      uniqueUsers.map((uniqueUser) => {
        const alreadyFetchedUser =
          requestsUsers.find(
            (requestsUser) => requestsUser.id === uniqueUser
          ) || ({} as CurrentUserType);

        if (!alreadyFetchedUser.id) {
          dispatch(getUserInfo(uniqueUser || 0));
        }

        return null;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniqueUsers]);

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
              requestsUsers.find((user) => user.id === request.userId) ||
              ({} as CurrentUserType);

            return (
              <RequestByUser key={index} request={request} requestUser={user} />
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
          {TXT.dashboardPage.store.userList.label}
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

export { RequestByUserList };
