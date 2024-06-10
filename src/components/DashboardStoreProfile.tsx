import React, { FC, useEffect } from "react";
import { CurrentUserType } from "../types/userTypes";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import { getProfileRoutePath } from "../routes/routePaths";
import styled from "@emotion/styled";
import Avatar from "@mui/material/Avatar";
import { Loader } from "./Loader";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  getStore,
  userStoreErrorSelector,
  userStoreLoadingSelector,
  userStoreSelector,
} from "../slices/user";
import { ErrorMessage } from "./ErrorMessage";

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
  flexDirection: "row",
  alignItems: "center",
  gap: "2rem",
});

const EditIconWrapper = styled("div")({
  position: "absolute",
  bottom: "1rem",
  right: "0rem",
});
// STYLED COMPONENTS >

const DashboardStoreProfile: FC<Props> = ({ currentUser }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const store = useAppSelector(userStoreSelector);
  const storeLoading = useAppSelector(userStoreLoadingSelector);
  const storeError = useAppSelector(userStoreErrorSelector);

  useEffect(() => {
    if (currentUser.id && !store && storeLoading === "init") {
      dispatch(getStore(currentUser.base.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (storeLoading === "loading") {
    return (
      <ProfileWrapper>
        <Loader />
      </ProfileWrapper>
    );
  }

  if (storeError) {
    return (
      <ProfileWrapper>
        <ErrorMessage message={storeError} />
      </ProfileWrapper>
    );
  }

  return (
    <ProfileWrapper>
      <Avatar
        sx={{ width: "5rem", height: "5rem" }}
      >{`${store?.name[0]}`}</Avatar>
      <Typography
        align="center"
        variant="h3"
        component="div"
        sx={{ fontWeight: "bold", marginTop: "2rem", marginBottom: "2rem" }}
      >
        {store?.name}
      </Typography>

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

export { DashboardStoreProfile };
