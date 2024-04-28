import React, { FC, useEffect } from "react";
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
import { getUser, userLoadingSelector, userSelector } from "../slices/user";
import { Loader } from "./Loader";

const MAX_CONTENT_WIDTH = "50rem";

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

  const currentUserInStorage = AuthService.getCurrentUserFromStorage();

  const isPublicPage =
    location.pathname === getLoginRoutePath() ||
    location.pathname === getRegistrationRoutePath() ||
    location.pathname === getSuccessRoutePath("registration");

  useEffect(() => {
    // if currentUser is not in Redux,
    // but we have accessToken in localStorage,
    // then refetch user data.
    if (currentUserInStorage && !currentUser.email) {
      dispatch(
        getUser({
          email: currentUserInStorage.email,
          token: currentUserInStorage.accessToken,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // if there IS NO current user in locale storage,
    // or if it's not public page like 'login' or 'register'
    // then always redirect to 'login' page
    // and don't even show content of page
    if (
      !currentUserInStorage &&
      !isPublicPage &&
      currentUserLoading !== "loading"
    ) {
      navigate(getLoginRoutePath());
    }

    // if there IS current user,
    // then don't let him see pages like 'login' or 'register'
    // and always redirect to 'dashboard' of user
    if (currentUser.id && isPublicPage) {
      navigate(getDashboardRoutePath());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, currentUserInStorage]);

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
        {/* Show Loader while user data is refetched */}
        {(!currentUserInStorage || !currentUser.id) && !isPublicPage ? (
          <Loader />
        ) : (
          <Outlet />
        )}
      </ContentWrapper>
    </>
  );
};

export { PageWrapper };
