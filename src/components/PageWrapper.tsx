import React, { FC, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MainNavigation } from "./MainNavigation";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TXT from "../contexts/texts.json";
import styled from "@emotion/styled";
import AuthService from "../services/auth.service";
import {
  getDashboardRoutePath,
  getLoginRoutePath,
  getRegistrationRoutePath,
  getSuccessRoutePath,
} from "../routes/routePaths";

const ContentWrapper = styled.div`
  width: calc(100% - 2rem);
  margin: 1rem;
  text-align: left;
  @media (min-width: 800px) {
    max-width: 800px;
    margin: 1rem auto;
  }
`;

const PageWrapper: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = AuthService.getCurrentUser();

  const isPublicPage =
    location.pathname === getLoginRoutePath() ||
    location.pathname === getRegistrationRoutePath() ||
    location.pathname === getSuccessRoutePath("registration");

  useEffect(() => {
    // if there IS NO current user in locale storage,
    // or if it's not public page like 'login' or 'register'
    // then always redirect to 'login' page
    // and don't even show content of page

    if (!currentUser && !isPublicPage) {
      navigate(getLoginRoutePath());
    }

    // if there IS current user,
    // then don't let him see pages like 'login' or 'register'
    // and always redirect to 'dashboard' of user

    if (currentUser && isPublicPage) {
      navigate(getDashboardRoutePath());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppBar position="sticky" color="primary" enableColorOnDark>
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
      </AppBar>
      <ContentWrapper>
        {(currentUser || isPublicPage) && <Outlet />}
      </ContentWrapper>
    </>
  );
};

export { PageWrapper };
