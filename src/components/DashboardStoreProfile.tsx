import React, { FC, useEffect, useState } from "react";
import { CurrentUserType } from "../types/userTypes";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import { getProfileRoutePath } from "../routes/routePaths";
import styled from "@emotion/styled";
import Avatar from "@mui/material/Avatar";
import StoreService from "../services/storeService";
import { StoreApiType } from "../types/storesTypes";
import { Loader } from "./Loader";
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
  const navigate = useNavigate();

  const [stores, setStores] = useState<StoreApiType[]>([]);
  const [storesLoading, setStoresLoading] = useState<boolean>(true);
  const [storesError, setStoresError] = useState<string>("");

  useEffect(() => {
    setStoresLoading(true);

    StoreService.getAllStoreNames()
      .then(
        (response) => {
          setStores(response);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setStoresError(resMessage);
        }
      )
      .finally(() => setStoresLoading(false));
  }, []);

  const currentStore = stores.find((store) => store.id === currentUser.base.id);

  if (storesLoading) {
    return (
      <ProfileWrapper>
        <Loader />
      </ProfileWrapper>
    );
  }

  if (storesError) {
    return <ProfileWrapper>errrrrroorrrrrr!!!!!</ProfileWrapper>;
  }

  return (
    <ProfileWrapper>
      <Avatar
        sx={{ width: "5rem", height: "5rem" }}
      >{`${currentStore?.name[0]}`}</Avatar>
      <Typography
        align="center"
        variant="h3"
        component="div"
        sx={{ fontWeight: "bold", marginTop: "2rem", marginBottom: "2rem" }}
      >
        {currentStore?.name}
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
