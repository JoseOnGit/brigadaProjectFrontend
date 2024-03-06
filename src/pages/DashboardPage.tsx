import React, { FC, useEffect } from "react";
import TXT from "../contexts/texts.json";
import { PageHeadline } from "../components/PageHeadline";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import {
  getEditProfileRoutePath,
  getLoginRoutePath,
} from "../routes/routePaths";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

type Props = {};

const DashboardPage: FC<Props> = () => {
  console.log("🚀 ~ DashboardPage is rendered....");

  const navigate = useNavigate();

  const currentUser = AuthService.getCurrentUser();
  console.log("%c⧭ currentUser ", "color: #f279ca", currentUser);

  useEffect(() => {
    if (!currentUser) {
      navigate(getLoginRoutePath());
    }
  }, [currentUser, navigate]);

  return (
    <>
      {currentUser && (
        <>
          <PageHeadline headline={currentUser.username} bottomSpace="3rem" />
          <IconButton
            href={getEditProfileRoutePath(currentUser.ID)}
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
