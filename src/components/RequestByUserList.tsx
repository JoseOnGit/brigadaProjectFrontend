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

type Props = {
  requests: RequestType[];
};

// < STYLED COMPONENTS
const RequestByUserListWrapper = styled("div")({
  width: "100%",
  padding: "0rem 0 1rem 0",
});
// STYLED COMPONENTS >

const RequestByUserList: FC<Props> = ({ requests }) => {
  const requestsUsers = useAppSelector(requestsUsersSelector);
  const requestsLoading = useAppSelector(requestsLoadingSelector);

  const renderRequests = () => {
    return requests.map((request, index) => {
      const user =
        requestsUsers.find((user) => user.id === request.userId) ||
        ({} as CurrentUserType);

      return <RequestByUser key={index} request={request} requestUser={user} />;
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
        {TXT.dashboardPage.store.userList.label}
      </Typography>

      {requestsLoading === "loading" ? <Loader /> : renderRequests()}
    </RequestByUserListWrapper>
  );
};

export { RequestByUserList };
