import React, { FC } from "react";
import { CurrentUserType } from "../types/userTypes";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import { getProfileRoutePath } from "../routes/routePaths";
import styled from "@emotion/styled";

type Props = {
  currentUser: CurrentUserType;
};

const ProfileWrapper = styled("div")({
  width: "100%",
  position: "relative",
  padding: "3rem 0 2rem 0",
  borderBottom: "1px solid #999999",
});

const EditIconWrapper = styled("div")({
  position: "absolute",
  bottom: "1rem",
  right: "0rem",
});

const DashboardProfile: FC<Props> = ({ currentUser }) => {
  return (
    <ProfileWrapper>
      <Typography
        align="center"
        variant="h3"
        component="div"
        sx={{ fontWeight: "bold" }}
      >
        {currentUser.name}
      </Typography>

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
