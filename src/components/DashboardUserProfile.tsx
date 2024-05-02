import React, { FC } from "react";
import { CurrentUserType } from "../types/userTypes";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import { getProfileRoutePath } from "../routes/routePaths";
import styled from "@emotion/styled";
import { EmployeeLevelRating } from "./EmployeeLevelRating";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

type Props = {
  currentUser: CurrentUserType;
};

// < STYLED COMPONENTS
const ProfileWrapper = styled("div")({
  width: "100%",
  position: "relative",
  padding: "1rem 0 3rem 0",
  borderBottom: "1px solid #999999",
  marginBottom: "2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const EditIconWrapper = styled("div")({
  position: "absolute",
  bottom: "1rem",
  right: "0rem",
});
// STYLED COMPONENTS >

const DashboardUserProfile: FC<Props> = ({ currentUser }) => {
  const navigate = useNavigate();

  return (
    <ProfileWrapper>
      <Avatar
        sx={{ width: "5rem", height: "5rem" }}
      >{`${currentUser.name?.[0]}`}</Avatar>
      <Typography
        align="center"
        variant="h3"
        component="div"
        sx={{ fontWeight: "bold", marginTop: "2rem", marginBottom: "2rem" }}
      >
        {currentUser.name}
      </Typography>
      <Typography sx={{ marginBottom: "1rem" }}>
        {currentUser.base?.name}
      </Typography>

      <EmployeeLevelRating level={currentUser.level} />

      <EditIconWrapper>
        <IconButton
          aria-label="edit profile"
          color="primary"
          onClick={() => navigate(getProfileRoutePath())}
        >
          <CreateIcon />
        </IconButton>
      </EditIconWrapper>
    </ProfileWrapper>
  );
};

export { DashboardUserProfile };
