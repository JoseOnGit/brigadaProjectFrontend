import React, { FC, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MainNavigation } from "./MainNavigation";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TXT from "../contexts/texts.json";
import styled from "@emotion/styled";
import AuthService from "../services/authService";
import {
  getDashboardRoutePath,
  getLoginRoutePath,
  getRegistrationRoutePath,
  getSuccessRoutePath,
} from "../routes/routePaths";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  getAllRequests,
  getUser,
  getUserRequests,
  requestsLoadingSelector,
  userErrorSelector,
  userLoadingSelector,
  userSelector,
} from "../slices/user";
import { MAX_CONTENT_WIDTH, ROLE } from "../constants/commonConstants";

// < STYLED COMPONENTS
const ToolbarWrapper = styled("div")({
  width: "100%",
  margin: "0 auto",
  maxWidth: MAX_CONTENT_WIDTH,
});
const ContentWrapper = styled("div")({
  width: "100%",
  margin: "1rem auto",
  padding: "1rem",
  textAlign: "left",
  maxWidth: MAX_CONTENT_WIDTH,
});
// STYLED COMPONENTS >

const PageWrapper: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(userSelector);
  const currentUserLoading = useAppSelector(userLoadingSelector);
  const currentUserError = useAppSelector(userErrorSelector);
  const userRrequestsLoading = useAppSelector(requestsLoadingSelector);

  const currentUserInStorage = AuthService.getCurrentUserFromStorage();

  const [userWasRefetched, setUserWasRefetched] = useState(false);

  const isPublicPage =
    location.pathname === getLoginRoutePath() ||
    location.pathname === getRegistrationRoutePath() ||
    location.pathname === getSuccessRoutePath("registration");

  useEffect(() => {
    // if currentUser is not in Redux,
    // but we have accessToken in localStorage,
    // then refetch user data.
    // (eg. when we refresh page)
    if (currentUserInStorage && !currentUser?.email) {
      dispatch(
        getUser({
          email: currentUserInStorage.email,
          token: currentUserInStorage.accessToken,
        })
      );
      setUserWasRefetched(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // when we refetch user we have to refetch also requests
    if (
      currentUser?.id !== undefined &&
      userRrequestsLoading !== "loading" &&
      userWasRefetched
    ) {
      currentUser.roles.includes(ROLE.MODERATOR)
        ? dispatch(getAllRequests())
        : dispatch(getUserRequests(currentUser.id));
      setUserWasRefetched(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, userRrequestsLoading, userWasRefetched]);

  useEffect(() => {
    // if there IS NO current user in locale storage,
    // or if it's not public page like 'login' or 'register'
    // then always redirect to 'login' page
    // and don't even show content of page
    if (
      !currentUserInStorage &&
      !isPublicPage &&
      currentUserLoading !== "loading" &&
      !currentUserError
    ) {
      navigate(getLoginRoutePath());
    }

    // if there IS current user,
    // then don't let him see pages like 'login' or 'register'
    // and always redirect to 'dashboard' of user
    if (currentUser?.id && isPublicPage && !currentUserError) {
      navigate(getDashboardRoutePath());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, currentUserInStorage]);

  // as it always refresh window after login, it also always fetch user and requests

  return (
    <>
      <AppBar position="sticky" color="primary" enableColorOnDark>
        <ToolbarWrapper>
          <Toolbar>
            <Typography
              align="left"
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              {TXT.applicationName}
            </Typography>
            <MainNavigation />
          </Toolbar>
        </ToolbarWrapper>
      </AppBar>

      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </>
  );
};

export { PageWrapper };
