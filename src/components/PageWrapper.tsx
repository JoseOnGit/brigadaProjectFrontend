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
  getUser,
  userErrorSelector,
  userLoadingSelector,
  userSelector,
} from "../slices/user";
import { MAX_CONTENT_WIDTH, ROLE } from "../constants/commonConstants";
import {
  getAllUsersRequests,
  getUserRequests,
  userRequestsLoadingSelector,
} from "../slices/userRequest";
import { ErrorMessage } from "./ErrorMessage";
import { getAllStoresRequests, getStoreRequests } from "../slices/storeRequest";

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
  const userRequestsLoading = useAppSelector(userRequestsLoadingSelector);

  const currentUserInStorage = AuthService.getCurrentUserFromStorage();

  const [userWasRefetched, setUserWasRefetched] = useState(false);

  const isPublicPage =
    location.pathname === getLoginRoutePath() ||
    location.pathname === getRegistrationRoutePath() ||
    location.pathname === getSuccessRoutePath("registration");

  // if currentUser is not in Redux,
  // but we have accessToken in localStorage,
  // then refetch user data.
  // (eg. when we refresh page)
  useEffect(() => {
    if (
      currentUserInStorage &&
      !currentUser?.email &&
      currentUserLoading !== "loading"
    ) {
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

  const fetchDataForUser = () => {
    dispatch(getUserRequests(currentUser.id));
    dispatch(getAllStoresRequests());
  };

  const fetchDataForStore = () => {
    dispatch(getStoreRequests(currentUser.id));
    dispatch(getAllUsersRequests());
  };

  // when we refetch user we have to refetch also requests
  useEffect(() => {
    if (
      currentUser?.id !== undefined &&
      userRequestsLoading !== "loading" &&
      userWasRefetched
    ) {
      currentUser.roles.includes(ROLE.MODERATOR)
        ? fetchDataForStore()
        : fetchDataForUser();
      setUserWasRefetched(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, userRequestsLoading, userWasRefetched]);

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

    // if there IS current user in locale storage,
    // but there's also error (eg. token in local storage for fetching currentUser is expired)
    // then redirect to Login
    if (
      currentUserInStorage &&
      !currentUser?.id &&
      currentUserError &&
      !userWasRefetched
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
        {currentUserError && !isPublicPage ? (
          <ErrorMessage message={currentUserError} />
        ) : (
          <Outlet />
        )}
      </ContentWrapper>
    </>
  );
};

export { PageWrapper };
