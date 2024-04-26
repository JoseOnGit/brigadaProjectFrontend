import React, { FC } from "react";
import { CurrentUserType } from "../types/userTypes";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import { getProfileRoutePath } from "../routes/routePaths";
import styled from "@emotion/styled";
import { EmployeeLevelRating } from "./EmployeeLevelRating";

type Props = {
  currentUser: CurrentUserType;
};

// < STYLED COMPONENTS
const ProfileWrapper = styled("div")({
  width: "100%",
  position: "relative",
  padding: "3rem 0 2rem 0",
  borderBottom: "1px solid #999999",
  marginBottom: "2rem",
});

const EditIconWrapper = styled("div")({
  position: "absolute",
  bottom: "1rem",
  right: "0rem",
});
// STYLED COMPONENTS >

const DashboardProfile: FC<Props> = ({ currentUser }) => {
  return (
    <ProfileWrapper>
      <Typography
        align="center"
        variant="h3"
        component="div"
        sx={{ fontWeight: "bold", marginBottom: "3rem" }}
      >
        {currentUser.name}
      </Typography>
      <Typography sx={{ marginBottom: "1rem" }}>
        {currentUser.base?.name}
      </Typography>

      <EmployeeLevelRating level={currentUser.level} />

      <EditIconWrapper>
        <IconButton
          href={getProfileRoutePath()}
          aria-label="edit profile"
          color="primary"
        >
          <CreateIcon />
        </IconButton>
      </EditIconWrapper>
    </ProfileWrapper>
  );
};

export { DashboardProfile };
