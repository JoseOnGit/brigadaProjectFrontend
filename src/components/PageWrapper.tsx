import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { MainNavigation } from "./MainNavigation";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TXT from "../contexts/texts.json";
import styled from "@emotion/styled";

const ContentWrapper = styled.div`
  width: calc(100% - 2rem);
  margin: 1rem;
  text-align: left;
`;

const PageWrapper: FC = () => (
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
      <Outlet />
    </ContentWrapper>
  </>
);

export { PageWrapper };
