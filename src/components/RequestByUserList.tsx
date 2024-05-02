import React, { FC } from "react";
import TXT from "../contexts/texts.json";
import { RequestType } from "../types/brigadaTypes";
import { useAppSelector } from "../redux/hooks";
import { requestsLoadingSelector, requestsUsersSelector } from "../slices/user";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { Loader } from "./Loader";
import { RequestByUser } from "./RequestByUser";
import { CurrentUserType } from "../types/userTypes";
import dayjs from "dayjs";

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
  padding: "0rem 0 1rem 0",
  fontWeight: "bold",
});
// STYLED COMPONENTS >

const RequestByUserList: FC<Props> = ({ requests }) => {
  const requestsUsers = useAppSelector(requestsUsersSelector);
  const requestsLoading = useAppSelector(requestsLoadingSelector);

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
          <DateWrapper>{dayjs(date).format("D.MMM.YYYY")}</DateWrapper>
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

  // const renderRequests = () => {
  //   return sortedRequests.map((request, index) => {
  //     const user =
  //       requestsUsers.find((user) => user.id === request.userId) ||
  //       ({} as CurrentUserType);

  //     return <RequestByUser key={index} request={request} requestUser={user} />;
  //   });
  // };

  return (
    <RequestByUserListWrapper>
      <Typography
        paragraph
        sx={{
          marginBottom: "1rem",
          fontWeight: "bold",
        }}
      >
        {TXT.dashboardPage.store.userList.label}
      </Typography>

      {requestsLoading === "loading" ? (
        <Loader />
      ) : (
        <div>{renderRequests()}</div>
      )}
    </RequestByUserListWrapper>
  );
};

export { RequestByUserList };
