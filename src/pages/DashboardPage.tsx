import React, { FC } from "react";
// import TXT from "../contexts/texts.json";
import { PageHeadline } from "../components/PageHeadline";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import { getProfileRoutePath } from "../routes/routePaths";
import AuthService from "../services/auth.service";

type Props = {};

const DashboardPage: FC<Props> = () => {
  console.log("🚀 ~ DashboardPage is rendered....");

  const currentUser = AuthService.getCurrentUser();

  return (
    <>
      {currentUser && (
        <>
          <PageHeadline headline={currentUser.username} bottomSpace="3rem" />
          <IconButton
            href={getProfileRoutePath()}
            aria-label="edit profile"
            color="primary"
          >
            <CreateIcon />
          </IconButton>
        </>
      )}
    </>
  );
};

export { DashboardPage };
