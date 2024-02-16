import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { MainNavigation } from "../components/MainNavigation";

type Props = {};

const PageWrapper: FC<Props> = () => {
  console.log("%c⧭ PageWrapper component is rendered.. ", "color: #00bf00");

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
            Application
          </Typography>
          <MainNavigation />
        </Toolbar>
      </AppBar>
      <div className="contentWrapper">
        <Outlet />
      </div>
    </>
  );
};

export { PageWrapper };
